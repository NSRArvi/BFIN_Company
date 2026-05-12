import { Link } from "react-router-dom";
import {
  LuGlobe,
  LuShoppingCart,
  LuMegaphone,
  LuCoins,
  LuShoppingBag,
  LuLock,
  LuStore,
  LuShield,
  LuUsers,
  LuLink,
  LuArrowRight,
  LuZap,
  LuPackage,
  LuBarChart2,
} from "react-icons/lu";
import Container from "../../../shared/Container";

/* ─────────────────────────────────────────────
   Sub-component: Section header
───────────────────────────────────────────── */
function SectionBadge({ icon: Icon, label }) {
  return (
    <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-gray-200/60 bg-white px-4 py-2 text-sm font-medium shadow-sm">
      <span className="flex items-center justify-center rounded-full bg-dark/85 p-1">
        <Icon className="size-3.5 text-secondary" />
      </span>
      {label}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Feature item row
───────────────────────────────────────────── */
function FeatureRow({ icon: Icon, text, accent = false }) {
  return (
    <li className="flex items-start gap-3">
      <span
        className={`mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full ${
          accent
            ? "bg-primary/10 text-primary"
            : "bg-secondary/30 text-dark/70"
        }`}
      >
        <Icon className="size-4" />
      </span>
      <span className="leading-relaxed text-dark/80">{text}</span>
    </li>
  );
}

/* ─────────────────────────────────────────────
   Pillar card (Eco Market System)
───────────────────────────────────────────── */
function PillarCard({ icon: Icon, title, subtitle, color }) {
  return (
    <div
      className={`group relative flex flex-col gap-4 overflow-hidden rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${color}`}
    >
      <div className="flex size-12 items-center justify-center rounded-xl bg-dark/5 text-dark transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
        <Icon className="size-6" />
      </div>
      <div>
        <h3 className="font-sora text-lg font-bold">{title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-dark/60">{subtitle}</p>
      </div>
      <div className="absolute right-4 top-4 size-16 rounded-full opacity-10 blur-xl" />
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function ScottyPumpkinPage() {
  return (
    <main className="w-full bg-gradient-to-b from-[#e6f9f3] to-[#f5fbff]">

      {/* ── HERO ─────────────────────────────── */}
      <section className="flex min-h-[60vh] w-full flex-col justify-center px-2 py-20 md:py-32">
        <Container>
          <div className="flex flex-col items-center text-center text-dark">
            <SectionBadge icon={LuGlobe} label="Scotty Pumpkin Web3 Ecosystem" />

            <h1 className="mt-6 font-sora text-4xl font-bold leading-tight md:text-6xl">
              Scotty Pumpkin{" "}
              <span className="relative inline-block">
                <span className="relative z-10">Eco Market System</span>
                <span className="absolute inset-x-0 bottom-1 z-0 h-3 rounded bg-secondary opacity-70" />
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-balance leading-relaxed text-dark/70 md:text-xl">
              A unified Web3 commerce infrastructure connecting ecommerce,
              marketplace trading, and social commerce into one integrated
              ecosystem — powered by secure payments, escrow protection, and
              community-backed operations.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
              <Link
                to="/bfinit-ecomerce-platform"
                className="group flex items-center rounded-lg bg-primary px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-secondary hover:text-dark"
              >
                Get Started
                <LuArrowRight className="ml-2 size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/scotty-pumpkin-marketplace"
                className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition-all duration-200 hover:border-primary hover:bg-primary/5 hover:text-primary"
              >
                Visit Marketplace
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ── THREE PILLARS ────────────────────── */}
      <section className="px-2 py-16">
        <Container>
          <div className="mb-10 text-center">
            <SectionBadge icon={LuLink} label="Connected Infrastructure" />
            <h2 className="mt-4 font-sora text-3xl font-bold md:text-4xl">
              A unified ecosystem connecting
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <PillarCard
              icon={LuShoppingCart}
              title="e-Bfinit"
              subtitle="Ecommerce Builder — Create, manage, and grow your professional online store."
              color="border-primary/20"
            />
            <PillarCard
              icon={LuStore}
              title="Scotty Pumpkin Marketplace"
              subtitle="Web3 Marketplace — Buy, sell, and trade within the decentralised Scotty Pumpkin market."
              color="border-secondary/40"
            />
            <PillarCard
              icon={LuUsers}
              title="Sosay"
              subtitle="Social Commerce Platform — Merge community, content, and commerce in one place."
              color="border-gray-200"
            />
          </div>

          <p className="mx-auto mt-8 max-w-2xl text-center text-dark/60 leading-relaxed">
            All integrated through secure payments, escrow mechanisms, and
            community-driven infrastructure.
          </p>
        </Container>
      </section>

      {/* ── BFINIT — POWERED BY WEB3 ─────────── */}
      <section className="px-2 py-16">
        <Container>
          <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
            <div className="grid gap-0 lg:grid-cols-2">

              {/* Left — Core features */}
              <div className="border-b border-gray-100 p-8 lg:border-b-0 lg:border-r">
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-secondary/30 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-dark/60">
                  <LuGlobe className="size-3.5" />
                  Powered by Scotty Pumpkin Web3
                </div>
                <h2 className="mt-4 font-sora text-2xl font-bold md:text-3xl">
                  With Bfinit, you can:
                </h2>

                <ul className="mt-6 space-y-4">
                  <FeatureRow icon={LuShoppingCart} text="Build and manage your ecommerce website" />
                  <FeatureRow icon={LuPackage} text="Sell products and services online" />
                  <FeatureRow icon={LuMegaphone} text="Market your business globally" />
                </ul>
              </div>

              {/* Right — Web3 optional features */}
              <div className="p-8">
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
                  <LuZap className="size-3.5" />
                  Optional Web3 Integration
                </div>
                <h2 className="mt-4 font-sora text-2xl font-bold md:text-3xl">
                  Unlock Web3 features:
                </h2>

                <ul className="mt-6 space-y-4">
                  <FeatureRow icon={LuCoins} text="Accept SPUMP payments in your Bfinit shop" accent />
                  <FeatureRow icon={LuShoppingBag} text="Enable Web3 checkout" accent />
                  <FeatureRow icon={LuLock} text="Access secure escrow payment options" accent />
                  <FeatureRow icon={LuStore} text="Connect your store to the Scotty Pumpkin Marketplace" accent />
                  <FeatureRow icon={LuShield} text="Operate within a secure and integrated Web3 ecosystem" accent />
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── SHORT SUMMARY BLOCK ───────────────── */}
      <section className="px-2 py-12">
        <Container>
          <div className="relative overflow-hidden rounded-2xl bg-dark px-8 py-10 text-white md:px-12">
            {/* Decorative blobs */}
            <div className="pointer-events-none absolute -right-10 -top-10 size-48 rounded-full bg-secondary opacity-10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-10 -left-10 size-48 rounded-full bg-primary opacity-10 blur-3xl" />

            <div className="relative flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-xs font-medium tracking-widest text-white/60 uppercase">
                  <LuGlobe className="size-3.5" />
                  Scotty Pumpkin Web3
                </span>
                <h3 className="font-sora text-2xl font-bold md:text-3xl">
                  Powered by Scotty Pumpkin Web3
                </h3>
                <p className="mt-3 leading-relaxed text-white/70">
                  Bfinit allows you to build and manage your online business
                  while optionally integrating Scotty Pumpkin Web3 payments,
                  escrow protection, and marketplace connectivity.
                </p>
              </div>
              <Link
                to="/bfinit-ecomerce-platform"
                className="group flex shrink-0 items-center rounded-lg bg-secondary px-6 py-3 font-medium text-dark transition-all duration-300 hover:bg-white"
              >
                Start Building
                <LuArrowRight className="ml-2 size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ── ECO MARKET SYSTEM — FULL DESCRIPTION ── */}
      <section className="px-2 py-16">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <SectionBadge icon={LuBarChart2} label="Scotty Pumpkin Eco Market System" />
            <h2 className="mt-6 font-sora text-3xl font-bold md:text-4xl">
              One ecosystem. Three platforms. Infinite possibilities.
            </h2>
            <p className="mt-5 leading-relaxed text-dark/70 md:text-lg">
              The Scotty Pumpkin Eco Market System is a unified Web3 commerce
              infrastructure connecting{" "}
              <strong className="text-dark">E-Bfinit</strong> (Ecommerce Builder),{" "}
              <strong className="text-dark">Scotty Pumpkin Marketplace</strong>{" "}
              (Web3 Marketplace), and{" "}
              <strong className="text-dark">Sosay</strong> (Social Commerce
              Platform) — all integrated through secure payments, escrow
              mechanisms, and community-driven infrastructure.
            </p>
          </div>

          {/* Integration indicators */}
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {[
              { icon: LuLock, title: "Secure Payments", desc: "End-to-end payment security across all platforms" },
              { icon: LuShield, title: "Escrow Protection", desc: "Trustless escrow mechanisms for every transaction" },
              { icon: LuUsers, title: "Community-Driven", desc: "Infrastructure backed and governed by the community" },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-secondary/30">
                  <Icon className="size-5 text-dark" />
                </div>
                <h4 className="font-sora font-semibold">{title}</h4>
                <p className="mt-1 text-sm text-dark/60 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

    </main>
  );
}