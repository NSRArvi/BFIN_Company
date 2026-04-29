import formatPrice from "./formatPrice";

export function getSpumpSavings(price, discountPercentage) {
  const savings = (Number(price) * discountPercentage) / 100;
  return formatPrice(savings);
}
