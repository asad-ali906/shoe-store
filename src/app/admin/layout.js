import AdminShell from "./AdminShell";

// Note: actual route protection happens in src/middleware.js, which
// redirects any non-logged-in visitor away from every /admin/* page.
export default function AdminLayout({ children }) {
  return <AdminShell>{children}</AdminShell>;
}
