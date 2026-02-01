import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, Form, usePage, router } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Rooms', href: '/rooms' },
];

export default function RoomsIndex() {
    const { rooms = [] } = usePage<SharedData>().props as any;
    const [editingId, setEditingId] = useState<number | null>(null);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Room Management" />

            <div className="p-6">
                <h2 className="text-xl font-semibold">Manage rooms</h2>
                <p className="text-sm text-muted-foreground">Add or remove room types available for booking.</p>

                <div className="mt-4 mb-6 grid gap-4 md:grid-cols-2">
                    <div className="rounded-md border p-4">
                        <div className="font-medium">Existing rooms</div>
                        <div className="mt-3 space-y-2">
                            {rooms.map((r: any) => (
                                <div key={r.id} className="rounded-md border px-3 py-2">
                                    {editingId === r.id ? (
                                        <form
                                            className="space-y-2"
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                const formData = new FormData(e.currentTarget);
                                                router.post(`/rooms/${r.id}`, formData, {
                                                    forceFormData: true,
                                                    onFinish: () => setEditingId(null),
                                                    preserveState: false,
                                                });
                                            }}
                                        >
                                            <input type="hidden" name="_method" value="PATCH" />
                                            <div>
                                                <label className="block text-xs text-muted-foreground">Name</label>
                                                <input name="name" defaultValue={r.name} className="mt-0.5 block w-full rounded-md border px-2 py-1 text-sm" required />
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                <div>
                                                    <label className="block text-xs text-muted-foreground">Price</label>
                                                    <input name="price" type="number" defaultValue={r.price} className="mt-0.5 block w-full rounded-md border px-2 py-1 text-sm" />
                                                </div>
                                                <div>
                                                    <label className="block text-xs text-muted-foreground">Capacity</label>
                                                    <input name="capacity" type="number" defaultValue={r.capacity} className="mt-0.5 block w-full rounded-md border px-2 py-1 text-sm" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs text-muted-foreground">Description</label>
                                                <input name="description" defaultValue={r.description || ''} className="mt-0.5 block w-full rounded-md border px-2 py-1 text-sm" />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-muted-foreground">Image</label>
                                                {r.image && (
                                                    <img src={`/storage/${r.image}`} alt={r.name} className="mt-1 mb-2 h-20 w-32 rounded-md border object-cover" />
                                                )}
                                                <input name="image" type="file" accept="image/*" className="mt-0.5 block w-full text-sm" />
                                            </div>
                                            <div className="flex gap-2">
                                                <button type="submit" className="rounded-md bg-primary px-3 py-1 text-sm text-white">Save</button>
                                                <button type="button" onClick={() => setEditingId(null)} className="rounded-md border px-3 py-1 text-sm">Cancel</button>
                                            </div>
                                        </form>
                                    ) : (
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                {r.image && (
                                                    <img src={`/storage/${r.image}`} alt={r.name} className="h-16 w-24 rounded-md border object-cover" />
                                                )}
                                                <div>
                                                    <div className="font-medium">{r.name}</div>
                                                    <div className="text-sm text-muted-foreground">{r.capacity} · GH₵{r.price}</div>
                                                    {r.description && <div className="text-xs text-muted-foreground mt-0.5">{r.description}</div>}
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => setEditingId(r.id)}
                                                    className="rounded-md border px-3 py-1 text-sm"
                                                >
                                                    Edit
                                                </button>
                                                <Form method="delete" action={`/rooms/${r.id}`} onSubmit={(e: any) => {
                                                    if (!confirm('Remove room "' + r.name + '"?')) { e.preventDefault(); }
                                                }}>
                                                    <button type="submit" className="rounded-md border px-3 py-1 text-sm text-red-600">Delete</button>
                                                </Form>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-md border p-4">
                        <div className="font-medium">Add room</div>
                        <form
                            className="mt-3 grid gap-2"
                            onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                router.post('/rooms', formData, {
                                    forceFormData: true,
                                    onSuccess: () => e.currentTarget.reset(),
                                    preserveState: false,
                                });
                            }}
                        >
                            <div>
                                <label className="block text-sm">Name</label>
                                <input name="name" className="mt-1 block w-full rounded-md border px-2 py-1 text-sm" required />
                            </div>

                            <div>
                                <label className="block text-sm">Price</label>
                                <input name="price" type="number" className="mt-1 block w-full rounded-md border px-2 py-1 text-sm" />
                            </div>

                            <div>
                                <label className="block text-sm">Capacity</label>
                                <input name="capacity" type="number" className="mt-1 block w-full rounded-md border px-2 py-1 text-sm" />
                            </div>

                            <div>
                                <label className="block text-sm">Description</label>
                                <input name="description" className="mt-1 block w-full rounded-md border px-2 py-1 text-sm" />
                            </div>

                            <div>
                                <label className="block text-sm">Image</label>
                                <input name="image" type="file" accept="image/*" className="mt-1 block w-full text-sm" />
                            </div>

                            <div>
                                <button type="submit" className="rounded-md bg-primary px-3 py-2 text-sm text-white">Add room</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
