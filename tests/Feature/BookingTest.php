<?php

namespace Tests\Feature;

use App\Models\Booking;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BookingTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_create_booking()
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->post('/bookings', [
                'room_type' => 'single',
                'name' => 'Test Student',
                'check_in' => now()->addDay()->toDateString(),
                'check_out' => now()->addDays(2)->toDateString(),
            ])
            ->assertRedirect('/user');

        $this->assertDatabaseHas('bookings', ['name' => 'Test Student', 'room_type' => 'single']);
    }

    public function test_admin_can_approve_booking()
    {
        $admin = User::factory()->create(['is_admin' => true]);
        $user = User::factory()->create();

        $booking = Booking::create([
            'user_id' => $user->id,
            'room_type' => 'single',
            'name' => 'Student Two',
            'check_in' => now()->toDateString(),
            'check_out' => now()->addDay()->toDateString(),
        ]);

        $this->actingAs($admin)
            ->post("/bookings/{$booking->id}/approve", [])
            ->assertStatus(302);

        $this->assertDatabaseHas('bookings', ['id' => $booking->id, 'status' => 'approved', 'admin_signed' => 1]);
    }
}
