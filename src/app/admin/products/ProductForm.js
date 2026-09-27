"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";

const MAX_VIDEO_SECONDS = 10;

export default function ProductForm({ existingProduct }) {
  const isEdit = !!existingProduct;
  const router = useRouter();
  const supabase = createClient();

  const [name, setName] = useState(existingProduct?.name || "");
  const [category, setCategory] = useState(existingProduct?.category || "men");
  const [price, setPrice] = useState(existingProduct?.price || "");
  const [salePrice, setSalePrice] = useState(existingProduct?.sale_price || "");
  const [description, setDescription] = useState(existingProduct?.description || "");
  const [sizes, setSizes] = useState((existingProduct?.sizes || []).join(", "));
  const [colors, setColors] = useState((existingProduct?.colors || []).join(", "));
  const [isNewArrival, setIsNewArrival] = useState(existingProduct?.is_new_arrival || false);
  const [isSale, setIsSale] = useState(existingProduct?.is_sale || false);

  const [existingImages, setExistingImages] = useState(existingProduct?.images || []);
  const [newImageFiles, setNewImageFiles] = useState([]);
  const [newImagePreviews, setNewImagePreviews] = useState([]);

  const [existingVideo, setExistingVideo] = useState(existingProduct?.video_url || null);
  const [newVideoFile, setNewVideoFile] = useState(null);
  const [newVideoPreview, setNewVideoPreview] = useState(null);

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function handleImageSelect(e) {
    const files = Array.from(e.target.files || []);
    setNewImageFiles((prev) => [...prev, ...files]);
    setNewImagePreviews((prev) => [
      ...prev,
      ...files.map((f) => URL.createObjectURL(f)),
    ]);
  }

  function removeExistingImage(url) {
    setExistingImages((prev) => prev.filter((u) => u !== url));
  }

  function removeNewImage(index) {
    setNewImageFiles((prev) => prev.filter((_, i) => i !== index));
    setNewImagePreviews((prev) => prev.filter((_, i) => i !== index));
  }

  function handleVideoSelect(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const videoEl = document.createElement("video");
    videoEl.preload = "metadata";
    videoEl.onloadedmetadata = () => {
      window.URL.revokeObjectURL(videoEl.src);
      if (videoEl.duration > MAX_VIDEO_SECONDS + 0.5) {
        setError(
          `Video must be ${MAX_VIDEO_SECONDS} seconds or shorter (this one is ${Math.round(
            videoEl.duration
          )}s).`
        );
        return;
      }
      setError("");
      setNewVideoFile(file);
      setNewVideoPreview(URL.createObjectURL(file));
    };
    videoEl.src = URL.createObjectURL(file);
  }

  async function uploadFile(file, folder) {
    const ext = file.name.split(".").pop();
    const path = `${folder}/${crypto.randomUUID()}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from("product-media")
      .upload(path, file, { cacheControl: "3600", upsert: false });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from("product-media").getPublicUrl(path);
    return data.publicUrl;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const uploadedImageUrls = [];
      for (const file of newImageFiles) {
        const url = await uploadFile(file, "images");
        uploadedImageUrls.push(url);
      }

      let videoUrl = existingVideo;
      if (newVideoFile) {
        videoUrl = await uploadFile(newVideoFile, "videos");
      }

      const payload = {
        name,
        category,
        price: Number(price),
        sale_price: salePrice ? Number(salePrice) : null,
        description,
        sizes: sizes
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        colors: colors
          .split(",")
          .map((c) => c.trim())
          .filter(Boolean),
        images: [...existingImages, ...uploadedImageUrls],
        video_url: videoUrl,
        is_new_arrival: isNewArrival,
        is_sale: isSale,
      };

      if (isEdit) {
        const { error: updateError } = await supabase
          .from("products")
          .update(payload)
          .eq("id", existingProduct.id);
        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from("products")
          .insert(payload);
        if (insertError) throw insertError;
      }

      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <div>
        <label className="label">Product Name</label>
        <input
          className="field"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Classic Leather Oxford"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label">Category</label>
          <select
            className="field"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="men">Men</option>
            <option value="women">Women</option>
          </select>
        </div>
        <div>
          <label className="label">Price (PKR)</label>
          <input
            className="field"
            type="number"
            required
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label">Sale Price (PKR, optional)</label>
          <input
            className="field"
            type="number"
            min="0"
            value={salePrice}
            onChange={(e) => setSalePrice(e.target.value)}
          />
        </div>
        <div className="flex items-end gap-6 pb-2.5">
          <label className="flex items-center gap-2 text-sm text-charcoal">
            <input
              type="checkbox"
              checked={isSale}
              onChange={(e) => setIsSale(e.target.checked)}
            />
            Mark as Sale
          </label>
          <label className="flex items-center gap-2 text-sm text-charcoal">
            <input
              type="checkbox"
              checked={isNewArrival}
              onChange={(e) => setIsNewArrival(e.target.checked)}
            />
            New Arrival
          </label>
        </div>
      </div>

      <div>
        <label className="label">Description</label>
        <textarea
          className="field"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label">Sizes (comma separated)</label>
          <input
            className="field"
            value={sizes}
            onChange={(e) => setSizes(e.target.value)}
            placeholder="40, 41, 42, 43"
          />
        </div>
        <div>
          <label className="label">Colors (comma separated)</label>
          <input
            className="field"
            value={colors}
            onChange={(e) => setColors(e.target.value)}
            placeholder="Black, Brown, Tan"
          />
        </div>
      </div>

      <div>
        <label className="label">Product Images</label>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={handleImageSelect}
          className="text-sm"
        />
        <div className="flex flex-wrap gap-3 mt-3">
          {existingImages.map((url) => (
            <div key={url} className="relative w-20 h-20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="w-20 h-20 object-cover" />
              <button
                type="button"
                onClick={() => removeExistingImage(url)}
                className="absolute -top-2 -right-2 bg-charcoal text-sand w-5 h-5 text-xs rounded-full"
              >
                ×
              </button>
            </div>
          ))}
          {newImagePreviews.map((url, i) => (
            <div key={url} className="relative w-20 h-20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="w-20 h-20 object-cover" />
              <button
                type="button"
                onClick={() => removeNewImage(i)}
                className="absolute -top-2 -right-2 bg-charcoal text-sand w-5 h-5 text-xs rounded-full"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="label">Product Video (max {MAX_VIDEO_SECONDS} seconds, optional)</label>
        <input type="file" accept="video/mp4" onChange={handleVideoSelect} className="text-sm" />
        {(newVideoPreview || existingVideo) && (
          <video
            src={newVideoPreview || existingVideo}
            controls
            className="w-48 mt-3 bg-black"
          />
        )}
      </div>

      {error && <p className="text-rust text-sm">{error}</p>}

      <button type="submit" disabled={saving} className="btn-primary">
        {saving ? "Saving..." : isEdit ? "Save Changes" : "Add Product"}
      </button>
    </form>
  );
}
