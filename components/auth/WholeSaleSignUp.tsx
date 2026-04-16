"use client";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { SignInData, wholeSalesignUpAction } from "@/store/actions/auth";
import { mapServerErrors } from "@/helpers/commonFunction";
import { useRouter } from "next/navigation";
import TermCondation from "../globals/Fields/Term-Condtion";

import UploadSingleFile from "../globals/Fields/UploadSingleFile";
// ✅ ADD THESE IMPORTS
import Select from "react-select";
import { Country, State } from "country-state-city";
type PopupState = {
  open: boolean;
  title: string;
  messages: string[];
};

const WholeSaleSignUp: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [values, setValues] = useState<any>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedCountryId, setSelectedCountryId] = useState<number | null>(null);
  const [countrySearch, setCountrySearch] = useState("");
  const [stateSearch, setStateSearch] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [popup, setPopup] = useState<PopupState>({
    open: false,
    title: "",
    messages: [],
  });

  const showPopup = (title: string, messages: string[]) => {
    setPopup({
      open: true,
      title,
      messages: messages.length ? messages : ["Something went wrong."],
    });
  };

  const closePopup = () => {
    setPopup({
      open: false,
      title: "",
      messages: [],
    });
  };
  const countryOptions = Country.getAllCountries().map((c) => ({
  value: c.isoCode,
  label: c.name,
}));

const stateOptions = values?.country?.isoCode
  ? State.getStatesOfCountry(values.country.isoCode).map((s) => ({
      value: s.isoCode,
      label: s.name,
    }))
  : [];
  useEffect(() => {
    const fetchDeviceDetails = async () => {
      try {
        const res = await fetch("https://api64.ipify.org?format=json");
        const data = await res.json();
        const ip = data.ip;

        const userAgent = navigator.userAgent;
        const platform = navigator.platform;
        let deviceType = "Unknown";

        if (/Android/i.test(userAgent)) deviceType = "Android";
        else if (/iPhone|iPad|iPod/i.test(userAgent)) deviceType = "iOS";
        else if (/Win/i.test(platform)) deviceType = "Windows";
        else if (/Mac/i.test(platform)) deviceType = "MacOS";
        else if (/Linux/i.test(platform)) deviceType = "Linux";

        setValues((prev: any) => ({
          ...prev,
          device_detail: { ip, deviceType },
        }));
      } catch (error) {
        console.error("Error fetching IP:", error);
      }
    };

    fetchDeviceDetails();
  }, []);

  const handleChange = (name: string, value: any) => {
    setValues((prev: any) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    const validationErrors = validateForm(values);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showPopup("Please fix these errors", Object.values(validationErrors));
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await dispatch(
        wholeSalesignUpAction(values as SignInData)
      ).unwrap();

      if (res.success) {
        setValues({});
        setErrors({});
        setCountrySearch("");
        setStateSearch("");
        setSelectedCountryId(null);
        router.push("request-send-successfully");
      }
    } catch (error: any) {
      const serverErrors:any = mapServerErrors(error?.errors || {}, setErrors);

      const messages:any =
        serverErrors && typeof serverErrors === "object"
          ? Object.values(serverErrors)
          : ["Signup failed. Please try again."];

      showPopup("Submission failed", messages as string[]);
      console.error("Signup failed:", serverErrors);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full h-11 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-black";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";
  const errorClass = "text-red-500 text-sm mt-1";

  return (
    <>
      <div className="flex justify-center items-center p-8 min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-4xl">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Wholesale Sign-Up
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Company Name</label>
              <input
                type="text"
                className={inputClass}
                value={values.company_name || ""}
                onChange={(e) => handleChange("company_name", e.target.value)}
              />
              {errors.company_name && <p className={errorClass}>{errors.company_name}</p>}
            </div>

            <div>
              <label className={labelClass}>Business Trading Name</label>
              <input
                type="text"
                className={inputClass}
                value={values.buisness_trading_name || ""}
                onChange={(e) => handleChange("buisness_trading_name", e.target.value)}
              />
              {errors.buisness_trading_name && (
                <p className={errorClass}>{errors.buisness_trading_name}</p>
              )}
            </div>

            <div>
              <label className={labelClass}>ABN/ACN</label>
              <input
                type="text"
                className={inputClass}
                value={values.abn_acn || ""}
                onChange={(e) => handleChange("abn_acn", e.target.value)}
              />
              {errors.abn_acn && <p className={errorClass}>{errors.abn_acn}</p>}
            </div>

            <div>
              <label className={labelClass}>Contact Name</label>
              <input
                type="text"
                className={inputClass}
                value={values.contact_name || ""}
                onChange={(e) => handleChange("contact_name", e.target.value)}
              />
              {errors.contact_name && <p className={errorClass}>{errors.contact_name}</p>}
            </div>

            {/* Country */}
            <div className="md:col-span-2">
              <label className={labelClass}>Country</label>

              <Select
                options={countryOptions}
                value={countryOptions.find(
                  (c) => c.value === values?.country?.isoCode
                )}
                onChange={(selected: any) => {
                  setValues((prev: any) => ({
                    ...prev,
                    country: {
                      name: selected.label,
                      isoCode: selected.value,
                    },
                    state: null,
                  }));

                  setErrors((prev) => ({
                    ...prev,
                    country: "",
                    state: "",
                  }));
                }}
                placeholder="Select country"
              />

              {errors.country && <p className={errorClass}>{errors.country}</p>}
            </div>

            {/* State */}
            <div className="md:col-span-2">
              <label className={labelClass}>State</label>

              <Select
                options={stateOptions}
                value={stateOptions.find(
                  (s) => s.value === values?.state?.isoCode
                )}
                onChange={(selected: any) => {
                  setValues((prev: any) => ({
                    ...prev,
                    state: {
                      name: selected.label,
                      isoCode: selected.value,
                    },
                  }));

                  setErrors((prev) => ({
                    ...prev,
                    state: "",
                  }));
                }}
                placeholder={
                  values?.country?.isoCode
                    ? "Select state"
                    : "Select country first"
                }
                isDisabled={!values?.country?.isoCode}
              />

              {errors.state && <p className={errorClass}>{errors.state}</p>}
            </div>

            <div>
              <label className={labelClass}>City</label>
              <input
                type="text"
                className={inputClass}
                value={values.city || ""}
                onChange={(e) => handleChange("city", e.target.value)}
              />
              {errors.city && <p className={errorClass}>{errors.city}</p>}
            </div>

            <div>
              <label className={labelClass}>Postcode</label>
              <input
                type="number"
                className={inputClass}
                value={values.postcode || ""}
                onChange={(e) => handleChange("postcode", e.target.value)}
              />
              {errors.postcode && <p className={errorClass}>{errors.postcode}</p>}
            </div>

            <div>
              <label className={labelClass}>Phone</label>
              <input
                type="number"
                className={inputClass}
                value={values.phone || ""}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
              {errors.phone && <p className={errorClass}>{errors.phone}</p>}
            </div>

            <div>
              <label className={labelClass}>Account Payable Email</label>
              <input
                type="email"
                className={inputClass}
                value={values.account_payable_email || ""}
                onChange={(e) => handleChange("account_payable_email", e.target.value)}
              />
              {errors.account_payable_email && (
                <p className={errorClass}>{errors.account_payable_email}</p>
              )}
            </div>

            <div>
              <label className={labelClass}>Name of Social Media Channel</label>
              <input
                type="text"
                className={inputClass}
                value={values.name_of_social_media_channel || ""}
                onChange={(e) =>
                  handleChange("name_of_social_media_channel", e.target.value)
                }
              />
              
            </div>

            <div>
              <label className={labelClass}>Facebook</label>
              <input
                type="text"
                className={inputClass}
                value={values.facebook || ""}
                onChange={(e) => handleChange("facebook", e.target.value)}
              />
            </div>

            <div>
              <label className={labelClass}>YouTube</label>
              <input
                type="text"
                className={inputClass}
                value={values.youtube || ""}
                onChange={(e) => handleChange("youtube", e.target.value)}
              />
            </div>

            <div>
              <label className={labelClass}>TikTok</label>
              <input
                type="text"
                className={inputClass}
                value={values.tiktok || ""}
                onChange={(e) => handleChange("tiktok", e.target.value)}
              />
            </div>

            <div>
              <label className={labelClass}>X</label>
              <input
                type="text"
                className={inputClass}
                value={values.x || ""}
                onChange={(e) => handleChange("x", e.target.value)}
              />
            </div>

            <div>
              <label className={labelClass}>Last Year Turn Over</label>
              <input
                type="number"
                className={inputClass}
                value={values.last_year_turn_over || ""}
                onChange={(e) => handleChange("last_year_turn_over", e.target.value)}
              />
              {errors.last_year_turn_over && <p className={errorClass}>{errors.last_year_turn_over}</p>}
            </div>

            <div>
              <label className={labelClass}>Number Of Employees</label>
              <input
                type="number"
                className={inputClass}
                value={values.no_of_employee || ""}
                onChange={(e) => handleChange("no_of_employee", e.target.value)}
              />
              {errors.no_of_employee && <p className={errorClass}>{errors.no_of_employee}</p>}
            </div>

            <div>
              <label className={labelClass}>Current Methods Of Sales</label>
              <input
                type="text"
                className={inputClass}
                value={values.current_method_of_sales || ""}
                onChange={(e) => handleChange("current_method_of_sales", e.target.value)}
              />
              {errors.current_method_of_sales && <p className={errorClass}>{errors.current_method_of_sales}</p>}
            </div>

            <div>
              <label className={labelClass}>eBay And Other Platforms</label>
              <input
                type="text"
                className={inputClass}
                value={values.ebay_and_other_ecommerce_platform || ""}
                onChange={(e) =>
                  handleChange("ebay_and_other_ecommerce_platform", e.target.value)
                }
              />
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>Website</label>
              <input
                type="text"
                className={inputClass}
                value={values.website || ""}
                onChange={(e) => handleChange("website", e.target.value)}
              />
            </div>

            <div className="md:col-span-2">
              <UploadSingleFile
                isRequired={true}
                name={"business_registration_certificate"}
                customClass="col-span-2"
                values={values}
                setValues={setValues}
                errors={errors}
                folder={"wholesalerequest"}
                label="Upload Business registration certificate*"
              />
              {errors.business_registration_certificate && (
                <p className={errorClass}>{errors.business_registration_certificate}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <UploadSingleFile
                isRequired={true}
                name={"company_address"}
                customClass="col-span-2"
                values={values}
                setValues={setValues}
                errors={errors}
                folder={"wholesalerequest"}
                label="Upload Proof of company address (utility bill)*"
              />
              {errors.company_address && (
                <p className={errorClass}>{errors.company_address}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <UploadSingleFile
                isRequired={true}
                name={"business_card"}
                customClass="col-span-2"
                values={values}
                setValues={setValues}
                errors={errors}
                folder={"wholesalerequest"}
                label="Upload Business card or invoice pad*"
              />
              {errors.business_card && (
                <p className={errorClass}>{errors.business_card}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <UploadSingleFile
                name={"shop_photo"}
                customClass="col-span-2"
                values={values}
                setValues={setValues}
                errors={errors}
                folder={"wholesalerequest"}
                label="Upload the front image of the shop*"
              />
            </div>

            <div className="md:col-span-2">
              <TermCondation />
            </div>

            <div className="md:col-span-2 flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full md:w-1/2 mx-auto rounded-md px-4 py-3 font-medium transition flex items-center justify-center gap-2 ${isSubmitting
                    ? "bg-gray-500 text-white cursor-not-allowed"
                    : "bg-black text-white hover:bg-gray-800"
                  }`}
              >
                {isSubmitting ? (
                  <>
                    <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Submitting...
                  </>
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm">
              Already have an account?{" "}
              <span
                onClick={() => router.push("/login")}
                className="text-blue-600 font-semibold cursor-pointer"
              >
                Sign In
              </span>
            </p>
          </div>
        </div>
      </div>

      {popup.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                {popup.title}
              </h3>
              <button
                type="button"
                onClick={closePopup}
                className="text-gray-500 hover:text-black text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="max-h-72 overflow-y-auto">
              <ul className="space-y-2">
                {popup.messages.map((msg, index) => (
                  <li
                    key={`${msg}-${index}`}
                    className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
                  >
                    {msg}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 flex justify-center">
              <button
                type="button"
                onClick={closePopup}
                className="rounded-md bg-black px-5 py-2 text-white hover:bg-gray-800"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WholeSaleSignUp;

const validateForm = (values: any) => {
  const newErrors: Record<string, string> = {};

  if (!values.company_name)
    newErrors.company_name = "Company name is required";

  if (!values.contact_name)
    newErrors.contact_name = "Contact name is required";

  if (!values.abn_acn)
    newErrors.abn_acn = "ABN/ACN is required";

  if (!values.country)
    newErrors.country = "Country is required";

  if (!values.state)
    newErrors.state = "State is required";

  if (!values.city)
    newErrors.city = "City is required";

  if (!values.postcode)
    newErrors.postcode = "Postcode is required";

  if (!values.last_year_turn_over)
    newErrors.last_year_turn_over = "Last Year Turnover is required";

  if (!values.current_method_of_sales)
    newErrors.current_method_of_sales = "Current method of sales is required";

  if (!values.no_of_employee)
    newErrors.no_of_employee = "Number of employees is required";

  if (!values.phone) {
    newErrors.phone = "Phone is required";
  } else if (!/^[0-9]{7,15}$/.test(String(values.phone))) {
    newErrors.phone = "Invalid phone number";
  }

  if (!values.account_payable_email) {
    newErrors.account_payable_email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.account_payable_email)) {
    newErrors.account_payable_email = "Invalid email";
  }

  return newErrors;
};