import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Qadam Footwear — Premium Men's & Women's Shoes in Pakistan",
  description:
    "Shop premium men's and women's shoes in Sheikhupura, Punjab. Order easily on WhatsApp with fast delivery across Pakistan.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${manrope.variable} font-body`}>
        {children}
      </body>
    </html>
  );
}
