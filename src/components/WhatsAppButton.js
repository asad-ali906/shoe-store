"use client";

import { buildWhatsAppLink } from "@/lib/whatsapp";

function WhatsAppIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.33 4.95L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.16c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.11.11-1.79-.11-.41-.13-.94-.3-1.62-.6-2.85-1.23-4.71-4.1-4.85-4.29-.14-.19-1.16-1.54-1.16-2.94 0-1.4.73-2.09.99-2.37.26-.28.57-.36.76-.36h.55c.18 0 .42-.07.65.5.24.58.81 1.99.88 2.14.07.14.12.31.02.5-.1.19-.15.31-.29.48-.14.17-.3.37-.43.5-.14.14-.29.29-.13.57.17.28.75 1.23 1.6 2 1.1.98 2.03 1.29 2.31 1.43.28.14.44.12.6-.07.17-.19.71-.82.9-1.11.19-.28.38-.23.63-.14.26.09 1.64.77 1.92.91.28.14.47.21.53.33.07.12.07.68-.17 1.36Z" />
    </svg>
  );
}

export default function WhatsAppButton({
  number,
  productName = "an order",
  price,
  size,
  color,
  label = "Order on WhatsApp",
  variant = "solid",
  className = "",
}) {
  const href = buildWhatsAppLink({ number, productName, price, size, color });

  const base =
    variant === "solid"
      ? "btn-whatsapp"
      : "inline-flex items-center gap-2 text-moss text-sm font-medium hover:underline";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${className}`}
    >
      <WhatsAppIcon className="w-4 h-4" />
      {label}
    </a>
  );
}

export function WhatsAppFloatingButton({ number }) {
  const href = buildWhatsAppLink({
    number,
    productName: "your shoes",
    price: "",
  });

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Order on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-moss text-sand shadow-lg hover:bg-[#3c4a35] transition-colors"
    >
      <WhatsAppIcon className="w-7 h-7" />
    </a>
  );
}
