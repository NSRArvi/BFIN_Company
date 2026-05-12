import CopyButton from "./CopyButton";

export default function Row({ label, value, mono, accent, copyable }) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-2.5">
      <span className="shrink-0 text-xs text-gray-500">{label}</span>
      <span
        className={`flex items-center text-right text-xs font-semibold ${
          accent
            ? "text-emerald-600"
            : mono
              ? "font-mono text-gray-800"
              : "text-gray-800"
        }`}
      >
        {value}
        {copyable && <CopyButton value={String(value)} />}
      </span>
    </div>
  );
}
