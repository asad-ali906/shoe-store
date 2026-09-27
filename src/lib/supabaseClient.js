import { createBrowserClient } from "@supabase/ssr";

// This client is used in the browser (client components).
// It reads the two public keys from your .env.local file.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
