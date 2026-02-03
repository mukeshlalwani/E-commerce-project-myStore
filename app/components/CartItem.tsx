"use client";

import { CartItem as CartItemType } from "@/types/cart";
import { useCart } from "@/context/CartContext";

interface Props {
    item: CartItemType;
}

export default function CartItem({ item }: Props) {
    const { increaseQty, decreaseQty, removeFromCart } = useCart();

    // 🔥 HARD SAFE IMAGE RESOLUTION
    let imageSrc = "/placeholder.jpg";

    // case 1: item.image exists
    if ((item as any).image) {
        imageSrc = (item as any).image;
    }

    // case 2: item.images exists
    if (Array.isArray((item as any).images) && (item as any).images.length > 0) {
        imageSrc = (item as any).images[0];
    }

    // ensure leading slash
    if (!imageSrc.startsWith("/")) {
        imageSrc = "/" + imageSrc;
    }

    return (
        <div
            className="
        group relative overflow-hidden
        rounded-3xl p-[1px]
        bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30
        transition-all
      "
        >
            <div
                className="
          flex flex-col md:flex-row
          items-start md:items-center
          justify-between gap-6
          rounded-3xl p-6
          bg-black/70
          backdrop-blur-xl
        "
            >
                {/* LEFT */}
                <div className="flex items-center gap-5 flex-1">
                    {/* ✅ FIXED IMAGE (DESKTOP + MOBILE SAFE) */}
                    <div
                        className="
                            relative
                            h-20 w-20
                            sm:h-24 sm:w-24
                            rounded-2xl
                            overflow-hidden
                            bg-gray-800
                            flex-shrink-0
                        "
                    >
                        <img
                            src={imageSrc}
                            alt={item.name}
                            loading="lazy"
                            className="
                                absolute inset-0
                                h-full w-full
                                object-cover
                                object-center
                            "
                        />
                    </div>

                    {/* INFO */}
                    <div>
                        <h3 className="text-lg font-semibold text-white">
                            {item.name}
                        </h3>

                        {item.size && (
                            <p className="text-xs text-gray-400">
                                Size: {item.size}
                            </p>
                        )}

                        <p className="text-sm text-gray-400">
                            ₹{item.price} / item
                        </p>
                    </div>
                </div>

                {/* QTY */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => decreaseQty(item.id, item.size)}
                        className="h-10 w-10 rounded-full bg-gray-800 text-white"
                    >
                        −
                    </button>

                    <span className="text-lg font-semibold text-white">
                        {item.qty}
                    </span>

                    <button
                        onClick={() => increaseQty(item.id, item.size)}
                        className="h-10 w-10 rounded-full bg-gray-800 text-white"
                    >
                        +
                    </button>
                </div>

                {/* PRICE + REMOVE */}
                <div className="flex items-center gap-6">
                    <div className="text-xl font-bold text-green-400">
                        ₹{item.qty * item.price}
                    </div>

                    <button
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="px-4 py-2 rounded-full bg-red-600/20 text-red-400"
                    >
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
}
