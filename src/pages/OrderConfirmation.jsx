import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  CheckCircle2,
  Clock,
  Receipt,
  Building2,
  Package,
  ShieldCheck,
} from "lucide-react";
import { ECOM_BASE_URL } from "../config";
import useAuth from "../hooks/useAuth";
import Error from "../components/OrderConfirmation/Error";
import Skeleton from "../components/OrderConfirmation/Skeleton";
import StatusBadge from "../components/OrderConfirmation/StatusBadge";
import Card from "../components/OrderConfirmation/Card";
import Row from "../components/OrderConfirmation/Row";
import formatDate from "../utils/formatDate";
import formatDateTime from "../utils/formateDateTime";
import formatCurrency from "../utils/formatCurrency";
import formatMethod from "../utils/formatMethod";

export default function OrderConfirmation() {
  const { orderId, invoiceId } = useParams();
  const { user, token } = useAuth();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!orderId || !invoiceId || !user?.id) {
      setError("Missing order information.");
      setLoading(false);
      return;
    }

    const fetchOrder = async () => {
      try {
        const res = await fetch(
          `${ECOM_BASE_URL}/api/v1/package-order/user-order/${user.id}?order_id=${orderId}&invoice_id=${invoiceId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );
        const json = await res.json();
        if (!json.success) throw new Error(json.message ?? "Fetch failed");
        setOrder(json.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, invoiceId, user?.id, token]);

  if (loading) return <Skeleton />;
  if (error) return <Error message={error} />;
  if (!order) return <Error message="Order not found." />;

  // ── Derived data ──────────────────────────────────────────────────────────

  const pkg = order.package;
  const period = order.subscriptionPeriod;
  const invoice = order.packageInvoices?.[0];
  const upgrade = order.packageUpgrades?.[0];
  const manual = invoice?.manualPayments?.[0];
  const isBank = invoice?.payment_method === "bank_transfer";
  const currency = upgrade?.currency ?? "EUR";
  const totalPaid = invoice?.payment_amount ?? upgrade?.amount;

  const metrics = [
    {
      label: "Subscription",
      value: `${period.duration} ${period.duration === 1 ? "Month" : "Months"}`,
      sub: pkg.package_type,
    },
    {
      label: "Start date",
      value: formatDate(order.start_at),
      sub: "Activation pending",
    },
    {
      label: "Expires",
      value: formatDate(order.expire_at),
      sub: "Subject to renewal",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 pt-28">
      <div className="mx-auto max-w-5xl space-y-3">
        {/* ── Hero bar ──────────────────────────────────────────────── */}
        <div className="flex flex-wrap items-center gap-4 rounded-xl border border-gray-200 bg-white px-6 py-5">
          <div className="bg-emerald-50 flex h-11 w-11 shrink-0 items-center justify-center rounded-full">
            <CheckCircle2
              size={22}
              className="text-emerald-500"
              strokeWidth={2}
            />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-500">
              Order placed successfully
            </p>
            <h1 className="mt-0.5 text-base font-bold text-gray-900">
              {pkg.package_name}
            </h1>
            <div className="mt-1.5 flex flex-wrap items-center gap-2">
              <StatusBadge status={order.status} />
              {invoice?.invoice_number && (
                <span className="flex items-center gap-1 text-[11px] text-gray-500">
                  <Receipt size={10} />
                  Invoice #{invoice.invoice_number}
                </span>
              )}
            </div>
          </div>

          <div className="shrink-0 text-right">
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(totalPaid, currency)}
            </p>
            <p className="mt-0.5 text-[11px] text-gray-500">
              {currency} · {formatMethod(invoice?.payment_method)}
            </p>
          </div>
        </div>

        {/* ── Notice ────────────────────────────────────────────────── */}
        <div className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white px-5 py-3.5">
          <Clock size={13} className="mt-0.5 shrink-0 text-gray-500" />
          <p className="text-[12px] leading-relaxed text-gray-600">
            Your payment is being reviewed by our team. You&apos;ll be notified
            once your subscription is activated —{" "}
            <span className="font-semibold text-gray-700">
              usually within 1–2 business days
            </span>
            .
          </p>
        </div>

        {/* ── 3 metric pills ────────────────────────────────────────── */}
        <div className="grid grid-cols-3 gap-3">
          {metrics.map(({ label, value, sub }) => (
            <div
              key={label}
              className="rounded-xl border border-gray-200 bg-white px-5 py-4"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-gray-500">
                {label}
              </p>
              <p className="mt-1 text-lg font-bold text-gray-900">{value}</p>
              <p className="mt-0.5 text-[11px] text-gray-500">{sub}</p>
            </div>
          ))}
        </div>

        {/* ── 3-col card row ────────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {/* Invoice */}
          <Card icon={Receipt} title="Invoice">
            {invoice?.invoice_number && (
              <Row
                label="Invoice no."
                value={invoice.invoice_number}
                mono
                copyable
              />
            )}
            <Row label="Method" value={formatMethod(invoice?.payment_method)} />
            <Row
              label="Status"
              value={
                <span className="capitalize text-amber-600">
                  {invoice?.status ?? order.status}
                </span>
              }
            />
            <Row
              label="Total paid"
              value={formatCurrency(totalPaid, currency)}
              accent
            />
          </Card>

          {/* Transfer details — bank only; Stripe fallback */}
          {isBank && manual ? (
            <Card icon={Building2} title="Transfer details">
              <Row label="Account holder" value={manual.name} />
              <Row label="Bank" value={manual.bank_name} />
              <Row label="Branch" value={manual.branch} />
              <Row
                label="Account no."
                value={manual.account_no}
                mono
                copyable
              />
              <Row label="Phone" value={manual.phone} />
              {manual.transaction_id && (
                <Row
                  label="Transaction ID"
                  value={manual.transaction_id}
                  mono
                  copyable
                />
              )}
              <Row label="Paid at" value={formatDateTime(manual.payment_at)} />
            </Card>
          ) : (
            <Card icon={Building2} title="Payment details">
              <Row label="Method" value="Stripe" />
              <Row
                label="Status"
                value={
                  <span className="capitalize text-amber-600">
                    {invoice?.status ?? "pending"}
                  </span>
                }
              />
            </Card>
          )}

          {/* Plan details */}
          <Card icon={Package} title="Plan details">
            <Row label="Plan" value={pkg.package_name} />
            <Row label="Type" value={pkg.package_type} />
            <Row label="Max stores" value={pkg.max_store} />
            <Row label="Products" value={pkg.product_limit?.toLocaleString()} />
            <Row label="Storage" value={`${pkg.max_storage} GB`} />
          </Card>
        </div>

        {/* ── What's included ───────────────────────────────────────── */}
        {pkg.description?.length > 0 && (
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <div className="flex items-center gap-2.5 border-b border-gray-100 bg-gray-50 px-4 py-3">
              <CheckCircle2
                size={13}
                className="text-gray-500"
                strokeWidth={2}
              />
              <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-gray-500">
                What&apos;s included
              </span>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {pkg.description.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 border-b border-r border-gray-100 px-4 py-2.5"
                >
                  <CheckCircle2
                    size={13}
                    className="text-emerald-500 mt-0.5 shrink-0"
                    strokeWidth={2.5}
                  />
                  <span className="text-xs text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ── Footer ────────────────────────────────────────────────── */}
        <div className="flex items-center justify-center gap-1.5 pb-4 text-[11px] text-gray-500">
          <ShieldCheck size={12} />
          Secure checkout · Order #{orderId} · Invoice #{invoiceId}
        </div>
      </div>
    </div>
  );
}
