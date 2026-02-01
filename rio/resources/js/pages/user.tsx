import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, Form, usePage } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

type Room = {
    id: string | number;
    name: string;
    price: number;
    capacity: number;
    description?: string;
    image?: string;
    // value is what will be submitted in the booking form (slug or id)
    value?: string | number;
};

export default function User() {
    const { auth, rooms: remoteRooms = [], bookings: userBookings = [] } = usePage<SharedData>().props as any;
    const defaultRooms: Room[] = [
        { id: 'default-single', value: 'single', name: 'Single Room', price: 1200, capacity: 1, description: 'Cozy single with shared bathroom.' },
        { id: 'default-double', value: 'double', name: 'Double Room', price: 2000, capacity: 2, description: 'Shared double room for two.' },
        { id: 'default-dorm', value: 'dorm', name: 'Dormitory', price: 600, capacity: 6, description: 'Bunk-style beds in a shared dorm.' },
    ];

    const rooms: Room[] = (remoteRooms && remoteRooms.length > 0)
        ? remoteRooms.map((r: any) => ({
            id: r.slug ? `db-slug-${r.slug}` : `db-id-${r.id}`,
            value: r.slug ?? r.id,
            name: r.name,
            price: Number(r.price ?? 0),
            capacity: Number(r.capacity ?? 1),
            description: r.description ?? '',
            image: r.image ?? null,
        }))
        : defaultRooms;
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<Room | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    function openBooking(room: Room) {
        // ensure price and capacity are numbers and include booking value
        const normalized = {
            ...room,
            price: Number((room as any).price ?? 0),
            capacity: Number((room as any).capacity ?? 1),
            value: (room as any).value ?? ((room as any).id ?? ''),
        } as Room;

        setSelected(normalized);
        setOpen(true);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Student Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4">
                <header className="flex items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold">Welcome, {auth?.user?.name ?? 'Student'}</h1>
                        <p className="text-sm text-muted-foreground">Book a room for your stay at De-Rio Hostel</p>
                    </div>
                </header>

                {feedback && (
                    <div
                        className={
                            `rounded-md border p-3 text-sm ` +
                            (feedback.type === 'success'
                                ? 'border-green-200 bg-green-50 text-green-700'
                                : 'border-red-200 bg-red-50 text-red-700')
                        }
                    >
                        {feedback.message}
                    </div>
                )}

                <section className="grid gap-4 md:grid-cols-4">
                    {rooms.map((room) => (
                        <div key={room.id} className="rounded-xl border p-4">
                            <div className="relative mb-4 h-40 overflow-hidden rounded-md border border-sidebar-border/70 dark:border-sidebar-border">
                                {room.image ? (
                                    <img src={`/storage/${room.image}`} alt={room.name} className="absolute inset-0 size-full object-cover" />
                                ) : (
                                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                                )}
                            </div>

                            <h3 className="text-lg font-medium">{room.name}</h3>
                            <p className="mt-1 text-sm text-muted-foreground">{room.description}</p>

                                    <div className="mt-4 flex items-center justify-between">
                                <div>
                                    <div className="text-sm text-muted-foreground">Capacity: {room.capacity}</div>
                                    <div className="text-lg font-semibold">GH₵ {room.price.toLocaleString()}</div>
                                </div>

                                <div>
                                    <button
                                        type="button"
                                        className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-primary/90"
                                        onClick={() => openBooking(room)}
                                    >
                                        Book
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>

                <section className="mt-6 rounded-xl border p-4">
                    <h2 className="text-lg font-medium">Your Bookings</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        {userBookings.length === 0 ? 'No bookings yet. Make your first booking using the "Book" button.' : 'View your current and past bookings below.'}
                    </p>

                    <div className="mt-4 grid gap-3">
                        {userBookings.length === 0 ? (
                            <div className="rounded-md border p-3">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-medium">No bookings yet</div>
                                        <div className="text-sm text-muted-foreground">Make your first booking using the "Book" button.</div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            userBookings.map((booking: any) => (
                                <div key={booking.id} className="rounded-md border p-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <div className="font-medium">{booking.room_type}</div>
                                                <span
                                                    className={
                                                        `rounded-full px-2 py-0.5 text-xs font-medium ` +
                                                        (booking.status === 'approved'
                                                            ? 'bg-green-100 text-green-700'
                                                            : booking.status === 'rejected'
                                                            ? 'bg-red-100 text-red-700'
                                                            : 'bg-yellow-100 text-yellow-700')
                                                    }
                                                >
                                                    {booking.status}
                                                </span>
                                            </div>
                                            <div className="mt-1 text-sm text-muted-foreground">
                                                Check-in: {new Date(booking.check_in).toLocaleDateString()} • Check-out: {new Date(booking.check_out).toLocaleDateString()}
                                            </div>
                                            <div className="mt-1 text-sm text-muted-foreground">
                                                Submitted: {new Date(booking.created_at).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </section>

                {/* Booking modal */}
                {open && selected && (
                    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
                        <div className="mx-4 w-full max-w-2xl rounded-lg bg-popover p-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold">Book {selected.name}</h3>
                                <button
                                    className="text-sm text-muted-foreground"
                                    onClick={() => {
                                        setOpen(false);
                                        setSelected(null);
                                    }}
                                >
                                    Close
                                </button>
                            </div>

                            <div className="mt-4">
                                <Form
                                    method="post"
                                    action="/bookings"
                                    encType="multipart/form-data"
                                    className="space-y-4"
                                    onStart={() => {
                                        setSubmitting(true);
                                        setFeedback(null);
                                    }}
                                    onSuccess={() => {
                                        setOpen(false);
                                        setSelected(null);
                                        setFeedback({ type: 'success', message: 'Booking submitted successfully.' });
                                    }}
                                    onError={() => {
                                        setFeedback({ type: 'error', message: 'Submission failed. Please review the form and try again.' });
                                    }}
                                    onFinish={() => {
                                        setSubmitting(false);
                                    }}
                                >
                                    <input type="hidden" name="room_type" value={String(selected.value ?? selected.id)} />

                                    <div className="grid gap-2 md:grid-cols-2">
                                        <div>
                                            <label className="block text-sm">Full name</label>
                                            <input
                                                name="name"
                                                defaultValue={String(auth?.user?.name ?? '')}
                                                className="mt-1 block w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm outline-none"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm">Phone</label>
                                            <input
                                                name="phone"
                                                type="tel"
                                                defaultValue={String(auth?.user?.phone ?? '')}
                                                className="mt-1 block w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid gap-2 md:grid-cols-2">
                                        <div>
                                            <label className="block text-sm">Study level</label>
                                            <select name="study_level" className="mt-1 block w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none">
                                                <option value="">Select level</option>
                                            
                                                <option value="diploma">Diploma</option>
                                                <option value="undergraduate">Undergraduate</option>
                                                <option value="postgraduate">Postgraduate</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm">Guardian name</label>
                                            <input name="guardian_name" className="mt-1 block w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none" />
                                        </div>
                                    </div>

                                    <div className="grid gap-2 md:grid-cols-2">
                                        <div>
                                            <label className="block text-sm">Guardian phone</label>
                                            <input name="guardian_phone" type="tel" className="mt-1 block w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none" />
                                        </div>

                                        <div>
                                            <label className="block text-sm">Administration letter (PDF or image)</label>
                                            <input name="administration_letter" type="file" accept=".pdf,image/*" className="mt-1 block w-full text-sm" />
                                        </div>
                                    </div>

                                    <div className="grid gap-2 md:grid-cols-1">
                                        <div>
                                            <label className="block text-sm">Passport size photo</label>
                                            <input name="passport_pic" type="file" accept="image/*" className="mt-1 block w-full text-sm" />
                                        </div>
                                    </div>

                                    {/* Room images are provided by the application; administrators will handle any signatures */}

                                    <div className="grid gap-2 md:grid-cols-2">
                                        <div>
                                            <label className="block text-sm">Check-in</label>
                                            <input name="check_in" type="date" className="mt-1 block w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none" />
                                        </div>

                                        <div>
                                            <label className="block text-sm">Check-out</label>
                                            <input name="check_out" type="date" className="mt-1 block w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none" />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="text-sm text-muted-foreground">Price: GH₵ {selected.price.toLocaleString()}</div>

                                        <div className="flex gap-2">
                                            <button
                                                type="button"
                                                className="rounded-md border px-3 py-2 text-sm"
                                                onClick={() => {
                                                    setOpen(false);
                                                    setSelected(null);
                                                }}
                                            >
                                                Cancel
                                            </button>

                                            <button
                                                type="submit"
                                                className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-white disabled:opacity-60"
                                                disabled={submitting}
                                            >
                                                {submitting ? 'Submitting…' : 'Confirm booking'}
                                            </button>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
