import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, usePage, Form } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function BookingShow() {
    const { booking } = usePage<SharedData>().props as any;

    const formatDate = (raw?: string | null) => {
        if (!raw) return '';
        return String(raw).split('T')[0].split(' ')[0];
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Booking #${booking.id}`} />

            <div className="p-6">
                <h2 className="text-xl font-semibold">Booking details</h2>

                <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <div className="rounded-md border p-4">
                        <div className="font-medium">Student</div>
                        <div className="text-sm text-muted-foreground">{booking.name} — {booking.phone}</div>

                        <div className="mt-3">
                            <div className="text-sm text-muted-foreground">Room</div>
                            <div className="font-medium">{booking.room_type}</div>
                        </div>

                        <div className="mt-3">
                            <div className="text-sm text-muted-foreground">Dates</div>
                            <div className="font-medium">{formatDate(booking.check_in)} → {formatDate(booking.check_out)}</div>
                        </div>
                    </div>

                    <div className="rounded-md border p-4">
                        <div className="font-medium">Guardian</div>
                        <div className="text-sm text-muted-foreground">{booking.guardian_name} — {booking.guardian_phone}</div>

                        <div className="mt-3">
                            <div className="text-sm text-muted-foreground">Study level</div>
                            <div className="font-medium">{booking.study_level}</div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <div className="rounded-md border p-4">
                        <div className="font-medium">Administration letter</div>
                        {booking.administration_letter ? (
                            <a href={`/storage/${booking.administration_letter}`} target="_blank" rel="noreferrer" className="text-sm underline">View</a>
                        ) : (
                            <div className="text-sm text-muted-foreground">Not provided</div>
                        )}
                    </div>

                    <div className="rounded-md border p-4 relative">
                        <div className="font-medium">Passport photo</div>
                        {booking.passport_pic ? (
                            <div className="relative mt-2 max-h-48">
                                <img src={`/storage/${booking.passport_pic}`} alt="passport" className="max-h-48 object-contain w-full" />

                                {booking.admin_signature && (
                                    <img src={`/storage/${booking.admin_signature}`} alt="signature" className="absolute right-2 bottom-2 max-h-20 opacity-90" />
                                )}
                            </div>
                        ) : (
                            <div className="text-sm text-muted-foreground">Not provided</div>
                        )}
                    </div>
                </div>

                <div className="mt-6">
                    <div className="font-medium">Admin actions</div>

                    {!booking.admin_signed ? (
                        <Form method="post" action={`/bookings/${booking.id}/approve`} encType="multipart/form-data" className="mt-3 grid gap-3 md:grid-cols-2">
                            <div>
                                <label className="block text-sm">Admin signature (image)</label>
                                <input name="admin_signature" type="file" accept="image/*" className="mt-1 block w-full text-sm" />
                            </div>

                            <div className="flex items-end">
                                <button type="submit" className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-white">Approve & Sign</button>
                            </div>
                        </Form>
                    ) : (
                        <div className="mt-3">
                            <div className="text-sm text-muted-foreground">Approved and signed</div>
                            {booking.admin_signature && (
                                <img src={`/storage/${booking.admin_signature}`} alt="signature" className="mt-2 max-h-24 object-contain" />
                            )}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
