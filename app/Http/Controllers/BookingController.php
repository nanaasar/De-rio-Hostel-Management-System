<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Room;
use App\Models\User;
use App\Mail\BookingSubmitted;
use App\Mail\BookingApproved;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class BookingController extends Controller
{
    /**
     * Display a listing of bookings (admin dashboard).
     */
    public function index(Request $request): Response
    {
        // Admin-only
        if (! $request->user() || ! $request->user()->is_admin) {
            abort(403);
        }

        $query = Booking::with('user');

        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }

        if ($request->filled('room_type')) {
            $query->where('room_type', $request->input('room_type'));
        }

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%")
                  ->orWhere('guardian_name', 'like', "%{$search}%");
            });
        }

        $perPage = (int) $request->input('per_page', 10);

        $bookings = $query->orderBy('created_at', 'desc')->paginate($perPage)->withQueryString();

        $roomsCount = Room::count();

        return Inertia::render('dashboard', [
            'bookings' => $bookings,
            'roomsCount' => $roomsCount,
        ]);
    }

    /**
     * Store a newly created booking.
     */
    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            // room_type may be a slug (string) or numeric id; validate as string up to 255 chars
            'room_type' => ['required', 'string', 'max:255'],
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:32'],
            'study_level' => ['nullable', 'string', 'max:64'],
            'guardian_name' => ['nullable', 'string', 'max:255'],
            'guardian_phone' => ['nullable', 'string', 'max:32'],
            'check_in' => ['required', 'date'],
            'check_out' => ['required', 'date', 'after:check_in'],
            'administration_letter' => ['nullable', 'file', 'mimes:pdf,jpg,jpeg,png', 'max:2048'],
            'passport_pic' => ['nullable', 'image', 'max:2048'],
        ]);

        $stored = [];

        if ($request->hasFile('administration_letter')) {
            $stored['administration_letter'] = $request->file('administration_letter')->store('bookings/letters', 'public');
        }

        if ($request->hasFile('passport_pic')) {
            $stored['passport_pic'] = $request->file('passport_pic')->store('bookings/passports', 'public');
        }

        $booking = Booking::create([
            'user_id' => $request->user()->id,
            'room_type' => $data['room_type'],
            'name' => $data['name'],
            'phone' => $data['phone'] ?? null,
            'study_level' => $data['study_level'] ?? null,
            'guardian_name' => $data['guardian_name'] ?? null,
            'guardian_phone' => $data['guardian_phone'] ?? null,
            'administration_letter' => $stored['administration_letter'] ?? null,
            'passport_pic' => $stored['passport_pic'] ?? null,
            'check_in' => $data['check_in'],
            'check_out' => $data['check_out'],
            'status' => 'pending',
            'admin_signed' => false,
        ]);

        // Send a confirmation to the user
        try {
            Mail::to($request->user()->email)->send(new BookingSubmitted($booking));
        } catch (\Exception $e) {
            // swallow mail errors for now
        }

        // Notify admins
        try {
            $adminEmails = User::where('is_admin', true)->pluck('email')->filter()->unique()->toArray();
            foreach ($adminEmails as $email) {
                Mail::to($email)->send(new BookingSubmitted($booking));
            }
        } catch (\Exception $e) {
            // ignore
        }

        return redirect()->route('user')->with('success', 'Booking saved. An administrator will review and confirm it.');
    }

    /**
     * Approve and sign a booking (admin action).
     */
    public function approve(Request $request, Booking $booking): RedirectResponse
    {
        // Admin-only
        if (! $request->user() || ! $request->user()->is_admin) {
            abort(403);
        }

        $data = $request->validate([
            'admin_signature' => ['nullable', 'image', 'max:2048'],
        ]);

        if ($request->hasFile('admin_signature')) {
            $booking->admin_signature = $request->file('admin_signature')->store('bookings/signatures', 'public');
        }

        $booking->admin_signed = true;
        $booking->status = 'approved';
        $booking->save();

        // notify student they were approved
        try {
            Mail::to($booking->user->email)->send(new BookingApproved($booking));
        } catch (\Exception $e) {
            // ignore
        }

        return back()->with('success', 'Booking approved and signed.');
    }

    /**
     * Show a single booking detail (optional).
     */
    public function show(Booking $booking): Response
    {
        $user = request()->user();

        // Only admin or owner can view
        if (! $user || (! $user->is_admin && $user->id !== $booking->user_id)) {
            abort(403);
        }

        $booking->load('user');

        return Inertia::render('bookings/show', [
            'booking' => $booking,
        ]);
    }

    /**
     * Remove the specified booking (admin only).
     */
    public function destroy(Request $request, Booking $booking): RedirectResponse
    {
        // Admin-only
        if (! $request->user() || ! $request->user()->is_admin) {
            abort(403);
        }

        // remove uploaded files if present
        $files = [];
        if ($booking->administration_letter) {
            $files[] = $booking->administration_letter;
        }
        if ($booking->passport_pic) {
            $files[] = $booking->passport_pic;
        }
        if ($booking->admin_signature) {
            $files[] = $booking->admin_signature;
        }

        if (! empty($files)) {
            try {
                Storage::disk('public')->delete($files);
            } catch (\Exception $e) {
                // ignore storage deletion errors
            }
        }

        $booking->delete();

        return redirect()->route('dashboard')->with('success', 'Booking removed.');
    }
}
