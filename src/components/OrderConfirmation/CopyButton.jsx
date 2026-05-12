import { useState } from "react";
import { CheckCheck, Copy } from "lucide-react";

export default function CopyButton({ value }) {
  const [copied, setCopied] = useState(false);

  const handle = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handle}
      className="ml-1.5 inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[11px] font-semibold text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
    >
      {copied ? (
        <CheckCheck size={11} className="text-emerald-500" />
      ) : (
        <Copy size={11} />
      )}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
