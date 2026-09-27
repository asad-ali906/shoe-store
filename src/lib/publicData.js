import { createServerSupabase } from "./supabaseServer";

export async function getSettings() {
  const supabase = await createServerSupabase();
  const { data } = await supabase.from("settings").select("*").eq("id", 1).single();
  return (
    data || {
      business_name: "Qadam Footwear",
      whatsapp_number: "923000000000",
      address: "Sheikhupura, Punjab, Pakistan",
      hero_image_url: null,
      promo_images: [],
    }
  );
}

export async function getVisibleProducts() {
  const supabase = await createServerSupabase();
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("is_hidden", false)
    .order("created_at", { ascending: false });
  return data || [];
}

export async function getProductsByCategory(category) {
  const supabase = await createServerSupabase();
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("is_hidden", false)
    .eq("category", category)
    .order("created_at", { ascending: false });
  return data || [];
}

export async function getProductById(id) {
  const supabase = await createServerSupabase();
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();
  return data;
}

export async function getRelatedProducts(category, excludeId) {
  const supabase = await createServerSupabase();
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("is_hidden", false)
    .eq("category", category)
    .neq("id", excludeId)
    .limit(4);
  return data || [];
}
