"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { products } from "@/data/products";


export default function Navbar() {
    const { cart } = useCart();
    const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);

    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);

    /* ================= DEBOUNCE ================= */
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
        }, 300);
        return () => clearTimeout(timer);
    }, [query]);

    /* ================= SEARCH ================= */
    const handleSearch = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!query.trim()) return;
        router.push(`/search?q=${encodeURIComponent(query)}`);
        setShowSuggestions(false);
        setOpen(false);
    };

    const clearSearch = () => {
        setQuery("");
        setDebouncedQuery("");
        setShowSuggestions(false);
    };

    const suggestions = products
        .filter(p =>
            p.name.toLowerCase().includes(debouncedQuery.toLowerCase())
        )
        .slice(0, 5);

    return (
        <header className="sticky top-0 z-50 bg-white/90 dark:bg-black/80 backdrop-blur border-b border-black/10 dark:border-white/10">
            <nav className="max-w-7xl mx-auto px-5 py-4 flex items-center gap-4">

                {/* LOGO */}
                <Link href="/" className="text-xl font-semibold text-black dark:text-white">
                    MyStore
                </Link>

                {/* ================= SEARCH BAR (DESKTOP) ================= */}
                <div className="hidden md:block flex-1 max-w-md relative">
                    <input
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setShowSuggestions(true);
                        }}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        placeholder="Search products..."
                        className="
              w-full px-4 py-2 rounded-md
              border border-black/10 dark:border-white/10
              bg-white dark:bg-black
              text-sm outline-none
            "
                    />

                    {/* CLEAR BUTTON */}
                    {query && (
                        <button
                            onClick={clearSearch}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black dark:hover:text-white"
                        >
                            ❌
                        </button>
                    )}

                    {/* SUGGESTIONS */}
                    {showSuggestions && debouncedQuery && (
                        <div className="absolute z-50 mt-2 w-full bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded-md">
                            {suggestions.length === 0 ? (
                                <p className="px-4 py-3 text-sm text-gray-400">
                                    No suggestions
                                </p>
                            ) : (
                                suggestions.map(p => (
                                    <div
                                        key={p.id}
                                        onClick={() => {
                                            router.push(`/product/${p.id}`);
                                            setShowSuggestions(false);
                                        }}
                                        className="px-4 py-3 text-sm cursor-pointer hover:bg-black/5 dark:hover:bg-white/10"
                                    >
                                        {p.name}
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>

                {/* DESKTOP NAV */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <NavLink href="/" label="Home" />
                    <NavLink href="/about" label="About" />
                    <NavLink href="/help" label="Help" />
                    <NavLink href="/support" label="Support" />
                </div>

                {/* RIGHT SIDE */}
                <div className="ml-auto flex items-center gap-4">
                  
                    <Link
                        href="/cart"
                        className="relative px-4 py-2 rounded-md bg-black text-white dark:bg-white dark:text-black text-sm font-medium"
                    >
                        Cart
                        {totalItems > 0 && (
                            <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                                {totalItems}
                            </span>
                        )}
                    </Link>

                    {/* MOBILE MENU */}
                    <button
                        onClick={() => setOpen(!open)}
                        className="md:hidden text-xl text-black dark:text-white"
                    >
                        ☰
                    </button>
                </div>
            </nav>

            {/* ================= MOBILE MENU ================= */}
            {open && (
                <div className="md:hidden bg-white dark:bg-black border-t border-black/10 dark:border-white/10">

                    {/* MOBILE SEARCH */}
                    <div className="px-5 py-4 relative">
                        <input
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value);
                                setShowSuggestions(true);
                            }}
                            placeholder="Search products..."
                            className="w-full px-4 py-2 rounded-md border text-sm outline-none"
                        />

                        {showSuggestions && debouncedQuery && (
                            <div className="mt-2 bg-white dark:bg-black border rounded-md">
                                {suggestions.map(p => (
                                    <div
                                        key={p.id}
                                        onClick={() => {
                                            router.push(`/product/${p.id}`);
                                            setOpen(false);
                                            setShowSuggestions(false);
                                        }}
                                        className="px-4 py-3 text-sm hover:bg-black/5 dark:hover:bg-white/10"
                                    >
                                        {p.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* MOBILE LINKS */}
                    <div className="flex flex-col px-5 pb-4 gap-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                        <MobileLink href="/" label="Home" onClick={() => setOpen(false)} />
                        <MobileLink href="/about" label="About" onClick={() => setOpen(false)} />
                        <MobileLink href="/help" label="Help" onClick={() => setOpen(false)} />
                        <MobileLink href="/support" label="Support" onClick={() => setOpen(false)} />
                    </div>
                </div>
            )}
        </header>
    );
}

/* ================= LINKS ================= */

function NavLink({ href, label }: { href: string; label: string }) {
    return (
        <Link href={href} className="hover:text-black dark:hover:text-white transition">
            {label}
        </Link>
    );
}

function MobileLink({
    href,
    label,
    onClick,
}: {
    href: string;
    label: string;
    onClick: () => void;
}) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="py-2 border-b border-black/5 dark:border-white/10"
        >
            {label}
        </Link>
    );
}
