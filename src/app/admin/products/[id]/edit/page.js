import { createServerSupabase } from "@/lib/supabaseServer";
import { notFound } from "next/navigation";
import ProductForm from "../../ProductForm";

export default async function EditProductPage({ params }) {
  const { id } = await params;
  const supabase = await createServerSupabase();
  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (!product) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl text-charcoal mb-8">Edit Product</h1>
      <ProductForm existingProduct={product} />
    </div>
  );
}
