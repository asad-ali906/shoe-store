"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";

export default function SettingsForm({ settings }) {
  const router = useRouter();
  const supabase = createClient();

  const [businessName, setBusinessName] = useState(settings?.business_name || "");
  const [whatsappNumber, setWhatsappNumber] = useState(settings?.whatsapp_number || "");
  const [address, setAddress] = useState(settings?.address || "");
  const [heroImageUrl, setHeroImageUrl] = useState(settings?.hero_image_url || "");
  const [newHeroFile, setNewHeroFile] = useState(null);
  const [newHeroPreview, setNewHeroPreview] = useState(null);
  const [promoImages, setPromoImages] = useState(settings?.promo_images || []);
  const [newPromoFiles, setNewPromoFiles] = useState([]);
  const [newPromoPreviews, setNewPromoPreviews] = useState([]);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  function handleHeroSelect(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setNewHeroFile(file);
    setNewHeroPreview(URL.createObjectURL(file));
  }

  function handlePromoSelect(e) {
    const files = Array.from(e.target.files || []);
    setNewPromoFiles((prev) => [...prev, ...files]);
    setNewPromoPreviews((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))]);
  }

  function removePromoImage(url) {
    setPromoImages((prev) => prev.filter((u) => u !== url));
  }

  async function uploadFile(file, folder) {
    const ext = file.name.split(".").pop();
    const path = `${folder}/${crypto.randomUUID()}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from("site-assets")
      .upload(path, file, { cacheControl: "3600", upsert: false });
    if (uploadError) throw uploadError;
    const { data } = supabase.storage.from("site-assets").getPublicUrl(path);
    return data.publicUrl;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSaved(false);
    setSaving(true);

    try {
      let finalHeroUrl = heroImageUrl;
      if (newHeroFile) {
        finalHeroUrl = await uploadFile(newHeroFile, "hero");
      }

      const uploadedPromoUrls = [];
      for (const file of newPromoFiles) {
        uploadedPromoUrls.push(await uploadFile(file, "promo"));
      }

      const { error: updateError } = await supabase
        .from("settings")
        .update({
          business_name: businessName,
          whatsapp_number: whatsappNumber,
          address,
          hero_image_url: finalHeroUrl,
          promo_images: [...promoImages, ...uploadedPromoUrls],
        })
        .eq("id", 1);

      if (updateError) throw updateError;

      setSaved(true);
      router.refresh();
    } catch (err) {
      setError(err.message || "Could not save settings.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <div>
        <label className="label">Business Name</label>
        <input
          className="field"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
        />
      </div>

      <div>
        <label className="label">WhatsApp Number (with country code, no spaces)</label>
        <input
          className="field"
          value={whatsappNumber}
          onChange={(e) => setWhatsappNumber(e.target.value)}
          placeholder="923001234567"
        />
        <p className="text-xs text-charcoal/50 mt-1">
          Example: for 0300-1234567, enter 923001234567
        </p>
      </div>

      <div>
        <label className="label">Store Address</label>
        <textarea
          className="field"
          rows={3}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div>
        <label className="label">Homepage Banner Image</label>
        <input type="file" accept="image/*" onChange={handleHeroSelect} className="text-sm" />
        {(newHeroPreview || heroImageUrl) && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={newHeroPreview || heroImageUrl}
            alt=""
            className="w-full max-w-md h-40 object-cover mt-3"
          />
        )}
      </div>

      <div>
        <label className="label">Promotional Images (optional)</label>
        <input type="file" accept="image/*" multiple onChange={handlePromoSelect} className="text-sm" />
        <div className="flex flex-wrap gap-3 mt-3">
          {promoImages.map((url) => (
            <div key={url} className="relative w-20 h-20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="w-20 h-20 object-cover" />
              <button
                type="button"
                onClick={() => removePromoImage(url)}
                className="absolute -top-2 -right-2 bg-charcoal text-sand w-5 h-5 text-xs rounded-full"
              >
                ×
              </button>
            </div>
          ))}
          {newPromoPreviews.map((url) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={url} src={url} alt="" className="w-20 h-20 object-cover" />
          ))}
        </div>
      </div>

      {error && <p className="text-rust text-sm">{error}</p>}
      {saved && <p className="text-moss text-sm">Settings saved.</p>}

      <button type="submit" disabled={saving} className="btn-primary">
        {saving ? "Saving..." : "Save Settings"}
      </button>
    </form>
  );
}
