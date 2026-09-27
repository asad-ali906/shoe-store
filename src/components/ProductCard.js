import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product }) {
  const hasSale = product.is_sale && product.sale_price;
  const cover = product.images?.[0];

  return (
    <Link href={`/product/${product.id}`} className="group block">
      <div className="relative aspect-[4/5] bg-white overflow-hidden">
        {cover ? (
          <Image
            src={cover}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-charcoal/30 text-sm">
            No image
          </div>
        )}

        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.is_new_arrival && (
            <span className="bg-charcoal text-sand text-[11px] px-2.5 py-1">
              New
            </span>
          )}
          {hasSale && (
            <span className="bg-rust text-sand text-[11px] px-2.5 py-1">
              Sale
            </span>
          )}
        </div>
      </div>

      <div className="mt-3 flex items-start justify-between gap-2">
        <h3 className="font-body text-sm text-charcoal leading-snug">
          {product.name}
        </h3>
      </div>

      <div className="mt-1 flex items-center gap-2">
        {hasSale ? (
          <>
            <span className="text-sm text-rust font-medium">
              PKR {Number(product.sale_price).toLocaleString()}
            </span>
            <span className="text-xs text-charcoal/40 line-through">
              PKR {Number(product.price).toLocaleString()}
            </span>
          </>
        ) : (
          <span className="text-sm text-charcoal font-medium">
            PKR {Number(product.price).toLocaleString()}
          </span>
        )}
      </div>
    </Link>
  );
}
