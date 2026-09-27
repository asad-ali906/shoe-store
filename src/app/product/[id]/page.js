import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { WhatsAppFloatingButton } from "@/components/WhatsAppButton";
import { getSettings, getProductById, getRelatedProducts } from "@/lib/publicData";
import { notFound } from "next/navigation";
import ProductDetailClient from "./ProductDetailClient";

export default async function ProductPage({ params }) {
  const { id } = await params;
  const settings = await getSettings();
  const product = await getProductById(id);

  if (!product || product.is_hidden) {
    notFound();
  }

  const related = await getRelatedProducts(product.category, product.id);

  return (
    <>
      <Header businessName={settings.business_name} />
      <main className="container-page py-12">
        <ProductDetailClient product={product} whatsappNumber={settings.whatsapp_number} />

        {related.length > 0 && (
          <section className="mt-24">
            <h2 className="font-display text-2xl text-charcoal mb-6">
              You may also like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
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
