"use client";

import { useState } from "react";
import Image from "next/image";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function ProductDetailClient({ product, whatsappNumber }) {
  const images = product.images?.length ? product.images : [];
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "");

  const hasSale = product.is_sale && product.sale_price;
  const displayPrice = hasSale ? product.sale_price : product.price;

  return (
    <div className="grid md:grid-cols-2 gap-10">
      <div>
        <div className="relative aspect-square bg-white mb-3">
          {images[activeImage] ? (
            <Image
              src={images[activeImage]}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-charcoal/30 text-sm">
              No image
            </div>
          )}
        </div>

        {images.length > 1 && (
          <div className="flex gap-2">
            {images.map((img, i) => (
              <button
                key={img + i}
                onClick={() => setActiveImage(i)}
                className={`relative w-16 h-16 bg-white border ${
                  i === activeImage ? "border-rust" : "border-charcoal/10"
                }`}
              >
                <Image src={img} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        )}

        {product.video_url && (
          <video
            src={product.video_url}
            controls
            className="w-full mt-4 bg-black"
            preload="metadata"
          />
        )}
      </div>

      <div>
        <p className="text-xs uppercase tracking-wide text-charcoal/50 mb-2">
          {product.category === "men" ? "Men's Shoes" : "Women's Shoes"}
        </p>
        <h1 className="font-display text-3xl text-charcoal mb-3">{product.name}</h1>

        <div className="flex items-center gap-3 mb-6">
          {hasSale ? (
            <>
              <span className="text-xl text-rust font-medium">
                PKR {Number(product.sale_price).toLocaleString()}
              </span>
              <span className="text-base text-charcoal/40 line-through">
                PKR {Number(product.price).toLocaleString()}
              </span>
            </>
          ) : (
            <span className="text-xl text-charcoal font-medium">
              PKR {Number(product.price).toLocaleString()}
            </span>
          )}
        </div>

        {product.description && (
          <p className="text-charcoal/70 text-sm leading-relaxed mb-8 max-w-md">
            {product.description}
          </p>
        )}

        {product.sizes?.length > 0 && (
          <div className="mb-6">
            <p className="label">Size</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`px-4 py-2 text-sm border ${
                    selectedSize === s
                      ? "border-charcoal bg-charcoal text-sand"
                      : "border-charcoal/20 text-charcoal"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {product.colors?.length > 0 && (
          <div className="mb-8">
            <p className="label">Color</p>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  className={`px-4 py-2 text-sm border ${
                    selectedColor === c
                      ? "border-charcoal bg-charcoal text-sand"
                      : "border-charcoal/20 text-charcoal"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}

        <WhatsAppButton
          number={whatsappNumber}
          productName={product.name}
          price={displayPrice}
          size={selectedSize}
          color={selectedColor}
          className="w-full md:w-auto px-10 py-4 text-base"
        />
      </div>
    </div>
  );
}
