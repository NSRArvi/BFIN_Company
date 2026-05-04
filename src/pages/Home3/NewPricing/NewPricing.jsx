import { useEffect, useState } from "react";
import Container from "../../../shared/Container";
import { ECOM_BASE_URL } from "../../../config";
import EcomPricingCard3 from "../../../components/Cards/EcomPricingCard3";
import { durations } from "../../../utils/packagesHelper";

const currencies = [
  {
    id: "eur",
    label: "Euro",
    symbol: "€",
    icon: (
      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
        €
      </span>
    ),
  },
  {
    id: "spump",
    label: "SPUMP",
    icon: (
      <img
        src="https://scottypumpkin.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhero.ecd1dcc2.png&w=640&q=75"
        className="h-4 w-4 rounded-full"
      />
    ),
  },
  {
    id: "usff",
    label: "USFF",
    icon: (
      <img
        src="https://usfranc.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.bdd0bb3c.webp&w=640&q=100"
        className="h-4 w-4 rounded-full"
      />
    ),
  },
  {
    id: "usdc",
    label: "USDC",
    icon: (
      <img
        src="https://assets.coingecko.com/coins/images/6319/small/usdc.png"
        className="h-4 w-4 rounded-full"
      />
    ),
  },
];

export default function NewPricing({ pricingSection }) {
  const [selectedDuration, setSelectedDuration] = useState(1);
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackagesByDuration = async (duration) => {
      try {
        const res = await fetch(
          `${ECOM_BASE_URL}/api/v1/package/get-all/${duration}`,
        );
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setPackages(data.data);
      } catch (error) {
        console.error("Error fetching ecommerce packages data:", error);
      }
    };
    fetchPackagesByDuration(selectedDuration);
  }, [selectedDuration]);

  return (
    <section ref={pricingSection} className="py-10 md:py-20">
      <Container>
        {/* Section Title */}
        <div className="text-center">
          <span className="inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1 font-sora text-[11px] font-semibold uppercase tracking-widest text-primary">
            Scotty pumpkin online shop creator
          </span>
          <h2 className="mt-4 font-sora text-3xl font-bold leading-tight text-dark md:text-4xl">
            Plans that grow with your business
            <br className="hidden md:block" />
            from <span className="text-primary">small</span> to{" "}
            <span className="text-primary">medium</span> to{" "}
            <span className="text-primary">enterprise</span>
          </h2>
          <p className="mt-3 font-sora text-sm text-gray-400">
            No hidden fees. Cancel anytime. Upgrade as you grow.
          </p>
        </div>

        {/* Duration + We Accept — single row */}
        <div className="mt-8 flex flex-col items-center gap-3">
          {/* Duration Switcher */}
          <div className="flex rounded-xl border border-gray-200 bg-gray-50 p-1">
            {durations.map((duration) => (
              <button
                key={duration.id}
                onClick={() => setSelectedDuration(duration.month)}
                className={`rounded-lg px-8 py-2 font-sora text-sm font-semibold transition-all duration-200 ${
                  selectedDuration === duration.month
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                {duration.label}
              </button>
            ))}
          </div>

          {/* We Accept */}
          <div className="flex items-center gap-2.5">
            <span className="font-sora text-[10px] font-bold uppercase tracking-widest text-gray-400">
              We accept
            </span>
            <div className="flex items-center gap-1.5">
              {currencies.map((currency) => (
                <div
                  key={currency.id}
                  title={currency.label}
                  className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5"
                >
                  {currency.icon}
                  <span className="font-sora text-xs font-semibold text-gray-600">
                    {currency.label}
                  </span>
                  {(currency.id === "spump" || currency.id === "usff") && (
                    <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[9px] font-bold text-primary">
                      −30%
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-200" />

        {/* Web3 Ecosystem note */}
        <div className="flex items-center justify-center gap-3">
          <img
            src="https://scottypumpkin.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhero.ecd1dcc2.png&w=640&q=75"
            className="h-8 w-8 shrink-0 rounded-full border border-gray-200"
            alt="SPUMP"
          />
          <div>
            <p className="font-sora text-[11px] font-bold uppercase tracking-widest text-primary">
              Web3 Ecosystem Partner
            </p>
            <p className="mt-0.5 text-xs leading-relaxed text-gray-500">
              <span className="font-semibold text-gray-800">Bfinit</span> is
              part of the{" "}
              <span className="font-semibold text-gray-800">
                Scotty Pumpkin Web3 Ecosystem
              </span>
              {" · "}Pay with{" "}
              <span className="font-semibold text-primary">SPUMP</span> or{" "}
              <span className="font-semibold text-primary">USFF</span> and save
              up to <span className="font-semibold text-primary">30%</span>
            </p>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="mt-24 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
          {packages?.length > 0 &&
            packages
              .slice(0, 4)
              .map((pack) => (
                <EcomPricingCard3
                  key={pack.id}
                  pack={pack}
                  selectedDuration={selectedDuration}
                />
              ))}
        </div>
      </Container>
    </section>
  );
}
