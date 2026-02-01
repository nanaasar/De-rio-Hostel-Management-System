<div style="font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;">
    <h2>Booking received</h2>
    <p>Thank you, {{ $booking->name }}. We received your booking request for <strong>{{ $booking->room_type }}</strong>.</p>
    <p>Check-in: {{ $booking->check_in }} — Check-out: {{ $booking->check_out }}</p>
    <p>We will review your submission and contact you shortly.</p>
</div>
