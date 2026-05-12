export default function Card({ icon: Icon, title, children }) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="flex items-center gap-2.5 border-b border-gray-100 bg-gray-50 px-4 py-3">
        <Icon size={13} className="text-gray-500" strokeWidth={2} />
        <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-gray-500">
          {title}
        </span>
      </div>
      <div className="divide-y divide-gray-100">{children}</div>
    </div>
  );
}
