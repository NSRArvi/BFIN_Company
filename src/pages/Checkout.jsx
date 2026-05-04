import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CheckoutForm from "../components/checkout/CheckoutForm";
import Heading from "../components/checkout/Heading";
import Container from "../shared/Container";
import { ECOM_BASE_URL } from "../config";

const currencies = [
  {
    id: "eur",
    label: "Euro",
    symbol: "€",
    icon: (
      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
        €
      </span>
    ),
  },
  {
    id: "spump",
    label: "SPUMP",
    icon: (
      <img
        src="https://scottypumpkin.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhero.ecd1dcc2.png&w=640&q=75"
        className="h-4 w-4 rounded-full"
      />
    ),
  },
  {
    id: "usff",
    label: "USFF",
    icon: (
      <img
        src="https://usfranc.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.bdd0bb3c.webp&w=640&q=100"
        className="h-4 w-4 rounded-full"
      />
    ),
  },
  {
    id: "usdc",
    label: "USDC",
    icon: (
      <img
        src="https://assets.coingecko.com/coins/images/6319/small/usdc.png"
        className="h-4 w-4 rounded-full"
      />
    ),
  },
];

export default function Checkout() {
  const { id, duration } = useParams();
  const [packDetails, setPackDetails] = useState(null);
  const [bankInfo, setBankInfo] = useState(null);

  useEffect(() => {
    const fetchPackageDetails = async (id, duration) => {
      const res = await fetch(
        `${ECOM_BASE_URL}/api/v1/package/get-single/${id}/${duration}`,
      );

      const data = await res.json();

      if (data?.success) {
        setPackDetails(data?.data);
      }
    };

    fetchPackageDetails(id, duration);
  }, [id, duration]);

  useEffect(() => {
    const fetchBankInfo = async () => {
      const res = await fetch(
        `${ECOM_BASE_URL}/api/v1/platform-bank-payment/get-all`,
      );

      const data = await res.json();

      if (data?.success && data?.data?.length > 0) {
        setBankInfo(data?.data[0]);
      }
    };

    fetchBankInfo();
  }, []);

  return (
    <section className="pt-28">
      <Container>
        <Heading currencies={currencies} />
        {packDetails?.id && (
          <CheckoutForm
            details={packDetails}
            currencies={currencies}
            bankInfo={bankInfo}
          />
        )}
      </Container>
    </section>
  );
}
