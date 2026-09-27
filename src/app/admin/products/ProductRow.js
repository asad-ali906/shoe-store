"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";

export default function ProductRow({ product }) {
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  async function toggleHidden() {
    setBusy(true);
    const supabase = createClient();
    await supabase
      .from("products")
      .update({ is_hidden: !product.is_hidden })
      .eq("id", product.id);
    setBusy(false);
    router.refresh();
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      `Delete "${product.name}"? This can't be undone — use this once the item is sold out.`
    );
    if (!confirmed) return;

    setBusy(true);
    const supabase = createClient();
    await supabase.from("products").delete().eq("id", product.id);
    setBusy(false);
    router.refresh();
  }

  return (
    <div className="flex items-center justify-between px-5 py-3 gap-4">
      <div className="flex-1 min-w-0">
        <p className="text-sm text-charcoal truncate">{product.name}</p>
        <p className="text-xs text-charcoal/50">
          {product.category === "men" ? "Men's" : "Women's"} · PKR{" "}
          {Number(product.price).toLocaleString()}
          {product.is_hidden && (
            <span className="ml-2 text-rust">Hidden</span>
          )}
          {product.is_sale && <span className="ml-2">On Sale</span>}
          {product.is_new_arrival && <span className="ml-2">New</span>}
        </p>
      </div>

      <div className="flex items-center gap-4 shrink-0">
        <button
          onClick={toggleHidden}
          disabled={busy}
          className="text-sm text-charcoal/70 hover:text-charcoal"
        >
          {product.is_hidden ? "Unhide" : "Hide"}
        </button>
        <Link
          href={`/admin/products/${product.id}/edit`}
          className="text-sm text-charcoal/70 hover:text-charcoal"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          disabled={busy}
          className="text-sm text-rust hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
