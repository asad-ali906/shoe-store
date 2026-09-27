import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import { WhatsAppFloatingButton } from "@/components/WhatsAppButton";
import { getSettings, getProductsByCategory } from "@/lib/publicData";

export const metadata = {
  title: "Women's Shoes — Qadam Footwear",
  description: "Shop premium women's shoes with fast WhatsApp ordering.",
};

export default async function WomenPage() {
  const settings = await getSettings();
  const products = await getProductsByCategory("women");

  return (
    <>
      <Header businessName={settings.business_name} />
      <main className="container-page py-14">
        <h1 className="font-display text-3xl md:text-4xl text-charcoal mb-8">
          Women's Shoes
        </h1>
        <ProductGrid products={products} />
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
