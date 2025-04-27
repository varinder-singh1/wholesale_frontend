"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";
import axios from "axios";
import { PAYMENT_METHODS } from "@/app/constants";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { loadCart } from "@/store/slices/cartSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

const PayPalComponent = ({
  deviceDetails,
  discount,
  spiner,
  setSpiner,
  shippingAddress,
  billingAddress,
  productData,
  selectedShipping,
}) => {
  const { loading, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [orderID, setOrderID] = useState<string | null>(null);
  const [orderData, setOrderData] = useState<any>();
  const [paid, setPaid] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Create order
  const createOrder = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_ADDRESS}/v1/paypal/create-wholesale-order`,
        {
          selectedShipping: selectedShipping,
          user: user,
          shippingAddress,
          billingAddress,
          productData,
          discount,
          paymentMethod: PAYMENT_METHODS.paypal,
          deviceDetails,
        }
      );
      setOrderID(data.orderID);
      setOrderData(data.order);
      return data.orderID;
    } catch (err) {
      setError("Failed to create order.");
      console.error(err);
    }
  };

  // Capture payment
  const onApprove = async (data: any) => {
    try {
      const { data: responseData } = await axios.post(
        `${process.env.NEXT_PUBLIC_ADDRESS}/v1/paypal/capture-wholesale-order`,
        {
          orderID: data.orderID,
          order: orderData,
        }
      );

      if (responseData.status === "COMPLETED") {
        dispatch(loadCart(0));
        router.push(`/payment-successfull/${orderData.id}`);
        localStorage.setItem("addToCart", "[]");
        toast.success("Order Placed Successfully!");
        // setPaid(true);
      }
    } catch (err) {
      setError("Payment failed.");
      console.error(err);
    }
  };

  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
        currency: "AUD",
      }}
    >
      <div className="flex flex-col items-center">
        {paid ? (
          <h2 className="text-green-600 text-lg font-semibold">
            Payment Successful! 🎉
          </h2>
        ) : (
          <div>
            <h2 className="text-lg font-semibold mb-4">Pay with PayPal</h2>
            <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
          </div>
        )}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </PayPalScriptProvider>
  );
};

export default PayPalComponent;
