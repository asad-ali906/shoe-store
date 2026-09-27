export default function Footer({ businessName, address, whatsappNumber }) {
  return (
    <footer id="location" className="bg-charcoal text-sand mt-24">
      <div className="container-page py-14 grid gap-10 md:grid-cols-3">
        <div>
          <h3 className="font-display text-xl mb-3">{businessName || "Qadam Footwear"}</h3>
          <p className="text-sand/70 text-sm leading-relaxed max-w-xs">
            Premium men's and women's shoes, handpicked for comfort and
            style. Order easily on WhatsApp — no account needed.
          </p>
        </div>

        <div>
          <h4 className="font-body text-sm text-sand/50 mb-3">Visit Our Store</h4>
          <p className="text-sand/80 text-sm leading-relaxed max-w-xs">{address}</p>
        </div>

        <div>
          <h4 className="font-body text-sm text-sand/50 mb-3">Order</h4>
          <p className="text-sand/80 text-sm mb-1">WhatsApp: {whatsappNumber}</p>
          <p className="text-sand/50 text-xs mt-4">
            Prices shown in PKR. Contact us on WhatsApp for delivery details.
          </p>
        </div>
      </div>

      <div className="border-t border-sand/10">
        <div className="container-page py-5 text-xs text-sand/40 flex justify-between">
          <span>© {new Date().getFullYear()} {businessName || "Qadam Footwear"}</span>
          <a href="/admin/login" className="hover:text-sand/70">Store Login</a>
        </div>
      </div>
    </footer>
  );
}
