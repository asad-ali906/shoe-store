import Link from "next/link";
import { createServerSupabase } from "@/lib/supabaseServer";
import ProductRow from "./ProductRow";

export default async function AdminProductsPage() {
  const supabase = await createServerSupabase();
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-2xl text-charcoal">Products</h1>
        <Link href="/admin/products/new" className="btn-primary">
          + Add Product
        </Link>
      </div>

      {!products || products.length === 0 ? (
        <p className="text-charcoal/50 text-sm">No products yet.</p>
      ) : (
        <div className="bg-white divide-y divide-charcoal/10">
          {products.map((p) => (
            <ProductRow key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
