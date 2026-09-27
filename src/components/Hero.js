import Link from "next/link";
import Image from "next/image";

export default function Hero({ heroImage, businessName }) {
  return (
    <section className="relative bg-charcoal text-sand overflow-hidden">
      <div className="absolute inset-0">
        {heroImage ? (
          <Image
            src={heroImage}
            alt="Featured shoes"
            fill
            priority
            className="object-cover opacity-50"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/30" />
      </div>

      <div className="relative container-page pt-24 pb-20 md:pt-36 md:pb-32">
        <p className="font-body text-sm text-sand/60 mb-4">
          {businessName || "Qadam Footwear"} · Sheikhupura, Punjab
        </p>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.05] max-w-2xl">
          Shoes built to carry you further, styled to turn heads.
        </h1>
        <p className="mt-5 text-sand/70 max-w-md text-base leading-relaxed">
          Hand-picked men's and women's footwear, delivered across Pakistan.
          Order in seconds — straight to WhatsApp.
        </p>

        <div className="mt-9 flex flex-wrap gap-4">
          <Link href="/men" className="btn-primary bg-sand text-charcoal hover:bg-rust hover:text-sand">
            Shop Men's Shoes
          </Link>
          <Link href="/women" className="btn-outline border-sand text-sand hover:border-rust hover:text-rust">
            Shop Women's Shoes
          </Link>
        </div>
      </div>
    </section>
  );
}
