"use client";

import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products, showCategoryFilter = false }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sizeFilter, setSizeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all"); // all | new | sale
  const [maxPrice, setMaxPrice] = useState("");

  const allSizes = useMemo(() => {
    const set = new Set();
    products.forEach((p) => (p.sizes || []).forEach((s) => set.add(s)));
    return Array.from(set).sort();
  }, [products]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      if (showCategoryFilter && category !== "all" && p.category !== category) {
        return false;
      }
      if (sizeFilter !== "all" && !(p.sizes || []).includes(sizeFilter)) {
        return false;
      }
      if (statusFilter === "new" && !p.is_new_arrival) return false;
      if (statusFilter === "sale" && !p.is_sale) return false;
      if (maxPrice) {
        const effectivePrice = p.is_sale && p.sale_price ? p.sale_price : p.price;
        if (Number(effectivePrice) > Number(maxPrice)) return false;
      }
      return true;
    });
  }, [products, search, category, sizeFilter, statusFilter, maxPrice]);

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-8 items-center">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="field max-w-[220px]"
        />

        {showCategoryFilter && (
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="field max-w-[150px]"
          >
            <option value="all">All categories</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
          </select>
        )}

        {allSizes.length > 0 && (
          <select
            value={sizeFilter}
            onChange={(e) => setSizeFilter(e.target.value)}
            className="field max-w-[130px]"
          >
            <option value="all">All sizes</option>
            {allSizes.map((s) => (
              <option key={s} value={s}>
                Size {s}
              </option>
            ))}
          </select>
        )}

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="field max-w-[160px]"
        >
          <option value="all">All products</option>
          <option value="new">New arrivals</option>
          <option value="sale">On sale</option>
        </select>

        <input
          type="number"
          placeholder="Max price (PKR)"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="field max-w-[160px]"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-charcoal/50 text-sm py-16 text-center">
          No products match your filters yet.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
