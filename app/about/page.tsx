import Link from "next/link";

export default function AboutPage() {
    return (
        <main className="bg-black text-white">

            {/* ================= PAGE HEADER ================= */}
            <section className="pt-24 pb-16">
                <div className="max-w-6xl mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl font-extrabold">
                        About Our Store
                    </h1>

                    <p className="mt-6 text-lg text-gray-300 max-w-2xl">
                        A modern WhatsApp-first shopping experience designed for speed,
                        simplicity, and real human support.
                    </p>
                </div>
            </section>

            {/* ================= ABOUT CONTENT ================= */}
            <section className="py-20 border-t border-white/10">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20">

                    {/* WHO WE ARE */}
                    <div>
                        <h2 className="text-3xl font-bold mb-6">
                            Who We Are
                        </h2>

                        <p className="text-gray-300 leading-relaxed mb-5">
                            We are a WhatsApp-based eCommerce platform built for people who
                            prefer simplicity over complexity. No accounts, no long forms,
                            and no confusing checkout processes.
                        </p>

                        <p className="text-gray-300 leading-relaxed">
                            Our goal is to make online shopping as easy as chatting.
                            Browse products, add items to cart, and place your order
                            directly on WhatsApp with a real person.
                        </p>
                    </div>

                    {/* WHY CHOOSE US */}
                    <div>
                        <h2 className="text-3xl font-bold mb-6">
                            Why Choose Us
                        </h2>

                        <ul className="space-y-4 text-gray-300">
                            <li>✔ WhatsApp-first ordering</li>
                            <li>✔ No login or signup required</li>
                            <li>✔ Direct seller communication</li>
                            <li>✔ Fast replies & personal support</li>
                            <li>✔ Clean and transparent experience</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* ================= VALUES ================= */}
            <section className="py-20 border-t border-white/10">
                <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">

                    <ValueCard
                        title="Simplicity"
                        desc="No unnecessary steps. Just shop and order."
                    />

                    <ValueCard
                        title="Speed"
                        desc="Fast checkout and quick WhatsApp response."
                    />

                    <ValueCard
                        title="Trust"
                        desc="Real people, clear communication, honest service."
                    />
                </div>
            </section>

            {/* ================= CTA ================= */}
            <section className="pb-24 pt-10 text-center border-t border-white/10">
                <h3 className="text-2xl md:text-3xl font-bold mb-6">
                    Ready to Start Shopping?
                </h3>

                <p className="text-gray-400 mb-10">
                    Explore categories and order instantly via WhatsApp.
                </p>

                <div className="flex justify-center gap-6 flex-wrap">
                    <Link
                        href="/"
                        className="px-10 py-4 bg-white text-black rounded-full font-semibold hover:scale-105 transition"
                    >
                        Go to Home
                    </Link>

                    <Link
                        href="/cart"
                        className="px-10 py-4 border border-white rounded-full hover:bg-white hover:text-black transition"
                    >
                        View Cart
                    </Link>
                </div>
            </section>
        </main>
    );
}

/* ================= VALUE CARD ================= */

function ValueCard({
    title,
    desc,
}: {
    title: string;
    desc: string;
}) {
    return (
        <div className="bg-[#111] border border-white/10 rounded-xl p-8 hover:border-white/30 transition">
            <h4 className="text-xl font-semibold mb-3">
                {title}
            </h4>
            <p className="text-gray-400 text-sm">
                {desc}
            </p>
        </div>
    );
}
