import heroBg from "../../../assets/server-home/hero-bg.webp";
import { IoIosSpeedometer } from "react-icons/io";

export default function HeroNew() {
  return (
    <div className="px-5 py-12 text-primary md:container md:mx-auto md:py-24">
      <div className="flex flex-col items-end justify-between md:flex-row">
        <h1 className="font-urbanist text-4xl font-bold">
          Excellent Hosting Solutions
        </h1>

        <div className="flex w-full gap-8 md:w-fit md:items-end">
          <div className="flex items-center gap-2">
            <IoIosSpeedometer className="min-w-fit" />
            Ready in 24 hours
          </div>
          <div className="flex items-center gap-2">
            <IoIosSpeedometer className="min-w-fit" />
            24/7 Support
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundImage: `linear-gradient(to right, rgba(47, 104, 177, 0.8), rgba(49, 197, 244, 0)), url(${heroBg})`,
        }}
        className="mt-4 flex min-h-96 w-full flex-col justify-center gap-5 rounded-2xl bg-cover bg-center px-5 py-10 text-white"
      >
        <h2 className="font-urbanist text-4xl font-bold">
          High-Performance Virtual and Dedicated Servers
        </h2>
        <p className="w-full max-w-xl">
          Elevate your website with our dedicated server solutions—enjoy
          unparalleled speed, top-notch security, and 24/7 support to keep yog
          ahead of the competition!
        </p>
        <p>Server, Ready, Set, Go!</p>
      </div>
    </div>
  );
}
