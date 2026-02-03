"use client";

import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { useState } from "react";

export default function WomenPage() {
    const [activeFilter, setActiveFilter] = useState("All");

    /* ================= FILTER LOGIC (FIXED) ================= */
    const womenProducts = products.filter(p => {
        // All → women + jewellery
        if (activeFilter === "All") {
            return p.category === "women" || p.category === "women-jewellery";
        }

        // Jewellery only
        if (activeFilter === "Jewellery") {
            return p.category === "women-jewellery";
        }

        // Other filters (Top, Dress, Kurti...)
        return (
            p.category === "women" &&
            p.name.toLowerCase().includes(activeFilter.toLowerCase())
        );
    });

    return (
        <main className="relative">

            {/* ================= HERO ================= */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/womenHome.jpg')" }}
                />
                <div className="absolute inset-0 bg-black/60" />

                <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 ml-auto text-right">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white">
                        Women Collection
                    </h1>

                    <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-200 max-w-xl ml-auto">
                        Elegant fashion • Modern styles • Designed to make you stand out
                    </p>

                    <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-end">
                        <Link
                            href="/cart"
                            className="px-8 sm:px-10 py-4 rounded-full bg-white text-black font-semibold text-center"
                        >
                            View Cart
                        </Link>

                        <Link
                            href="/"
                            className="px-8 sm:px-10 py-4 rounded-full border border-white text-white font-semibold text-center hover:bg-white hover:text-black transition"
                        >
                            Explore More
                        </Link>
                    </div>
                </div>
            </section>

            {/* ================= FILTER BAR ================= */}
            <section className="relative z-10 bg-white/80 dark:bg-gray-950/80 backdrop-blur border-b border-black/5 dark:border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex gap-3 overflow-x-auto scrollbar-hide">
                    {["All", "Kurti", "Dress", "Top", "Ethnic", "Footwear", "Jewellery"].map(label => (
                        <FilterBadge
                            key={label}
                            label={label}
                            active={activeFilter === label}
                            onClick={setActiveFilter}
                        />
                    ))}
                </div>
            </section>

            {/* ================= PRODUCTS GRID ================= */}
            <section className="py-16 sm:py-24 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
                        {womenProducts.map(p => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= CTA ================= */}
            <section className="pb-16 sm:pb-24 text-center px-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                    Loved the Collection?
                </h2>

                <p className="text-gray-600 dark:text-gray-400 mb-8">
                    Add your favorite items and order instantly via WhatsApp
                </p>

                <Link
                    href="/cart"
                    className="inline-block px-10 py-4 rounded-full text-lg font-semibold bg-gradient-to-r from-pink-600 to-purple-600 text-white"
                >
                    Order Now 💬
                </Link>
            </section>
        </main>
    );
}

/* ================= FILTER BADGE ================= */
function FilterBadge({
    label,
    active,
    onClick,
}: {
    label: string;
    active: boolean;
    onClick: (value: string) => void;
}) {
    return (
        <span
            onClick={() => onClick(label)}
            className={`px-5 py-2 rounded-full text-sm font-medium cursor-pointer whitespace-nowrap
            ${active
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "bg-pink-50 text-pink-700 dark:bg-gray-900 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-gray-800"}`}
        >
            {label}
        </span>
    );
}
