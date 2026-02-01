import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, Form, usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
];

export default function Dashboard() {
    const { bookings = { data: [] }, roomsCount: persistedRoomsCount = null } = usePage<SharedData>().props as any;
    const data = bookings.data ?? [];
    const currentPage = bookings.current_page ?? 1;
    const lastPage = bookings.last_page ?? 1;
    const prevPage = bookings.prev_page_url;
    const nextPage = bookings.next_page_url;

    type Room = {
        id: string | number;
        name: string;
        price: number;
        capacity: number;
        description: string;
    };

    const rooms: Room[] = [
        { id: 'single', name: 'Single Room', price: 1200, capacity: 1, description: 'Cozy single with shared bathroom.' },
        { id: 'double', name: 'Double Room', price: 2000, capacity: 2, description: 'Shared double room for two.' },
        { id: 'dorm', name: 'Dormitory', price: 600, capacity: 6, description: 'Bunk-style beds in a shared dorm.' },
    ];

    const roomsCount = (typeof persistedRoomsCount === 'number' && persistedRoomsCount >= 0) ? persistedRoomsCount : rooms.length;
    const applicationsCount = (bookings.total ?? bookings.data?.length ?? 0) as number;
    const applicantsCount = new Set((data ?? []).map((b: any) => (b.email ?? b.phone ?? b.name) as string)).size;

    const formatDate = (raw?: string | null) => {
        if (!raw) return '';
        // handle ISO-like or space-separated timestamps, return only the date portion (YYYY-MM-DD)
        return String(raw).split('T')[0].split(' ')[0];
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid grid-cols-3 gap-4">
                    <div className="rounded-lg border p-4">
                        <div className="text-sm text-muted-foreground">Rooms</div>
                        <div className="mt-2 text-2xl font-bold">{roomsCount}</div>
                        <div className="text-xs text-muted-foreground mt-1">Total room types available</div>
                    </div>

                    <div className="rounded-lg border p-4">
                        <div className="text-sm text-muted-foreground">Applications</div>
                        <div className="mt-2 text-2xl font-bold">{applicationsCount}</div>
                        <div className="text-xs text-muted-foreground mt-1">Total booking applications</div>
                    </div>

                    <div className="rounded-lg border p-4">
                        <div className="text-sm text-muted-foreground">Applicants</div>
                        <div className="mt-2 text-2xl font-bold">{applicantsCount}</div>
                        <div className="text-xs text-muted-foreground mt-1">Unique applicants</div>
                    </div>
                </div>
                <div className="rounded-xl border p-4">
                    <h2 className="text-xl font-semibold">Bookings</h2>
                    <p className="text-sm text-muted-foreground">Manage student bookings — approve and review submissions.</p>

                    <div className="mt-4">
                        <form method="get" action="" className="flex flex-wrap items-end gap-2">
                            <div>
                                <label className="block text-sm">Status</label>
                                <select name="status" defaultValue="" className="mt-1 rounded-md border px-2 py-1 text-sm">
                                    <option value="">Any</option>
                                    <option value="pending">Pending</option>
                                    <option value="approved">Approved</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm">Room</label>
                                <select name="room_type" defaultValue="" className="mt-1 rounded-md border px-2 py-1 text-sm">
                                    <option value="">Any</option>
                                    <option value="single">Single</option>
                                    <option value="double">Double</option>
                                    <option value="dorm">Dorm</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm">Search</label>
                                <input name="search" type="search" className="mt-1 rounded-md border px-2 py-1 text-sm" />
                            </div>

                            <div>
                                <label className="block text-sm">Per page</label>
                                <select name="per_page" defaultValue={10} className="mt-1 rounded-md border px-2 py-1 text-sm">
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={25}>25</option>
                                </select>
                            </div>

                            <div>
                                <button type="submit" className="rounded-md bg-primary px-3 py-2 text-sm text-white">Filter</button>
                            </div>
                        </form>

                        <div className="mt-4 overflow-x-auto">
                            <table className="w-full table-auto">
                                <thead>
                                    <tr className="text-left text-sm text-muted-foreground">
                                        <th className="px-3 py-2">#</th>
                                        <th className="px-3 py-2">Student</th>
                                        <th className="px-3 py-2">Room</th>
                                        <th className="px-3 py-2">Dates</th>
                                        <th className="px-3 py-2">Status</th>
                                        <th className="px-3 py-2">Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {data.length === 0 && (
                                        <tr>
                                            <td className="px-3 py-4" colSpan={6}>No bookings yet</td>
                                        </tr>
                                    )}

                                    {data.map((b: any, idx: number) => (
                                        <tr key={b.id} className="border-t">
                                            <td className="px-3 py-3">{(currentPage - 1) * (bookings.per_page ?? data.length) + idx + 1}</td>
                                            <td className="px-3 py-3">
                                                <div className="font-medium">{b.name}</div>
                                                <div className="text-sm text-muted-foreground">{b.phone}</div>
                                            </td>
                                            <td className="px-3 py-3">{b.room_type}</td>
                                            <td className="px-3 py-3">{formatDate(b.check_in)} → {formatDate(b.check_out)}</td>
                                            <td className="px-3 py-3">{b.status}{b.admin_signed ? ' • Signed' : ''}</td>
                                            <td className="px-3 py-3">
                                                <div className="flex items-center gap-2">
                                                    <Link href={`/bookings/${b.id}`} className="text-sm underline">View</Link>
                                                    {!b.admin_signed && (
                                                        <Form method="post" action={`/bookings/${b.id}/approve`} encType="multipart/form-data">
                                                            <button type="submit" className="rounded-md bg-primary px-3 py-1 text-sm text-white">Approve</button>
                                                        </Form>
                                                    )}

                                                    <Form
                                                        method="delete"
                                                        action={`/bookings/${b.id}`}
                                                        onSubmit={(e: any) => {
                                                            if (!confirm('Are you sure you want to remove this booking? This action cannot be undone.')) {
                                                                e.preventDefault();
                                                            }
                                                        }}
                                                    >
                                                        <button type="submit" className="rounded-md border px-3 py-1 text-sm text-red-600">Remove</button>
                                                    </Form>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                            <div className="text-sm text-muted-foreground">Page {currentPage} of {lastPage}</div>

                            <div className="flex gap-2 items-center">
                                {prevPage && (
                                    <a href={prevPage} className="rounded-md border px-3 py-1 text-sm">Previous</a>
                                )}

                                <div className="flex gap-1">
                                    {Array.from({ length: lastPage }, (_, i) => i + 1).map((p) => (
                                        <a
                                            key={p}
                                            href={`?page=${p}`}
                                            className={`rounded-md border px-3 py-1 text-sm ${p === currentPage ? 'bg-primary text-white' : ''}`}
                                        >
                                            {p}
                                        </a>
                                    ))}
                                </div>

                                {nextPage && (
                                    <a href={nextPage} className="rounded-md border px-3 py-1 text-sm">Next</a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
