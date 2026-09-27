import Link from "next/link";
import { createServerSupabase } from "@/lib/supabaseServer";

export default async function AdminDashboard() {
  const supabase = await createServerSupabase();
  const { data: products } = await supabase.from("products").select("*");

  const all = products || [];
  const stats = {
    total: all.length,
    men: all.filter((p) => p.category === "men").length,
    women: all.filter((p) => p.category === "women").length,
    sale: all.filter((p) => p.is_sale).length,
  };

  const recent = [...all]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-2xl text-charcoal">Dashboard</h1>
        <Link href="/admin/products/new" className="btn-primary">
          + Quick Add Product
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <StatCard label="Total Products" value={stats.total} />
        <StatCard label="Men's Products" value={stats.men} />
        <StatCard label="Women's Products" value={stats.women} />
        <StatCard label="On Sale" value={stats.sale} />
      </div>

      <h2 className="font-display text-lg text-charcoal mb-4">Recent Products</h2>
      {recent.length === 0 ? (
        <p className="text-charcoal/50 text-sm">
          No products yet.{" "}
          <Link href="/admin/products/new" className="underline">
            Add your first product
          </Link>
          .
        </p>
      ) : (
        <div className="bg-white divide-y divide-charcoal/10">
          {recent.map((p) => (
            <div key={p.id} className="flex items-center justify-between px-5 py-3">
              <div>
                <p className="text-sm text-charcoal">{p.name}</p>
                <p className="text-xs text-charcoal/50">
                  {p.category === "men" ? "Men's" : "Women's"} · PKR {Number(p.price).toLocaleString()}
                </p>
              </div>
              <Link
                href={`/admin/products/${p.id}/edit`}
                className="text-sm text-rust hover:underline"
              >
                Edit
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-white p-5">
      <p className="text-2xl font-display text-charcoal">{value}</p>
      <p className="text-xs text-charcoal/50 mt-1">{label}</p>
    </div>
  );
}
