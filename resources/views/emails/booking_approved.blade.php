<div style="font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;">
    <h2>Your booking was approved</h2>
    <p>Hello {{ $booking->name }},</p>
    <p>Your booking for <strong>{{ $booking->room_type }}</strong> has been approved.</p>
    <p>Check-in: {{ $booking->check_in }} — Check-out: {{ $booking->check_out }}</p>
    <p>Thank you.</p>
</div>
