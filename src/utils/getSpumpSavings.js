import formatPrice from "./formatPrice";

export function getSpumpSavings(price, discountPercentage) {
  const num = Number(price);

  if (!price || isNaN(num)) return "0";
  const savings = (num * discountPercentage) / 100;

  return formatPrice(savings);
}
