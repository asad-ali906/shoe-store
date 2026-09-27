import { createServerSupabase } from "@/lib/supabaseServer";
import SettingsForm from "./SettingsForm";

export default async function AdminSettingsPage() {
  const supabase = await createServerSupabase();
  const { data: settings } = await supabase
    .from("settings")
    .select("*")
    .eq("id", 1)
    .single();

  return (
    <div>
      <h1 className="font-display text-2xl text-charcoal mb-8">Store Settings</h1>
      <SettingsForm settings={settings} />
    </div>
  );
}
