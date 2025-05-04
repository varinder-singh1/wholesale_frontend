"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { loadCart } from "@/store/slices/cartSlice";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";

const PaymentVerify = () => {
  const router = useRouter();
  const { id } = useParams();

  // Get order ID from URL
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams(); // Get query params


  const token = searchParams.get("checkoutId") || searchParams.get("checkoutId"); // Handle both token types
  const status = searchParams.get("result") || searchParams.get("result");
 const amount = searchParams.get("amount") 
const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const verifyPayment = async () => {
      if (  !token || status != "approved") {
        // console.log("token",token,orderId );
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_ADDRESS}/v1/wholesale_order/failed-wholesale-order/`,
          {
            checkout_id: token,
            orderId :id,
            amount :amount
          }
        );
        toast.error("Invalid payment details.");
        router.push("/checkout"); // Redirect if token/orderId is missing
        return;
      }

      try {
        // `${process.env.NEXT_PUBLIC_ADDRESS}/v1/after_pay/create-order`,
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_ADDRESS}/v1/zip_pay/capture-wholesale-order/`,
          {
            checkout_id: token,
            orderId :id,
            amount :amount
          }
        );

        if (response.data.success) {
            localStorage.setItem("addToCart", "[]");
          
                    dispatch(loadCart(0));
          toast.success("Payment successful!");
          router.push(`/payment-successfull/${id}`); // Redirect to order success page
        } else {
          throw new Error(
            response.data.message || "Payment verification failed."
          );
        }
      } catch (error: any) {
        toast.error(
          error.response?.data?.message || "Payment verification failed."
        );
        router.push("/checkout"); // Redirect to checkout if failed
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [id, token]); // Ensure API is only called when orderId & token are available

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
    <div className="bg-white p-6 rounded-2xl shadow-xl text-center">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        {loading ? "Verifying your payment..." : "Redirecting..."}
      </h2>
      <p className="text-gray-500">
        Please wait while we process your request.
      </p>
      {loading && (
        <div className="mt-4 flex justify-center">
          <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  </div>
  
  );
};

export default PaymentVerify;
