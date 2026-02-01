<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class RoomController extends Controller
{
    /**
     * Show the room management page.
     */
    public function index(): Response
    {
        $rooms = Room::orderBy('name')->get();

        return Inertia::render('rooms/index', [
            'rooms' => $rooms,
        ]);
    }

    /**
     * Store a new room (admin only).
     */
    public function store(Request $request): RedirectResponse
    {
        if (! $request->user() || ! $request->user()->is_admin) {
            abort(403);
        }

        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255'],
            'price' => ['nullable', 'numeric'],
            'capacity' => ['nullable', 'integer'],
            'description' => ['nullable', 'string'],
            'image' => ['nullable', 'image', 'max:2048'],
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('rooms', 'public');
        }

        Room::create([
            'name' => $data['name'],
            'slug' => $data['slug'] ?? null,
            'price' => isset($data['price']) ? (int) $data['price'] : 0,
            'capacity' => isset($data['capacity']) ? (int) $data['capacity'] : 1,
            'description' => $data['description'] ?? null,
            'image' => $imagePath,
        ]);

        return redirect()->route('rooms.index')->with('success', 'Room added.');
    }

    /**
     * Update an existing room (admin only).
     */
    public function update(Request $request, Room $room): RedirectResponse
    {
        if (! $request->user() || ! $request->user()->is_admin) {
            abort(403);
        }

        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255'],
            'price' => ['nullable', 'numeric'],
            'capacity' => ['nullable', 'integer'],
            'description' => ['nullable', 'string'],
            'image' => ['nullable', 'image', 'max:2048'],
        ]);

        $imagePath = $room->image;
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($imagePath && Storage::exists('public/' . $imagePath)) {
                Storage::delete('public/' . $imagePath);
            }
            $imagePath = $request->file('image')->store('rooms', 'public');
        }

        $room->update([
            'name' => $data['name'],
            'slug' => $data['slug'] ?? null,
            'price' => isset($data['price']) ? (int) $data['price'] : 0,
            'capacity' => isset($data['capacity']) ? (int) $data['capacity'] : 1,
            'description' => $data['description'] ?? null,
            'image' => $imagePath,
        ]);

        return redirect()->route('rooms.index')->with('success', 'Room updated.');
    }

    /**
     * Remove a room (admin only).
     */
    public function destroy(Request $request, Room $room): RedirectResponse
    {
        if (! $request->user() || ! $request->user()->is_admin) {
            abort(403);
        }

        $room->delete();

        return redirect()->route('dashboard')->with('success', 'Room removed.');
    }
}
