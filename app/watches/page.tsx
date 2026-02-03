"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

/* ================= FILTER CONFIG ================= */
// All = saari watches
const WATCH_FILTERS: Record<string, string> = {
    All: "all",
    Luxury: "luxury",
    "Smart Watches": "smart",
    Analog: "analog",
    Digital: "digital",
    Sports: "sports",
};

export default function WatchesPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const typeParam = searchParams.get("type") || "All";
    const sortParam = searchParams.get("sort") || "none";
    const priceParam = Number(searchParams.get("price")) || 20000;

    const [activeType, setActiveType] = useState(typeParam);
    const [priceRange, setPriceRange] = useState(priceParam);
    const [sort, setSort] = useState(sortParam);
    const [loading, setLoading] = useState(false);

    /* ================= PRODUCTS FILTER ================= */

    const filteredProducts = useMemo(() => {
        let data = products.filter(p => p.category === "watches");

        // All = saari watches
        if (activeType !== "All") {
            const typeValue = WATCH_FILTERS[activeType];
            data = data.filter(p => p.watchType === typeValue);
        }

        // price filter
        data = data.filter(p => p.price <= priceRange);

        // sorting
        if (sort === "low") data = [...data].sort((a, b) => a.price - b.price);
        if (sort === "high") data = [...data].sort((a, b) => b.price - a.price);

        return data;
    }, [activeType, priceRange, sort]);

    /* ================= URL SYNC ================= */

    useEffect(() => {
        setLoading(true);
        const t = setTimeout(() => setLoading(false), 300);

        const params = new URLSearchParams();
        if (activeType !== "All") params.set("type", activeType);
        if (priceRange !== 20000) params.set("price", String(priceRange));
        if (sort !== "none") params.set("sort", sort);

        router.replace(`?${params.toString()}`, { scroll: false });

        return () => clearTimeout(t);
    }, [activeType, priceRange, sort, router]);

    return (
        <main className="relative">

            {/* ================= HERO ================= */}
            <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-zinc-100 to-gray-200 dark:from-black dark:to-gray-900">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h1 className="text-5xl md:text-7xl font-extrabold">
                        Watch Collection
                    </h1>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">
                        Precision • Luxury • Smart Technology
                    </p>

                    <div className="mt-10 flex justify-center gap-4">
                        <Link
                            href="/cart"
                            className="px-10 py-4 rounded-full bg-black text-white dark:bg-white dark:text-black"
                        >
                            View Cart
                        </Link>
                        <Link
                            href="/"
                            className="px-10 py-4 rounded-full border"
                        >
                            Home
                        </Link>
                    </div>
                </div>
            </section>

            {/* ================= FILTER BAR (NOT STICKY) ================= */}
            <section className="relative z-10 bg-white/90 dark:bg-black/90 backdrop-blur border-b">
                <div className="max-w-7xl mx-auto px-4 py-6 space-y-5">

                    {/* TYPE FILTER */}
                    <div className="flex flex-wrap gap-3">
                        {Object.keys(WATCH_FILTERS).map(label => (
                            <FilterBadge
                                key={label}
                                label={label}
                                active={activeType === label}
                                onClick={() => setActiveType(label)}
                            />
                        ))}
                    </div>

                    {/* PRICE + SORT */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:items-center">

                        {/* PRICE RANGE */}
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-500">
                                Max ₹{priceRange}
                            </span>
                            <input
                                type="range"
                                min={1000}
                                max={20000}
                                step={500}
                                value={priceRange}
                                onChange={e => setPriceRange(+e.target.value)}
                                className="w-[160px] sm:w-[200px]"
                            />
                        </div>

                        {/* SORT */}
                        <select
                            value={sort}
                            onChange={e => setSort(e.target.value)}
                            className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800"
                        >
                            <option value="none">Sort</option>
                            <option value="low">Price: Low → High</option>
                            <option value="high">Price: High → Low</option>
                        </select>

                        <span className="text-sm text-gray-500">
                            {filteredProducts.length} Products
                        </span>
                    </div>
                </div>
            </section>

            {/* ================= PRODUCTS GRID ================= */}
            <section className="py-20 px-6">
                <div
                    className={`max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 transition-opacity duration-300 ${loading ? "opacity-40" : "opacity-100"
                        }`}
                >
                    {loading
                        ? Array.from({ length: 8 }).map((_, i) => (
                            <Skeleton key={i} />
                        ))
                        : filteredProducts.map(p => (
                            <ProductCard key={p.id} product={p} />
                        ))
                    }
                </div>

                {!loading && filteredProducts.length === 0 && (
                    <p className="text-center text-gray-400 mt-16">
                        No watches found
                    </p>
                )}
            </section>

            {/* ================= CTA ================= */}
            <section className="pb-24 text-center">
                <Link
                    href="/cart"
                    className="inline-block px-14 py-6 rounded-full bg-gradient-to-r from-cyan-600 to-indigo-600 text-white text-xl font-semibold"
                >
                    Order Now ⌚
                </Link>
            </section>
        </main>
    );
}

/* ================= COMPONENTS ================= */

function FilterBadge({ label, active, onClick }: any) {
    return (
        <button
            onClick={onClick}
            className={`px-5 py-2 rounded-full text-sm font-medium transition
            ${active
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "bg-zinc-100 text-zinc-700 dark:bg-gray-900 dark:text-gray-300"
                }`}
        >
            {label}
        </button>
    );
}

function Skeleton() {
    return (
        <div className="rounded-xl border border-white/10 p-4 animate-pulse">
            <div className="h-40 bg-gray-300 dark:bg-gray-700 rounded-lg mb-4" />
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
        </div>
    );
}
