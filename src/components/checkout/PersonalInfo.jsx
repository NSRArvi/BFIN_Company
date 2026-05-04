import { useState } from "react";
import { Link } from "react-router-dom";
import { UploadCloud, X, ImageIcon } from "lucide-react";

export default function PersonalInfo({
  paymentMethod,
  formData,
  setFormData,
  slipFile,
  setSlipFile,
}) {
  const [slipPreview, setSlipPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSlipChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSlipFile(file);
    setSlipPreview(URL.createObjectURL(file));
  };

  const removeSlip = () => {
    setSlipFile(null);
    setSlipPreview(null);
  };

  const inputClass =
    "w-full rounded-xl border border-[#D6E4F0] bg-white px-3.5 py-2.5 text-sm text-[#0F1F2E] outline-none transition-all placeholder:text-[#8FADC8] focus:border-[#186BB5] focus:ring-2 focus:ring-[#186BB5]/10";

  const labelClass = "text-xs font-bold text-[#0F1F2E] tracking-wide";

  return (
    <div className="space-y-4">
      {/* Title */}
      <div>
        <h3 className="text-xl font-bold text-[#0F1F2E]">
          Personal Information
        </h3>
        <hr className="mt-3 border-[#D6E4F0]" />
      </div>

      {/* Already have account */}
      <div className="flex items-center justify-between gap-4 rounded-xl border border-[#D6E4F0] bg-[#EBF2FA] px-4 py-3.5">
        <div className="space-y-0.5">
          <h5 className="text-sm font-bold text-[#0F1F2E]">
            Already have an account?
          </h5>
          <p className="text-xs text-[#4A6580]">
            Sign in to access your account
          </p>
        </div>
        <Link
          to="/login"
          className="whitespace-nowrap rounded-xl bg-[#186BB5] px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-[#145fa0]"
        >
          Login
        </Link>
      </div>

      {/* Info banner */}
      <div className="rounded-xl bg-[#186BB5] px-4 py-3">
        <p className="text-xs leading-relaxed text-white">
          Please input your contact email and password details. You will also
          choose further how you want to pay.
        </p>
      </div>

      {/* Fields — no <form> here, it's lifted to CheckoutForm */}
      <div className="space-y-4">
        {/* Full Name + Email */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className={labelClass}>
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              placeholder="John Doe"
              required
              className={inputClass}
            />
          </div>
          <div className="space-y-1.5">
            <label className={labelClass}>
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="johndoe@email.com"
              required
              className={inputClass}
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label className={labelClass}>
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create Password"
            required
            className={inputClass}
          />
        </div>

        {/* Address + Country */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className={labelClass}>
              Address{" "}
              <span className="text-[10px] font-normal text-[#8FADC8]">
                (optional)
              </span>
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Business address"
              className={inputClass}
            />
          </div>
          <div className="space-y-1.5">
            <label className={labelClass}>
              Country <span className="text-red-500">*</span>
            </label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className={inputClass}
            >
              <option value="">Select Country</option>
              <option value="US">United States</option>
              <option value="GB">United Kingdom</option>
              <option value="BD">Bangladesh</option>
              <option value="IN">India</option>
              <option value="CA">Canada</option>
              <option value="AU">Australia</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
            </select>
          </div>
        </div>

        {/* City + Postal */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className={labelClass}>
              City{" "}
              <span className="text-[10px] font-normal text-[#8FADC8]">
                (optional)
              </span>
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              className={inputClass}
            />
          </div>
          <div className="space-y-1.5">
            <label className={labelClass}>
              Postal / ZIP Code{" "}
              <span className="text-[10px] font-normal text-[#8FADC8]">
                (optional)
              </span>
            </label>
            <input
              type="text"
              name="postal_code"
              value={formData.postal_code}
              onChange={handleChange}
              placeholder="00000"
              className={inputClass}
            />
          </div>
        </div>

        {/* Phone + Company */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className={labelClass}>
              Phone{" "}
              <span className="text-[10px] font-normal text-[#8FADC8]">
                (optional)
              </span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 000 000 0000"
              className={inputClass}
            />
          </div>
          <div className="space-y-1.5">
            <label className={labelClass}>
              Company / Store Name{" "}
              <span className="text-[10px] font-normal text-[#8FADC8]">
                (optional)
              </span>
            </label>
            <input
              type="text"
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              placeholder="My Ecommerce Store"
              className={inputClass}
            />
          </div>
        </div>

        {/* Bank Slip Upload */}
        {paymentMethod === "bank" && (
          <div className="space-y-1.5">
            <label className={labelClass}>
              Payment Slip <span className="text-red-500">*</span>
            </label>
            <p className="-mt-0.5 text-[11px] text-[#8FADC8]">
              Upload your bank transfer receipt or payment confirmation
              screenshot.
            </p>
            {!slipPreview ? (
              <label className="group flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#D6E4F0] bg-[#F4F7FB] px-4 py-8 transition-all hover:border-[#186BB5]/50 hover:bg-[#EBF2FA]">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EBF2FA] transition-colors group-hover:bg-[#186BB5]/10">
                  <UploadCloud size={22} className="text-[#186BB5]" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-[#0F1F2E]">
                    Click to upload slip
                  </p>
                  <p className="mt-0.5 text-[11px] text-[#8FADC8]">
                    JPG, PNG, PDF up to 5MB
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={handleSlipChange}
                  required={paymentMethod === "bank"}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="relative overflow-hidden rounded-xl border border-[#D6E4F0] bg-[#F4F7FB]">
                <img
                  src={slipPreview}
                  alt="Payment slip"
                  className="max-h-52 w-full object-contain p-2"
                />
                <div className="flex items-center justify-between border-t border-[#D6E4F0] bg-white px-3 py-2">
                  <div className="flex items-center gap-2">
                    <ImageIcon size={14} className="text-[#186BB5]" />
                    <span className="max-w-[180px] truncate text-xs font-semibold text-[#0F1F2E]">
                      {slipFile?.name}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={removeSlip}
                    className="flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-semibold text-red-500 transition-colors hover:bg-red-50"
                  >
                    <X size={12} /> Remove
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Terms */}
        <div className="flex items-start gap-2 pt-1">
          <input
            type="checkbox"
            id="terms"
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
            required
            className="mt-0.5 accent-[#186BB5]"
          />
          <label
            htmlFor="terms"
            className="text-xs leading-relaxed text-[#4A6580]"
          >
            I have read the{" "}
            <Link
              to="/terms"
              className="font-bold text-[#186BB5] underline-offset-2 hover:underline"
            >
              terms and conditions
            </Link>
          </label>
        </div>
      </div>
    </div>
  );
}
