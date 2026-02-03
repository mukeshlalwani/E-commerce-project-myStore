import Link from "next/link";

export default function SupportPage() {
    return (
        <main className="bg-black text-white min-h-screen">

            {/* ================= PAGE HEADER ================= */}
            <section className="pt-24 pb-16">
                <div className="max-w-6xl mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl font-extrabold">
                        Support Center
                    </h1>

                    <p className="mt-6 text-lg text-gray-300 max-w-2xl">
                        We are here to help you with orders, products, delivery,
                        and any questions related to your shopping experience.
                    </p>
                </div>
            </section>

            {/* ================= SUPPORT OPTIONS ================= */}
            <section className="py-20 border-t border-white/10">
                <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">

                    <SupportCard
                        title="Order Related"
                        desc="Help with order status, confirmation, cancellation, or updates."
                    />

                    <SupportCard
                        title="Product Queries"
                        desc="Questions about size, color, availability, or product details."
                    />

                    <SupportCard
                        title="Delivery & Returns"
                        desc="Support for delivery delays, address changes, or returns."
                    />
                </div>
            </section>

            {/* ================= CONTACT ================= */}
            <section className="py-20 border-t border-white/10">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Need Immediate Help?
                    </h2>

                    <p className="text-gray-400 mb-10">
                        Contact us directly on WhatsApp for fast and personal assistance.
                    </p>

                    <div className="flex justify-center gap-6 flex-wrap">
                        <a
                            href="https://wa.me/91XXXXXXXXXX"
                            target="_blank"
                            className="px-10 py-4 bg-green-500 text-black rounded-full font-semibold hover:scale-105 transition"
                        >
                            Chat on WhatsApp
                        </a>

                        <Link
                            href="/"
                            className="px-10 py-4 border border-white rounded-full hover:bg-white hover:text-black transition"
                        >
                            Go to Home
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

/* ================= SUPPORT CARD ================= */

function SupportCard({
    title,
    desc,
}: {
    title: string;
    desc: string;
}) {
    return (
        <div className="bg-[#111] border border-white/10 rounded-xl p-8 hover:border-white/30 transition">
            <h3 className="text-xl font-semibold mb-4">
                {title}
            </h3>
            <p className="text-gray-400 leading-relaxed">
                {desc}
            </p>
        </div>
    );
}
