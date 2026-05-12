const statusConfig = {
  pending: {
    label: "Pending Verification",
    cls: "bg-amber-50 text-amber-700 border border-amber-200",
    dot: "bg-amber-400",
  },
  approved: {
    label: "Approved",
    cls: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    dot: "bg-emerald-400",
  },
  active: {
    label: "Active",
    cls: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    dot: "bg-emerald-400",
  },
  rejected: {
    label: "Rejected",
    cls: "bg-red-50 text-red-700 border border-red-200",
    dot: "bg-red-400",
  },
};

export default function StatusBadge({ status }) {
  const cfg = statusConfig[status] ?? statusConfig.pending;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${cfg.cls}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}
