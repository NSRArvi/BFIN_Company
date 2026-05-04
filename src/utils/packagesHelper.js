export const durations = [
  { id: 0, month: 1, label: "Monthly" },
  { id: 1, month: 12, label: "Yearly" },
];

export const transformToBankPayload = ({
  details,
  paymentMethod,
  currencyId,
  bankInfo,
  slipFile,
}) => {
  const { id: package_id, pricing } = details;
  const { subscription_period_id, duration, total_base_price } = pricing;

  const payload = new FormData();

  payload.append("user_id", 2);
  payload.append("package_id", package_id);
  payload.append("subscription_period_id", subscription_period_id);
  payload.append("amount", total_base_price);
  payload.append("currency", currencyId);
  payload.append("payment_method", paymentMethod);
  payload.append("duration", duration);

  if (paymentMethod === "bank") {
    if (bankInfo) payload.append("manual_payment", JSON.stringify(bankInfo));
    if (slipFile) payload.append("document", slipFile);
  }

  return payload;
};
