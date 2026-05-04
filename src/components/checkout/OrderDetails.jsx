import { useState } from "react";
import {
  Clock,
  Check,
  Building2,
  Sparkles,
  Copy,
  CheckCheck,
} from "lucide-react";
import stripeIcon from "../../assets/icons/stripe.png";

const PAYMENT_METHODS = [
  {
    id: "bank",
    label: "Bank Transfer",
    icon: () => <Building2 size={18} className="text-current" />,
  },
  {
    id: "stripe",
    label: "Stripe",
    icon: () => <img src={stripeIcon} alt="stripe icon" className="w-3.5" />,
  },
];

const DISCOUNT_CURRENCY_IDS = [""];

function CopyField({ label, value }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#8FADC8]">
          {label}
        </p>
        <p className="truncate text-xs font-semibold text-[#0F1F2E]">{value}</p>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        className="shrink-0 rounded-lg p-1.5 text-[#8FADC8] transition-colors hover:bg-[#F4F7FB] hover:text-[#186BB5]"
        title="Copy"
      >
        {copied ? (
          <CheckCheck size={13} className="text-green-500" />
        ) : (
          <Copy size={13} />
        )}
      </button>
    </div>
  );
}

export default function OrderDetails({
  details,
  onPaymentChange,
  paymentMethod,
  currencies = [],
  bankInfo,
}) {
  const [currencyId, setCurrencyId] = useState(currencies[0]?.id ?? "eur");
  const [localPayment, setLocalPayment] = useState("stripe");

  const activePayment = paymentMethod ?? localPayment;
  const hasWeb3Discount = DISCOUNT_CURRENCY_IDS.includes(currencyId);
  const selectedCurrency =
    currencies.find((c) => c.id === currencyId) ?? currencies[0];

  const { package_type_label, package_name, pricing } = details;
  const {
    duration,
    base_price, // monthly price
    total_base_price, // actual total for this period (base_price × duration)
    offer_percentage, // discount % — null means no discount
  } = pricing;

  // If there's an offer, compute discount off total_base_price
  const hasOffer = offer_percentage != null && offer_percentage > 0;
  const discountAmount = hasOffer
    ? ((total_base_price * offer_percentage) / 100).toFixed(2)
    : null;
  const finalTotal = hasOffer
    ? (total_base_price - parseFloat(discountAmount)).toFixed(2)
    : total_base_price.toFixed(2);

  const handlePayment = (id) => {
    setLocalPayment(id);
    onPaymentChange?.(id);
  };

  return (
    <div className="sticky top-20 h-fit overflow-hidden rounded-xl border border-[#D6E4F0] bg-white">
      {/* Header */}
      <div className="relative overflow-hidden bg-[#186BB5] px-5 pb-6 pt-5">
        <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/5" />
        <div className="absolute -bottom-8 -right-2 h-20 w-20 rounded-full bg-white/5" />
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.15em] text-[#93c5e8]">
          Order Details
        </p>
        <div className="relative flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold leading-tight text-white">
              {package_name}
            </h2>
            <div className="mt-1.5 flex items-center gap-1.5">
              <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] font-semibold text-white">
                <Clock size={10} />
                {duration} {duration === 1 ? "Month" : "Months"}
              </span>
              {hasOffer && (
                <span className="bg-emerald-400/20 text-emerald-300 inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold">
                  <Sparkles size={9} /> −{offer_percentage}% off
                </span>
              )}
            </div>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-2xl font-bold text-white">€{finalTotal}</p>
            {hasOffer && (
              <p className="mt-0.5 text-[11px] text-[#93c5e8] line-through">
                €{total_base_price.toFixed(2)}
              </p>
            )}
            {!hasOffer && (
              <p className="mt-0.5 text-[11px] text-[#93c5e8]">
                €{base_price.toFixed(2)}/mo
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-5 px-5 py-5">
        {/* Currency */}
        <div className="space-y-2.5">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#8FADC8]">
            Currency
          </p>
          <div className="flex flex-wrap gap-2">
            {currencies.map((c) => {
              const active = currencyId === c.id;
              const isDiscount = DISCOUNT_CURRENCY_IDS.includes(c.id);
              return (
                <label
                  key={c.id}
                  className={`group relative flex cursor-pointer items-center gap-2 rounded-full border px-3.5 py-2 transition-all duration-150 ${
                    active
                      ? "border-[#186BB5] bg-[#186BB5] shadow-md shadow-[#186BB5]/20"
                      : "border-[#D6E4F0] bg-white hover:border-[#186BB5]/40 hover:bg-[#F4F7FB]"
                  }`}
                >
                  <input
                    type="radio"
                    name="currency"
                    value={c.id}
                    checked={active}
                    onChange={() => setCurrencyId(c.id)}
                    className="sr-only"
                  />
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                    {c.icon}
                  </span>
                  <span
                    className={`text-xs font-bold leading-none ${active ? "text-white" : "text-[#4A6580]"}`}
                  >
                    {c.label}
                  </span>
                  {isDiscount && (
                    <span
                      className={`rounded-full px-1.5 py-0.5 text-[8px] font-bold leading-none ${active ? "bg-white/25 text-white" : "bg-green-50 text-green-600"}`}
                    >
                      −30%
                    </span>
                  )}
                </label>
              );
            })}
          </div>
          {hasWeb3Discount && (
            <div className="flex items-start gap-2.5 rounded-xl border border-green-200 bg-green-50 px-3.5 py-3">
              <Sparkles size={14} className="mt-0.5 shrink-0 text-green-500" />
              <p className="text-[11px] leading-relaxed text-green-700">
                <span className="font-bold">30% discount applied!</span>{" "}
                You&apos;re saving by paying with{" "}
                <span className="font-bold">{selectedCurrency?.label}</span> —
                part of the Scotty Pumpkin Web3 Ecosystem.
              </p>
            </div>
          )}
        </div>

        {/* Payment Method */}
        <div className="space-y-2.5">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#8FADC8]">
            Payment Method
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            {PAYMENT_METHODS.map(({ id, label, icon: Icon }) => {
              const active = activePayment === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => handlePayment(id)}
                  className={`relative flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-150 ${
                    active
                      ? "border-[#186BB5] bg-[#EBF2FA] shadow-sm"
                      : "border-[#D6E4F0] bg-white hover:border-[#186BB5]/50 hover:bg-[#F4F7FB]"
                  }`}
                >
                  <span
                    className={active ? "text-[#186BB5]" : "text-[#8FADC8]"}
                  >
                    <Icon />
                  </span>
                  <span
                    className={`text-xs font-bold leading-tight ${active ? "text-[#186BB5]" : "text-[#4A6580]"}`}
                  >
                    {label}
                  </span>
                  {active && (
                    <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#186BB5]">
                      <Check size={9} className="text-white" strokeWidth={3} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bank Info */}
        {activePayment === "bank" && bankInfo && (
          <div className="overflow-hidden rounded-xl border border-[#D6E4F0]">
            <div className="border-b border-[#D6E4F0] bg-[#186BB5]/5 px-4 py-2.5">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#186BB5]">
                Bank Transfer Details
              </p>
              <p className="mt-0.5 text-[11px] text-[#4A6580]">
                Transfer the exact total below, then upload your slip.
              </p>
            </div>
            <div className="divide-y divide-[#D6E4F0] px-4 py-1">
              <div className="py-2.5">
                <CopyField label="Bank Name" value={bankInfo.bank_name} />
              </div>
              <div className="py-2.5">
                <CopyField label="Account Name" value={bankInfo.account_name} />
              </div>
              <div className="py-2.5">
                <CopyField
                  label="Account Number"
                  value={bankInfo.account_number}
                />
              </div>
              {bankInfo.routing_number && (
                <div className="py-2.5">
                  <CopyField
                    label="Routing Number"
                    value={bankInfo.routing_number}
                  />
                </div>
              )}
              {bankInfo.swift_code && (
                <div className="py-2.5">
                  <CopyField label="SWIFT / BIC" value={bankInfo.swift_code} />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Summary */}
        <div className="space-y-2.5">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#8FADC8]">
            Summary
          </p>
          <div className="divide-y divide-[#D6E4F0] rounded-xl border border-[#D6E4F0] bg-[#F4F7FB]">
            {/* Monthly rate row */}
            <div className="flex items-center justify-between px-4 py-2.5">
              <span className="text-xs text-[#4A6580]">
                {package_type_label} · {duration}{" "}
                {duration === 1 ? "mo" : "mos"}
              </span>
              <span className="text-xs font-semibold text-[#0F1F2E]">
                €{base_price.toFixed(2)}/mo
              </span>
            </div>

            {/* Subtotal before discount */}
            {duration > 1 && (
              <div className="flex items-center justify-between px-4 py-2.5">
                <span className="text-xs text-[#4A6580]">
                  Subtotal ({duration} months)
                </span>
                <span className="text-xs font-semibold text-[#0F1F2E]">
                  €{total_base_price.toFixed(2)}
                </span>
              </div>
            )}

            {/* Discount row — only if offer_percentage is set */}
            {hasOffer && (
              <div className="flex items-center justify-between px-4 py-2.5">
                <span className="text-xs text-green-600">
                  Discount ({offer_percentage}% off)
                </span>
                <span className="text-xs font-semibold text-green-600">
                  −€{discountAmount}
                </span>
              </div>
            )}

            {/* Total */}
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-sm font-bold text-[#0F1F2E]">Total</span>
              <span className="text-lg font-bold text-[#186BB5]">
                €{finalTotal}
              </span>
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full rounded-xl bg-[#186BB5] py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#145fa0] active:scale-[0.99]"
        >
          Place Order
        </button>
      </div>

      {/* Footer */}
      <div className="border-t border-[#D6E4F0] bg-[#EBF2FA] px-5 py-3">
        <p className="text-center text-[11px] text-[#8FADC8]">
          🔒 Secure checkout · Cancel anytime
        </p>
      </div>
    </div>
  );
}
