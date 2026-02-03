"use client";

import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Rating from "@/components/Rating";

interface Props {
    product: Product;
}

export default function ProductCard({ product }: Props) {
    const { addToCart } = useCart();

    const images = Array.isArray(product.images)
        ? product.images
        : product.images
            ? [product.images]
            : [];

    const imageSrc = images[0] || "/placeholder.jpg";

    return (
        <div
            className="
                group
                bg-black
                border border-white/10
                rounded-2xl
                overflow-hidden
                flex flex-col
                transition
                hover:border-white/30
            "
        >
            {/* IMAGE (click safe) */}
            <div
                className="relative w-full aspect-[3/4] bg-gray-900 overflow-hidden"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <img
                    src={imageSrc}
                    alt={product.name}
                    loading="lazy"
                    className="
                        absolute inset-0
                        w-full h-full
                        object-cover
                        object-center
                        transition-transform duration-300
                        group-hover:scale-105
                    "
                />
            </div>

            {/* CONTENT */}
            <div className="p-4 flex flex-col gap-2 text-white flex-1">
                {/* ⭐ RATING */}
                <Rating value={product.rating} />

                {/* NAME */}
                <h3 className="font-semibold text-sm sm:text-base leading-snug line-clamp-2">
                    {product.name}
                </h3>

                {/* PRICE */}
                <p className="text-gray-300 text-sm font-medium">
                    ₹{product.price}
                </p>

                {/* DESCRIPTION */}
                {product.description && (
                    <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">
                        {product.description}
                    </p>
                )}

                {/* DETAILS (only this navigates) */}
                <Link
                    href={`/product/${product.id}`}
                    className="
                        mt-2
                        w-full text-center
                        py-2
                        border border-white/30
                        rounded-md
                        text-sm
                        hover:bg-white hover:text-black
                        transition
                    "
                >
                    Full Details
                </Link>

                {/* ADD TO CART (navigation blocked) */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        addToCart({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            qty: 1,
                            images: images.length ? images : ["/placeholder.jpg"],
                        });
                    }}
                    className="
                        mt-auto
                        w-full py-2
                        bg-white text-black
                        rounded-md
                        font-medium
                        text-sm
                        hover:bg-gray-200
                        transition
                    "
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
