import { useState } from "react";
import OrderDetails from "./OrderDetails";
import PersonalInfo from "./PersonalInfo";
import { ECOM_BASE_URL } from "../../config";
import { transformToBankPayload } from "../../utils/packagesHelper";

export default function CheckoutForm({ details, currencies, bankInfo }) {
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [slipFile, setSlipFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currencyId, setCurrencyId] = useState(currencies[0]?.id ?? "eur");
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    address: "",
    country: "",
    city: "",
    postal_code: "",
    phone: "",
    company_name: "",
    terms: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!details) return;

    const payload = transformToBankPayload({
      details,
      paymentMethod,
      currencyId,
      bankInfo,
      slipFile,
    });

    try {
      setIsSubmitting(true);
      const res = await fetch(
        `${ECOM_BASE_URL}/api/v1/package-order/create-order`,
        {
          method: "POST",
          body: payload,
        },
      );

      const data = await res.json();

      if (data?.success) {
        console.log("Order placed:", data);
      } else {
        console.error("Order failed:", data);
      }
    } catch (err) {
      console.error("Submit error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

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
        />
      </div>
    </form>
  );
}
