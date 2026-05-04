export default function Heading({ currencies }) {
  return (
    <>
      {/* Section Title */}
      <div className="text-center">
        <span className="inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1 font-sora text-[11px] font-semibold tracking-widest text-primary">
          hPanel Order Management
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

      {/* We Accept — single row */}
      <div className="mt-8 flex items-center justify-center gap-2.5">
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
            <span className="font-semibold text-gray-800">Bfinit</span> is part
            of the{" "}
            <span className="font-semibold text-gray-800">
              Scotty Pumpkin Web3 Ecosystem
            </span>
            {" · "}Pay with{" "}
            <span className="font-semibold text-primary">SPUMP</span> or{" "}
            <span className="font-semibold text-primary">USFF</span> and save up
            to <span className="font-semibold text-primary">30%</span>
          </p>
        </div>
      </div>
    </>
  );
}
