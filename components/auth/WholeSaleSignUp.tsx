"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { SignInData, wholeSalesignUpAction } from "@/store/actions/auth";
import { mapServerErrors } from "@/helpers/commonFunction";
import { USER_ROLE } from "@/app/constants";
import { useRouter } from "next/navigation";
import DynamicForm, { FormField } from "../globals/DynamicForm";
import {
  CountrySelect,
  StateSelect,
  CitySelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import UploadSingleFile from "../globals/Fields/UploadSingleFile";

const WholeSaleSignUp: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [values, setValues] = useState<any>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedCountryId, setSelectedCountryId] = useState<number | null>(
    null
  );

  const formFields: FormField[] = [
    { name: "company_name", label: "Company Name", type: "text" },
    {
      name: "buisness_trading_name",
      label: "Business Trading Name",
      type: "text",
    },
    { name: "abn_acn", label: "ABN/ACN", type: "text" },
    { name: "contact_name", label: "Contact Name", type: "text" },
    {
      name: "country",
      label: "Country",
      type: "custom",
      customClass: "col-span-2",
      customRender: () => (
        <div>
          <label className="block text-lg font-medium mb-1">Country</label>
          <CountrySelect
            inputClassName="w-full h-10 px-3 border rounded"
            onChange={(e) => {
              setSelectedCountryId(e.id);
              setValues((prev) => ({
                ...prev,
                // country: e.name,
                // country_iso2: e.iso2,
                // country_iso3: e.iso3,
                country: { id: e.id, name: e.name, iso3: e.iso3, iso2: e.iso2 },
              }));
            }}
            placeHolder="Select Country"
          />
          {errors.country && <p className="text-red-400" >{errors.country}</p>}
        </div>
      ),
    },

    {
      name: "state",
      label: "State",
      type: "custom",
      customClass: "col-span-2",
      customRender: () =>
        selectedCountryId ? (
          <div>
            <label className="block text-lg font-medium mb-1">State</label>
            <StateSelect
              countryid={values?.country?.id}
              inputClassName="w-full h-10 px-3 border rounded"
              onChange={(e) => {
                setValues((prev) => ({
                  ...prev,
                  // state: e.name,
                  state: { id: e.id, name: e.name, state_code: e.state_code },
                }));
              }}
              placeHolder="Select State"
            />
                      {errors.state && <p className="text-red-400" >{errors.state}</p>}
          </div>
        ) : null,
    },
    { name: "city", label: "City", type: "text" },
    { name: "postcode", label: "Postcode", type: "number" },
    { name: "phone", label: "Phone", type: "number" },
    {
      name: "account_payable_email",
      label: "Account Payable Email",
      type: "email",
    },
    {
      name: "name_of_social_media_channel",
      label: "Name of Social Media Channel",
      type: "text",
    },
    { name: "facebook", label: "Facebook", type: "text" },
    { name: "youtube", label: "YouTube", type: "text" },
    { name: "tiktok", label: "TikTok", type: "text" },
    { name: "x", label: "X", type: "text" },
    {
      name: "last_year_turn_over",
      label: "Last Year Turn Over",
      type: "number",
    },
    { name: "no_of_employee", label: "Number Of Employees", type: "number" },
    {
      name: "current_method_of_sales",
      label: "Current Methods Of Sales",
      type: "text",
    },
    {
      name: "ebay_and_other_ecommerce_platform",
      label: "eBay And Other Platforms",
      type: "text",
    },
    { name: "website", label: "Website", type: "text" },
    {
      name: "images",
      label: "Upload Images",
      type: "custom",
      customClass: "col-span-2",
      customRender: () => {
        return (
          <div className="col-span-2">
            {
              <UploadSingleFile
                name={"shop_photo"}
                customClass="col-span-2"
                values={values}
                setValues={setValues}
                errors={errors}
                folder={"wholesalerequest"}
              />
            }
          </div>
        );
      },
    },
    // { name: "shop_photo", label: "Shop Photo URL", type: "text" }
  ];

  const handleSubmit = async (
    e: React.FormEvent,
    values: SignInData,
    mode: string
  ) => {
    e.preventDefault();
    try {
      const res = await dispatch(wholeSalesignUpAction(values)).unwrap();
      if (res.success) {
        setValues({});
      }
    } catch (error) {
      const formErrors = mapServerErrors((error as any).errors, setErrors);
      console.error("Signup failed:", formErrors);
    }
  };

  return (
    <div className="flex justify-center items-center p-8 min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Wholesale Sign-Up
        </h2>
        <DynamicForm
          formClassName="grid grid-cols-1 md:grid-cols-2 gap-6"
          submitTitle="Sign Up"
          values={values}
          setValues={setValues}
          errors={errors}
          formFields={formFields}
          handleSubmit={handleSubmit}
          mode="add"
        />
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
  );
};

export default WholeSaleSignUp;
