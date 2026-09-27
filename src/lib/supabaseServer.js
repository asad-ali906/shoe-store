import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// This client is used in server components / server actions.
// It reads the logged-in admin's session from cookies.
export async function createServerSupabase() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // setAll can be called from a Server Component where it's not
            // allowed. Middleware handles session refresh in that case.
          }
        },
      },
    }
  );
}
