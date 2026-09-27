"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";

export default function AdminShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  // The login page has its own full-screen layout with no sidebar.
  if (pathname === "/admin/login") {
    return children;
  }

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  const links = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/products", label: "Products" },
    { href: "/admin/products/new", label: "Add Product" },
    { href: "/admin/settings", label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-sand flex flex-col md:flex-row">
      <aside className="md:w-56 bg-charcoal text-sand flex md:flex-col shrink-0">
        <div className="p-5 font-display text-lg hidden md:block">Owner Panel</div>
        <nav className="flex md:flex-col flex-1 overflow-x-auto md:overflow-visible">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-5 py-3 text-sm whitespace-nowrap ${
                pathname === l.href
                  ? "bg-sand text-charcoal"
                  : "text-sand/70 hover:text-sand"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="px-5 py-3 text-sm text-sand/70 hover:text-rust text-left border-t border-sand/10 md:mt-auto"
        >
          Log Out
        </button>
      </aside>

      <main className="flex-1 p-6 md:p-10 max-w-5xl">{children}</main>
    </div>
  );
}
