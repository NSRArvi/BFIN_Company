export default function Skeleton() {
  return (
    <div className="min-h-screen animate-pulse bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-5xl space-y-4">
        <div className="h-24 rounded-xl bg-white" />
        <div className="h-10 rounded-xl bg-white" />
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 rounded-xl bg-white" />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-52 rounded-xl bg-white" />
          ))}
        </div>
        <div className="h-40 rounded-xl bg-white" />
      </div>
    </div>
  );
}
