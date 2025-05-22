"use client";

import WholeSaleSidebar from "@/components/wholesale/WholeSaleSideBar";
import { getWholeSellerDetail } from "@/store/actions/wholesale/detail";
import { AppDispatch, RootState } from "@/store/store";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AccountDetailsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, user } = useSelector((state: RootState) => state.auth);
  const [data, setData] = useState<any>(null);

  const getData = async () => {
    try {
      const res = await dispatch(getWholeSellerDetail({})).unwrap();
      if (res?.success) {
        console.log("res.data.result ===>", res.data?.result);
        setData(res.data?.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex text-black min-h-screen bg-gray-100">
      {/* Sidebar */}
      {/* <WholeSaleSidebar /> */}

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Account Details</h2>

        {/* Basic Info */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-2xl font-semibold mb-4">User Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoItem label="Name" value={data?.name} />
            <InfoItem label="Email" value={data?.email} />
            <InfoItem label="Phone" value={data?.phone} />
            <InfoItem label="Country" value={data?.country?.name} />
            <InfoItem label="Role" value={data?.role} />
            <InfoItem label="Status" value={data?.status === 1 ? "Active" : "Inactive"} />
            <InfoItem label="Created At" value={data?.created_at ? new Date(data.created_at).toLocaleString() : "-"} />
            <InfoItem label="Updated At" value={data?.updated_at ? new Date(data.updated_at).toLocaleString() : "-"} />
          </div>
        </div>

        {/* Wholesale Details */}
        {data?.wholeseller_detail && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Buisness Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoItem label="Company Name" value={data?.wholeseller_detail?.company_name} />
              <InfoItem label="Business Trading Name" value={data?.wholeseller_detail?.buisness_trading_name} />
              <InfoItem label="ABN/ACN" value={data?.wholeseller_detail?.abn_acn} />
              <InfoItem label="City" value={data?.wholeseller_detail?.city} />
              <InfoItem label="State" value={data?.wholeseller_detail?.state?.name} />
              <InfoItem label="Postcode" value={data?.wholeseller_detail?.postcode} />
              <InfoItem label="Phone" value={data?.wholeseller_detail?.phone} />
              <InfoItem label="Contact Name" value={data?.wholeseller_detail?.contact_name} />
              <InfoItem label="Account Payable Email" value={data?.wholeseller_detail?.account_payable_email} />
              <InfoItem
                label="Last Year Turnover"
                value={
                  data?.wholeseller_detail?.last_year_turn_over
                    ? `$${data?.wholeseller_detail?.last_year_turn_over}`
                    : "-"
                }
              />
              <InfoItem label="No. of Employees" value={data?.wholeseller_detail?.no_of_employee} />
              <InfoItem label="Current Method of Sales" value={data?.wholeseller_detail?.current_method_of_sales} />
              
              {/* Image */}
              {data?.wholeseller_detail?.shop_photo && (
                <div className="flex flex-col">
                  <span className="text-gray-600 font-medium mb-1">Shop Photo</span>
                  <Image
                  width={500} height={300}
                    src={`${process.env.NEXT_PUBLIC_S3_IMG_URL}${data?.wholeseller_detail?.shop_photo}`}
                    alt="Shop Photo"
                    className="rounded-md w-40 h-40 object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Small reusable component for showing label and value
const InfoItem = ({ label, value }: { label: string; value: any }) => (
  <div>
    <p className="text-gray-600 font-medium">{label}</p>
    <p className="text-gray-800">{value ?? "-"}</p> {/* Safe default "-" if value is null/undefined */}
  </div>
);

export default AccountDetailsPage;
