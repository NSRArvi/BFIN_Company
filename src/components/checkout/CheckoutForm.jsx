import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PersonalInfo from "./PersonalInfo";
import OrderDetails from "./OrderDetails";
import StripeCardForm from "./StripeCardForm";
import useAuth from "../../hooks/useAuth";
import { ECOM_BASE_URL, STRIPE_PUBLISHABLE_KEY } from "../../config";

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

export default function CheckoutForm({ details, currencies, bankInfo }) {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [slipFile, setSlipFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currencyId, setCurrencyId] = useState(currencies[0]?.id ?? "eur");

  const [stripeClientSecret, setStripeClientSecret] = useState(null);
  const [pendingOrderData, setPendingOrderData] = useState(null);

  const [formData, setFormData] = useState({
    sender_name: "",
    account_no: "",
    bank_name: "",
    branch: "",
    phone: "",
    transaction_id: "",
    payment_at: "",
    terms: false,
  });

  const buildPayload = useCallback(() => {
    const { pricing } = details;
    const {
      subscription_period_id,
      duration,
      total_base_price,
      offer_percentage,
      discount_amount,
    } = pricing;

    const hasOffer = offer_percentage != null && offer_percentage > 0;
    const offerDiscount = hasOffer
      ? parseFloat(((total_base_price * offer_percentage) / 100).toFixed(2))
      : 0;
    const amount = parseFloat((total_base_price - offerDiscount).toFixed(2));

    const selectedCurrency = currencies.find((c) => c.id === currencyId);
    const currencyCode = selectedCurrency?.code ?? currencyId.toUpperCase();

    const payload = new FormData();
    payload.append("package_id", details.id);
    payload.append("subscription_period_id", subscription_period_id);
    payload.append("amount", amount);
    payload.append("currency", currencyCode);
    payload.append(
      "payment_method",
      paymentMethod === "bank" ? "bank_transfer" : "stripe",
    );
    payload.append("duration", duration);

    if (offerDiscount > 0) {
      payload.append("discount_amount", offerDiscount);
      payload.append("discount_type", "percentage");
    } else if (discount_amount > 0) {
      payload.append("discount_amount", discount_amount);
      payload.append("discount_type", "fixed");
    }

    if (paymentMethod === "bank") {
      const manual = {
        name: formData.sender_name,
        account_no: formData.account_no,
        bank_name: formData.bank_name,
        branch: formData.branch,
        phone: formData.phone,
        ...(formData.transaction_id && {
          transaction_id: formData.transaction_id,
        }),
        payment_at: formData.payment_at
          ? new Date(formData.payment_at).toISOString()
          : undefined,
      };
      payload.append("manual_payment", JSON.stringify(manual));
      if (slipFile) payload.append("document", slipFile);
    }

    return payload;
  }, [details, currencies, currencyId, paymentMethod, formData, slipFile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!details) return;

    const payload = buildPayload();

    try {
      setIsSubmitting(true);
      const res = await fetch(
        `${ECOM_BASE_URL}/api/v1/package-order/create-order`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: payload,
        },
      );

      const data = await res.json();

      if (data?.success) {
        if (paymentMethod === "stripe") {
          const { client_secret } = data.data;
          if (client_secret) {
            setPendingOrderData(data.data);
            setStripeClientSecret(client_secret);
          } else {
            console.error("No client_secret in response");
          }
        } else if (paymentMethod === "bank") {
          const orderId = data.data.packageOrder?.id;
          const invoiceId = data.data.invoice?.id;
          navigate(`/order-confirmation/${orderId}/${invoiceId}`);
        }
      } else {
        console.error("Order failed:", data);
      }
    } catch (err) {
      console.error("Submit error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStripeSuccess = () => {
    const orderId = pendingOrderData?.packageOrder?.id;
    const invoiceId = pendingOrderData?.invoice?.id;
    navigate(`/order-confirmation/${orderId}/${invoiceId}`);
  };

  const handleBack = () => {
    setStripeClientSecret(null);
    setPendingOrderData(null);
  };

  if (stripeClientSecret) {
    return (
      <Elements
        stripe={stripePromise}
        options={{
          clientSecret: stripeClientSecret,
          appearance: { theme: "none" },
        }}
      >
        <div className="grid grid-cols-1 gap-8 py-16 md:grid-cols-2">
          <StripeCardForm
            clientSecret={stripeClientSecret}
            orderData={pendingOrderData}
            onBack={handleBack}
            onSuccess={handleStripeSuccess}
          />

          <OrderDetails
            details={details}
            onPaymentChange={setPaymentMethod}
            paymentMethod={paymentMethod}
            currencies={currencies}
            bankInfo={bankInfo}
            currencyId={currencyId}
            onCurrencyChange={setCurrencyId}
            isSubmitting={false}
            readOnly
          />
        </div>
      </Elements>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-8 py-16 md:grid-cols-2">
        <PersonalInfo
          paymentMethod={paymentMethod}
          formData={formData}
          setFormData={setFormData}
          slipFile={slipFile}
          setSlipFile={setSlipFile}
        />
        <OrderDetails
          details={details}
          onPaymentChange={setPaymentMethod}
          paymentMethod={paymentMethod}
          currencies={currencies}
          bankInfo={bankInfo}
          currencyId={currencyId}
          onCurrencyChange={setCurrencyId}
          isSubmitting={isSubmitting}
        />
      </div>
    </form>
  );
}
