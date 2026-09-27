// Builds a wa.me link with a pre-filled order message.
export function buildWhatsAppLink({ number, productName, price, size, color }) {
  const cleanNumber = (number || "").replace(/[^0-9]/g, "");

  let message = `Assalam o Alaikum, I want to order:\nProduct: ${productName}\nPrice: PKR ${price}`;
  if (size) message += `\nSize: ${size}`;
  if (color) message += `\nColor: ${color}`;

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${cleanNumber}?text=${encoded}`;
}
