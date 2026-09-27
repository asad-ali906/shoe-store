import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { WhatsAppFloatingButton } from "@/components/WhatsAppButton";
import { getSettings, getVisibleProducts } from "@/lib/publicData";
import Link from "next/link";

export default async function HomePage() {
  const settings = await getSettings();
  const products = await getVisibleProducts();

  const featured = products.slice(0, 4);
  const newArrivals = products.filter((p) => p.is_new_arrival).slice(0, 4);
  const onSale = products.filter((p) => p.is_sale).slice(0, 4);

  return (
    <>
      <Header businessName={settings.business_name} />
      <Hero heroImage={settings.hero_image_url} businessName={settings.business_name} />

      <main className="container-page py-16 space-y-20">
        {featured.length > 0 && (
          <section>
            <div className="flex items-end justify-between mb-6">
              <h2 className="font-display text-2xl text-charcoal">Featured</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10">
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

        {newArrivals.length > 0 && (
          <section id="new-arrivals">
            <div className="flex items-end justify-between mb-6">
              <h2 className="font-display text-2xl text-charcoal">New Arrivals</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10">
              {newArrivals.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

        {onSale.length > 0 && (
          <section id="sale">
            <div className="flex items-end justify-between mb-6">
              <h2 className="font-display text-2xl text-charcoal">On Sale</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10">
              {onSale.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

        {products.length === 0 && (
          <section className="text-center py-24">
            <h2 className="font-display text-2xl text-charcoal mb-3">
              Products coming soon
            </h2>
            <p className="text-charcoal/60 text-sm">
              Log in to the{" "}
              <Link href="/admin/login" className="underline">
                admin dashboard
              </Link>{" "}
              to add your first product.
            </p>
          </section>
        )}

        <section className="grid sm:grid-cols-2 gap-6">
          <Link
            href="/men"
            className="relative bg-charcoal text-sand p-10 flex flex-col justify-end min-h-[220px] group overflow-hidden"
          >
            <span className="font-display text-3xl relative z-10">Men's Collection</span>
            <span className="text-sand/60 text-sm mt-2 relative z-10 group-hover:text-rust transition-colors">
              Shop now →
            </span>
          </Link>
          <Link
            href="/women"
            className="relative bg-clay text-sand p-10 flex flex-col justify-end min-h-[220px] group overflow-hidden"
          >
            <span className="font-display text-3xl relative z-10">Women's Collection</span>
            <span className="text-sand/60 text-sm mt-2 relative z-10 group-hover:text-charcoal transition-colors">
              Shop now →
            </span>
          </Link>
        </section>
      </main>

      <Footer
        businessName={settings.business_name}
        address={settings.address}
        whatsappNumber={settings.whatsapp_number}
      />
      <WhatsAppFloatingButton number={settings.whatsapp_number} />
    </>
  );
}
