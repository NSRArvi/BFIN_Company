import { useState, useEffect } from "react";
import {
  Package,
  Calendar,
  CreditCard,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Building2,
  Hash,
  Banknote,
  User,
  Phone,
  FileText,
  ArrowUpRight,
  Layers,
  ShieldCheck,
} from "lucide-react";
import { ECOM_BASE_URL } from "../config";
import useAuth from "../hooks/useAuth";

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function StatusBadge({ status }) {
  const map = {
    pending: { icon: Clock, color: "#f59e0b", bg: "#fef3c7", label: "Pending" },
    approved: {
      icon: CheckCircle,
      color: "#10b981",
      bg: "#d1fae5",
      label: "Approved",
    },
    active: {
      icon: CheckCircle,
      color: "#186BB5",
      bg: "#dbeafe",
      label: "Active",
    },
    rejected: {
      icon: XCircle,
      color: "#ef4444",
      bg: "#fee2e2",
      label: "Rejected",
    },
    cancelled: {
      icon: XCircle,
      color: "#6b7280",
      bg: "#f3f4f6",
      label: "Cancelled",
    },
  };
  const cfg = map[status?.toLowerCase()] || {
    icon: AlertCircle,
    color: "#6b7280",
    bg: "#f3f4f6",
    label: status,
  };
  const Icon = cfg.icon;
  return (
    <span
      style={{ background: cfg.bg, color: cfg.color }}
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-montserrat text-xs font-semibold tracking-wide"
    >
      <Icon size={12} strokeWidth={2.5} />
      {cfg.label}
    </span>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 py-2.5">
      <div className="mt-0.5 text-[#186BB5]">
        <Icon size={15} strokeWidth={2} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="mb-0.5 font-montserrat text-xs uppercase tracking-widest text-gray-400">
          {label}
        </p>
        <p className="truncate font-sora text-sm font-medium text-gray-800">
          {value || "—"}
        </p>
      </div>
    </div>
  );
}

function Divider() {
  return <div className="my-1 border-t border-gray-100" />;
}

function ManualPaymentCard({ payment }) {
  return (
    <div className="mt-3 rounded-xl p-4" style={{ background: "#f8fafc" }}>
      <p className="mb-3 font-montserrat text-xs font-bold uppercase tracking-widest text-[#186BB5]">
        Manual Payment Details
      </p>
      <div className="grid grid-cols-2 gap-x-6 gap-y-0.5">
        <InfoRow icon={User} label="Account Holder" value={payment.name} />
        <InfoRow icon={Building2} label="Bank" value={payment.bank_name} />
        <InfoRow icon={Hash} label="Account No." value={payment.account_no} />
        <InfoRow
          icon={Hash}
          label="Transaction ID"
          value={payment.transaction_id}
        />
        <InfoRow icon={Phone} label="Phone" value={payment.phone} />
        <InfoRow
          icon={Banknote}
          label="Amount"
          value={`${payment.currency} ${payment.amount}`}
        />
        <InfoRow
          icon={Calendar}
          label="Payment Date"
          value={formatDate(payment.payment_at)}
        />
        <InfoRow icon={Building2} label="Branch" value={payment.branch} />
      </div>
      {payment.document && (
        <a
          href={`${ECOM_BASE_URL}${payment.document}`}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 font-montserrat text-xs font-semibold text-[#186BB5] transition-opacity hover:opacity-70"
        >
          <FileText size={13} />
          View Payment Document
          <ArrowUpRight size={12} />
        </a>
      )}
    </div>
  );
}

function InvoiceSection({ invoices }) {
  const [open, setOpen] = useState(false);
  if (!invoices?.length) return null;
  const inv = invoices[0];
  return (
    <div className="mt-4">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 font-montserrat text-sm font-semibold text-gray-600 transition-colors hover:text-[#186BB5]"
      >
        <CreditCard size={15} strokeWidth={2} />
        Invoice #{inv.invoice_number}
        <StatusBadge status={inv.status} />
        <span className="ml-auto text-gray-400">
          {open ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </span>
      </button>
      {open && (
        <div className="animate-fade-in mt-3">
          <div className="grid grid-cols-2 gap-x-6 gap-y-0.5">
            <InfoRow
              icon={CreditCard}
              label="Payment Method"
              value={inv.payment_method?.replace("_", " ")}
            />
            <InfoRow
              icon={Banknote}
              label="Amount"
              value={`EUR ${inv.payment_amount}`}
            />
            <InfoRow
              icon={FileText}
              label="Invoice Type"
              value={inv.invoice_type}
            />
          </div>
          {inv.manualPayments?.map((mp) => (
            <ManualPaymentCard key={mp.id} payment={mp} />
          ))}
        </div>
      )}
    </div>
  );
}

function PackageFeatures({ features }) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? features : features.slice(0, 5);
  return (
    <div className="mt-3">
      <p className="mb-2 font-montserrat text-xs font-bold uppercase tracking-widest text-gray-400">
        Included Features
      </p>
      <ul className="space-y-1">
        {visible.map((f, i) => (
          <li
            key={i}
            className="flex items-center gap-2 font-sora text-sm text-gray-600"
          >
            <ShieldCheck
              size={13}
              className="shrink-0 text-[#186BB5]"
              strokeWidth={2}
            />
            {f}
          </li>
        ))}
      </ul>
      {features.length > 5 && (
        <button
          onClick={() => setShowAll((v) => !v)}
          className="mt-2 flex items-center gap-1 font-montserrat text-xs font-semibold text-[#186BB5] transition-opacity hover:opacity-70"
        >
          {showAll ? (
            <>
              Show less <ChevronUp size={12} />
            </>
          ) : (
            <>
              +{features.length - 5} more features <ChevronDown size={12} />
            </>
          )}
        </button>
      )}
    </div>
  );
}

function OrderCard({ order }) {
  const [expanded, setExpanded] = useState(false);
  const pkg = order.package;
  const period = order.subscriptionPeriod;
  const upgrade = order.packageUpgrades?.[0];

  return (
    <div
      className="overflow-hidden rounded-2xl"
      style={{ border: "1.5px solid #e8edf2" }}
    >
      {/* Header Strip */}
      <div
        className="flex items-center justify-between gap-4 px-6 py-4"
        style={{ background: "#186BB5" }}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20">
            <Package size={18} color="white" strokeWidth={2} />
          </div>
          <div>
            <p className="font-montserrat text-base font-bold leading-tight text-white">
              {pkg.package_name}
            </p>
            <p className="mt-0.5 font-sora text-xs text-white/70">
              {pkg.package_type_label} · Order #{order.id}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={order.status} />
          <button
            onClick={() => setExpanded((v) => !v)}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 transition-colors hover:bg-white/25"
          >
            {expanded ? (
              <ChevronUp size={16} color="white" />
            ) : (
              <ChevronDown size={16} color="white" />
            )}
          </button>
        </div>
      </div>

      {/* Summary Row */}
      <div className="grid grid-cols-2 gap-4 bg-white px-6 py-4 md:grid-cols-4">
        <div>
          <p className="mb-1 font-montserrat text-xs uppercase tracking-widest text-gray-400">
            Price
          </p>
          <p className="font-montserrat text-lg font-bold text-gray-900">
            EUR {period.price}
            <span className="ml-1 text-xs font-normal text-gray-400">
              / {period.duration}mo
            </span>
          </p>
        </div>
        <div>
          <p className="mb-1 font-montserrat text-xs uppercase tracking-widest text-gray-400">
            Starts
          </p>
          <p className="font-sora text-sm font-semibold text-gray-700">
            {formatDate(order.start_at)}
          </p>
        </div>
        <div>
          <p className="mb-1 font-montserrat text-xs uppercase tracking-widest text-gray-400">
            Expires
          </p>
          <p className="font-sora text-sm font-semibold text-gray-700">
            {formatDate(order.expire_at)}
          </p>
        </div>
        <div>
          <p className="mb-1 font-montserrat text-xs uppercase tracking-widest text-gray-400">
            Max Stores
          </p>
          <p className="flex items-center gap-1.5 font-sora text-sm font-semibold text-gray-700">
            <Layers size={14} className="text-[#186BB5]" />
            {pkg.max_store} Stores
          </p>
        </div>
      </div>

      {/* Expanded Detail */}
      {expanded && (
        <div className="bg-white px-6 pb-6">
          <Divider />
          <div className="grid gap-6 pt-2 md:grid-cols-2">
            <div>
              <p className="mb-2 font-montserrat text-xs font-bold uppercase tracking-widest text-[#186BB5]">
                Plan Details
              </p>
              <InfoRow
                icon={Package}
                label="Plan Type"
                value={pkg.package_type}
              />
              <InfoRow
                icon={Layers}
                label="Product Limit"
                value={`${pkg.product_limit?.toLocaleString()} Products`}
              />
              <InfoRow
                icon={Banknote}
                label="Storage"
                value={`${pkg.max_storage} GB`}
              />
              {upgrade && (
                <>
                  <InfoRow
                    icon={Calendar}
                    label="Order Type"
                    value={upgrade.package_order_type}
                  />
                  <InfoRow
                    icon={Banknote}
                    label="Discount"
                    value={`EUR ${upgrade.discount_amount}`}
                  />
                </>
              )}
              <PackageFeatures features={pkg.description} />
            </div>
            <div>
              <p className="mb-2 font-montserrat text-xs font-bold uppercase tracking-widest text-[#186BB5]">
                Payment & Invoice
              </p>
              <InvoiceSection invoices={order.packageInvoices} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div
      className="animate-pulse overflow-hidden rounded-2xl"
      style={{ border: "1.5px solid #e8edf2" }}
    >
      <div className="h-16 bg-[#186BB5]/20" />
      <div className="grid grid-cols-4 gap-4 bg-white px-6 py-4">
        {[...Array(4)].map((_, i) => (
          <div key={i}>
            <div className="mb-2 h-3 w-16 rounded bg-gray-200" />
            <div className="h-5 w-24 rounded bg-gray-100" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MyOrders() {
  const { token, user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [meta, setMeta] = useState(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        setLoading(true);
        const res = await fetch(
          `${ECOM_BASE_URL}/api/v1/package-order/user-orders/${user?.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (!res.ok)
          throw new Error(`Request failed with status ${res.status}`);
        const data = await res.json();
        if (data.success) {
          setOrders(data.data);
          setMeta(data.meta);
        } else {
          throw new Error(data.message || "Failed to fetch orders");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, [user?.id]);

  console.log(orders);

  return (
    <div className="min-h-screen font-sora" style={{ background: "#f6f8fb" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Sora:wght@300;400;500;600;700&display=swap');
        .animate-fade-in { animation: fadeIn 0.25s ease; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }
      `}</style>

      <div className="mx-auto max-w-4xl px-4 py-10">
        {/* Page Header */}
        <div className="mb-8">
          <div className="mb-1 flex items-center gap-2">
            <div
              className="h-6 w-1 rounded-full"
              style={{ background: "#186BB5" }}
            />
            <p className="font-montserrat text-xs font-bold uppercase tracking-widest text-[#186BB5]">
              Account
            </p>
          </div>
          <h1 className="font-montserrat text-3xl font-extrabold leading-tight text-gray-900">
            My Orders
          </h1>
          {meta && !loading && (
            <p className="mt-1 font-sora text-sm text-gray-400">
              {meta.total} order{meta.total !== 1 ? "s" : ""} found
            </p>
          )}
        </div>

        {/* Content */}
        {loading && (
          <div className="space-y-4">
            <SkeletonCard />
            <SkeletonCard />
          </div>
        )}

        {error && (
          <div
            className="flex items-start gap-4 rounded-2xl p-6"
            style={{ background: "#fff5f5", border: "1.5px solid #fecaca" }}
          >
            <XCircle
              size={22}
              color="#ef4444"
              strokeWidth={2}
              className="mt-0.5 shrink-0"
            />
            <div>
              <p className="mb-1 font-montserrat font-bold text-red-700">
                Failed to load orders
              </p>
              <p className="font-sora text-sm text-red-500">{error}</p>
            </div>
          </div>
        )}

        {!loading && !error && orders.length === 0 && (
          <div
            className="rounded-2xl p-12 text-center"
            style={{ background: "white", border: "1.5px solid #e8edf2" }}
          >
            <Package
              size={40}
              className="mx-auto mb-4 text-gray-300"
              strokeWidth={1.5}
            />
            <p className="font-montserrat text-lg font-bold text-gray-500">
              No orders yet
            </p>
            <p className="mt-1 font-sora text-sm text-gray-400">
              Your subscription orders will appear here.
            </p>
          </div>
        )}

        {!loading && !error && orders.length > 0 && (
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
