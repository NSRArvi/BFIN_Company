import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import formatPrice from "../../utils/formatPrice";
import { getSpumpSavings } from "../../utils/getSpumpSavings";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function EcomPricingCard3({ pack, selectedDuration }) {
  const { isAuthenticated } = useAuth();

  const {
    id,
    badge,
    package_type_label,
    package_name,
    short_description,
    pricing,
    description,
    max_store,
    product_limit,
  } = pack;

  const { total_base_price } = pricing || {};

  const [showFullDesc, setShowFullDesc] = useState(false);
  const isYearSelected = selectedDuration === 12;

  const PREVIEW_COUNT = 5;
  const hasMore = description?.length > PREVIEW_COUNT;
  const descArr = showFullDesc
    ? description
    : description?.slice(0, PREVIEW_COUNT);

  const spumpDiscountPercent = isYearSelected ? 30 : 10;

  const spumpSavings = total_base_price
    ? getSpumpSavings(total_base_price, spumpDiscountPercent)
    : "0";

  return (
    <div
      className={`h-fit overflow-hidden rounded-3xl ${badge ? "bg-primary" : ""}`}
    >
      <div
        className={`flex h-7 items-center justify-center text-sm font-semibold text-white ${badge ? "bg-primary" : "bg-transparent"}`}
      >
        {badge && <p>{badge}</p>}
      </div>

      <div
        className={`rounded-3xl border bg-white ${badge ? "border-primary" : "border-softGray"}`}
      >
        <div>
          <div className="p-5">
            {/* Plan label + name */}
            {package_type_label && (
              <p className="mb-1 text-[10.5px] font-bold uppercase tracking-widest text-primary">
                {package_type_label}
              </p>
            )}

            {!package_type_label && badge && (
              <p className="mb-1 text-[10.5px] font-bold uppercase tracking-widest text-primary">
                {badge}
              </p>
            )}

            <h3 className="text-lg font-bold text-dark">{package_name}</h3>

            {short_description && (
              <p className="text-zinc-500 mt-2 text-xs leading-relaxed">
                {short_description}
              </p>
            )}

            <hr className="my-4 border-softGray" />

            {/* Pricing */}
            <div className="flex items-end gap-0.5">
              <span className="mb-1.5 text-base font-semibold text-dark">
                €
              </span>
              <span className="text-[42px] font-extrabold leading-none text-dark">
                {formatPrice(total_base_price)}
              </span>
              <span className="text-zinc-400 mb-1.5 ml-1 text-xs">
                {isYearSelected ? "/yr" : "/mo"}
              </span>
            </div>
            <p className="mt-1 text-[11px] text-gray-600">
              Billed {isYearSelected ? "yearly" : "monthly"} · cancel anytime
            </p>

            <Link
              to={
                isAuthenticated
                  ? `/checkout/packages/${id}/${selectedDuration}`
                  : "/login"
              }
              className={`mt-5 block w-full rounded-xl py-2.5 text-center text-sm font-bold transition-colors duration-150 ${
                badge
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "border-[1.5px] border-primary bg-white text-primary hover:bg-primary/5"
              }`}
            >
              Get Started
            </Link>

            <p className="mt-2 text-[11px] text-gray-600">
              Or pay with{" "}
              <span className="cursor-pointer font-semibold text-primary hover:underline">
                SPUMP
              </span>{" "}
              or{" "}
              <span className="cursor-pointer font-semibold text-primary hover:underline">
                USFF
              </span>{" "}
              and save{" "}
              <span className="font-semibold text-primary">
                €{spumpSavings}
              </span>
            </p>

            <hr className="my-4 border-softGray" />

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[10.5px] text-gray-600">Stores</p>
                <p className="mt-0.5 text-sm font-semibold text-dark">
                  {max_store ?? "Unlimited"}
                </p>
              </div>
              <div>
                <p className="text-[10.5px] text-gray-600">Products</p>
                <p className="mt-0.5 text-sm font-semibold text-dark">
                  {product_limit ?? "Unlimited"}
                </p>
              </div>
            </div>

            <hr className="my-4 border-softGray" />

            {/* Feature list */}
            <p className="mb-2.5 text-[10.5px] font-bold uppercase tracking-widest text-custom-gray">
              What&apos;s included
            </p>
            <ul className="space-y-2">
              {descArr?.map((desc, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <div className="mt-[5px] size-[5px] shrink-0 rounded-full bg-primary" />
                  <span className="text-xs leading-relaxed text-gray-600">
                    {desc}
                  </span>
                </li>
              ))}
            </ul>

            {/* Show more / less toggle */}
            {hasMore && (
              <button
                onClick={() => setShowFullDesc((prev) => !prev)}
                className="mt-3 flex w-full items-center gap-1.5 py-1.5 text-[11px] font-semibold text-gray-600 transition-colors hover:text-primary"
              >
                {showFullDesc ? (
                  <>
                    Show less <ChevronUp size={12} strokeWidth={2} />
                  </>
                ) : (
                  <>
                    View Full Plan <ChevronDown size={12} strokeWidth={2} />
                  </>
                )}
              </button>
            )}

            <p className="mt-2.5 text-center text-[11px] text-gray-600">
              No credit card required
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
