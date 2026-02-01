import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome({
  canRegister = true,
}: {
  canRegister?: boolean;
}) {
  const { auth } = usePage<SharedData>().props;

  return (
    <>
      <Head title="De-Rio Hostel">
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link
          href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
          rel="stylesheet"
        />
      </Head>

      <div className="min-h-screen bg-[#FDFDFC] text-[#1b1b18] dark:bg-[#0a0a0a] dark:text-[#EDEDEC]">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <header className="flex items-center justify-between">
            <div className="text-lg font-semibold">DE-RIO HOSTEL</div>
            <nav className="flex items-center gap-3 text-sm">
              {auth.user ? (
                <Link href={dashboard()} className="rounded border px-4 py-2 text-sm">
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link href={login()} className="rounded px-4 py-2 text-sm hover:underline">
                    Log in
                  </Link>
                  {canRegister && (
                    <Link href={register()} className="rounded border px-4 py-2 text-sm">
                      Register
                    </Link>
                  )}
                </>
              )}
            </nav>
          </header>

          <main className="mt-12">
            {/* Hero */}
            <section className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <h1 className="text-4xl font-bold leading-tight">Welcome to De-Rio Hostel</h1>
                <p className="mt-4 max-w-xl text-[#606058] dark:text-[#BFBFB8]">
                  Comfortable beds, friendly staff, and a central location — perfect for
                  travelers and students. Book a room, meet new friends, and explore the
                  city from our doorstep.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={auth.user ? dashboard() : login()}
                    className="inline-block rounded bg-[#1b1b18] px-5 py-2 text-sm text-white hover:opacity-90"
                  >
                    Book a room
                  </Link>
                  {canRegister && !auth.user && (
                    <Link href={register()} className="inline-block rounded border px-5 py-2 text-sm">
                      Create account
                    </Link>
                  )}
                </div>
              </div>

              <div className="order-first lg:order-last">
                <div className="h-56 w-full overflow-hidden rounded-lg bg-[#fff2f2] dark:bg-[#1D0002]">
                  {/* Placeholder: replace with real image assets */}
                  <img
                    src="/images/rooms/hero.jpg"
                    alt="De-Rio Hostel"
                    className="h-56 w-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              </div>
            </section>

            {/* Features */}
            <section className="mt-12">
              <h2 className="text-2xl font-semibold">Why stay with us</h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">Affordable</h3>
                  <p className="mt-2 text-sm text-[#6d6d69] dark:text-[#BFBFB8]">
                    Clean rooms and flexible rates for all budgets.
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">Central Location</h3>
                  <p className="mt-2 text-sm text-[#6d6d69] dark:text-[#BFBFB8]">
                    Close to public transport, shops and nightlife.
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">Friendly Staff</h3>
                  <p className="mt-2 text-sm text-[#6d6d69] dark:text-[#BFBFB8]">24/7 support to make your stay comfortable.</p>
                </div>
              </div>
            </section>

            {/* Rooms */}
            <section className="mt-12">
              <h2 className="text-2xl font-semibold">Rooms</h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { title: 'Single Bed', price: 'GH₵6,000 / Semester', image: '/images/rooms/room1.jpg' },
                  { title: 'Double Bed', price: 'GH₵5,000 / Semester', image: '/images/rooms/room2.jpg' },
                  { title: 'Dormitory', price: 'GH₵2,000 / Semester', image: '/images/rooms/room3.jpg' },
                ].map((r) => (
                  <div key={r.title} className="rounded-lg border p-4">
                    <div className="h-36 w-full overflow-hidden rounded-md bg-gray-100">
                      <img
                        src={r.image}
                        alt={r.title}
                        className="h-36 w-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none'
                        }}
                      />
                    </div>
                    <h3 className="mt-3 font-medium">{r.title}</h3>
                    <p className="mt-1 text-sm text-[#6d6d69] dark:text-[#BFBFB8]">{r.price}</p>
                    <div className="mt-3">
                      <Link href={auth.user ? dashboard() : login()} className="inline-block rounded bg-[#1b1b18] px-4 py-2 text-sm text-white">
                        Book
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Contact */}
            <section className="mt-12 mb-8 rounded-lg border p-6">
              <h2 className="text-xl font-semibold">Contact & Location</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-[#6d6d69] dark:text-[#BFBFB8]">123 De-Rio Street, City Center</p>
                  <p className="mt-2 text-sm">Phone: +233 200 000 0000</p>
                  <p className="mt-1 text-sm">Email: info@de-riohostel.example</p>
                </div>
                <div>
                  <p className="text-sm text-[#6d6d69] dark:text-[#BFBFB8]">Check-in from 2:00 PM — Check-out by 11:00 AM</p>
                </div>
              </div>
            </section>
          </main>
        </div>
        <footer className="border-t py-4 text-center text-sm text-[#6d6d69] dark:text-[#A1A09A]">
          © {new Date().getFullYear()} De-Rio Hostel — All rights reserved
        </footer>
      </div>
    </>
  );
}

