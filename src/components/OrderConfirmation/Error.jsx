import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";

export default function Error({ message }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <AlertCircle size={28} className="mx-auto mb-3 text-red-400" />
        <p className="text-sm font-semibold text-gray-800">
          {message ?? "Could not load order details."}
        </p>
        <Link
          to="/"
          className="mt-4 inline-block text-xs font-bold text-gray-500 hover:text-gray-800 hover:underline"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}
