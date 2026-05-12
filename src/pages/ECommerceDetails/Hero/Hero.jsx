import { MdOutlineArrowDownward } from "react-icons/md";
import { Link } from "react-router-dom";
import { HiOutlineEye } from "react-icons/hi";
import {
  LuShoppingBag,
  LuBarChart2,
  LuCreditCard,
  LuSearch,
} from "react-icons/lu";
import scottyLogo from "../../../assets/logo/scotty.webp";

const TRUST_ITEMS = [
  {
    icon: <LuShoppingBag className="size-3.5" />,
    label: "Pre-built Templates",
  },
  { icon: <LuCreditCard className="size-3.5" />, label: "Payment Integration" },
  { icon: <LuBarChart2 className="size-3.5" />, label: "Market Insights" },
  { icon: <LuSearch className="size-3.5" />, label: "SEO Control" },
];

export default function Hero({ handleScrollToSection }) {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="mx-auto max-w-7xl py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="flex flex-col-reverse items-center gap-10 md:flex-row md:gap-12">
          {/* ── LEFT — COPY ── */}
          <div className="w-full md:w-1/2">
            {/* Scotty Pumpkin — vertical logo block */}
            <a
              href="https://scottypumpkin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* Logo — large, with layered glow rings */}
              <img src={scottyLogo} alt="Scotty Pumpkin" className="h-24" />

              {/* Label beneath logo */}
              <span className="flex flex-col leading-tight">
                <span className="text-xs font-semibold uppercase tracking-widest">
                  Part of the
                </span>
                <span className="text-sm font-bold text-orange-600">
                  Scotty Pumpkin Web3 Ecosystem
                </span>
              </span>
            </a>

            {/* Headline */}
            <h1
              className="text-balance text-center font-sora text-3xl font-bold leading-tight md:text-left md:text-5xl mt-6"
              style={{
                color: "#0F172A",
                letterSpacing: "-0.025em",
                lineHeight: 1.1,
              }}
            >
              Take your Business
              <br />
              to the Next Level with{" "}
              <span style={{ color: "#1B5FA8" }}>Bfinit Ecommerce</span>
            </h1>

            {/* Description */}
            <p
              className="mb-8 mt-5 text-balance text-center text-base leading-relaxed md:text-left md:text-lg"
              style={{ color: "rgba(15,23,42,0.52)" }}
            >
              Effortlessly grow your business with pre-built templates or fully
              customized designs from market insights to seamless payment
              integration, cost-effective tools and dedicated SEO control.
            </p>

            {/* Feature pills */}
            <div className="mb-8 flex flex-wrap justify-center gap-2 md:justify-start">
              {TRUST_ITEMS.map(({ icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
                  style={{
                    border: "1px solid rgba(15,23,42,0.09)",
                    background: "#ffffff",
                    color: "rgba(15,23,42,0.50)",
                  }}
                >
                  {icon}
                  {label}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex w-full flex-col items-center gap-3 sm:flex-row md:items-start">
              <button
                onClick={handleScrollToSection}
                className="group flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:brightness-105 active:scale-[0.98] sm:w-auto"
                style={{
                  background: "#1B5FA8",
                }}
              >
                Learn More
                <MdOutlineArrowDownward className="text-base transition-transform duration-300 group-hover:translate-y-0.5" />
              </button>

              {/* <Link
                to="https://shop.bfinit.com/preview/6857bc3e4205851792ca088a"
                target="_blank"
                className="hover:bg-slate-100 group flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-200 active:scale-[0.98] sm:w-auto"
                style={{
                  border: "1px solid rgba(15,23,42,0.13)",
                  background: "#ffffff",
                  color: "rgba(15,23,42,0.70)",
                  boxShadow: "0 1px 4px rgba(15,23,42,0.06)",
                }}
              >
                <HiOutlineEye className="text-base" />
                Live Preview
              </Link> */}
            </div>
          </div>

          {/* ── RIGHT — VIDEO ── */}
          <div className="w-full md:w-1/2">
            <div
              className="relative w-full overflow-hidden rounded-2xl"
              style={{
                aspectRatio: "16/9",
                border: "1px solid rgba(15,23,42,0.08)",
              }}
            >
              <iframe
                src="https://www.youtube.com/embed/2SL7_FNubrw?si=cJ6ehWuFNORcqZXP"
                title="e-Bfinit eCommerce Engine"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>

            {/* Video caption */}
            <p
              className="mt-3 text-center text-xs md:text-left"
              style={{ color: "rgba(15,23,42,0.30)" }}
            >
              e-Bfinit eCommerce Engine — see it in action
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
