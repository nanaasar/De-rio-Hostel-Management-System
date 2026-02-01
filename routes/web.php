<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\RoomController;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

// Routes for authenticated users
Route::middleware(['auth', 'verified'])->group(function () {
    // Student user dashboard
    Route::get('user', function (Request $request) {
        // pass available rooms to the user page so booking form can use persisted room types
        $rooms = App\Models\Room::orderBy('name')->get();
        // pass user's bookings to display their booking history
        $bookings = App\Models\Booking::where('user_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->get();
        return Inertia::render('user', [
            'rooms' => $rooms,
            'bookings' => $bookings,
        ]);
    })->name('user');

    // Booking creation available to authenticated users
    Route::post('bookings', [BookingController::class, 'store'])->name('bookings.store');
});

// Admin-only routes
Route::middleware(['auth', 'verified', 'admin'])->group(function () {
    // Admin dashboard showing bookings
    Route::get('dashboard', [BookingController::class, 'index'])->name('dashboard');

    // Booking management
    Route::post('bookings/{booking}/approve', [BookingController::class, 'approve'])->name('bookings.approve');
    Route::get('bookings/{booking}', [BookingController::class, 'show'])->name('bookings.show');
    Route::delete('bookings/{booking}', [BookingController::class, 'destroy'])->name('bookings.destroy');

    // Room management
    Route::get('rooms', [RoomController::class, 'index'])->name('rooms.index');
    Route::post('rooms', [RoomController::class, 'store'])->name('rooms.store');
    Route::patch('rooms/{room}', [RoomController::class, 'update'])->name('rooms.update');
    Route::delete('rooms/{room}', [RoomController::class, 'destroy'])->name('rooms.destroy');
});

require __DIR__.'/settings.php';
