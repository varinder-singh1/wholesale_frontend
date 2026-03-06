"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useRef, useState } from "react";
import axios from "axios";
import { PAYMENT_METHODS } from "@/app/constants";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { loadCart } from "@/store/slices/cartSlice";
import toast from "react-hot-toast";
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
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [orderID, setOrderID] = useState<string | null>(null);
  const [orderData, setOrderData] = useState<any>(null);
  const orderDataRef = useRef<any>(null);

  const [paid, setPaid] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createOrder = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_ADDRESS}/v1/paypal/create-wholesale-order`,
        {
          selectedShipping,
          user,
          shippingAddress,
          billingAddress,
          productData,
          discount,
          paymentMethod: PAYMENT_METHODS.paypal,
          deviceDetails,
        }
      );

      console.log("create-wholesale-order response:", data);

      if (!data?.orderID) {
        throw new Error("orderID not found in API response");
      }

      if (!data?.order) {
        throw new Error("order object not found in API response");
      }

      setOrderID(data.orderID);
      setOrderData(data.order);
      orderDataRef.current = data.order;

      return data.orderID;
    } catch (err: any) {
      setError("Failed to create order.");
      console.error("createOrder error:", err?.response?.data || err.message || err);
      throw err;
    }
  };

  const onApprove = async (data: any) => {
    try {
      const currentOrder = orderDataRef.current;

      if (!data?.orderID) {
        throw new Error("PayPal orderID missing in onApprove");
      }

      if (!currentOrder) {
        throw new Error("Local order data missing before capture");
      }

      const { data: responseData } = await axios.post(
        `${process.env.NEXT_PUBLIC_ADDRESS}/v1/paypal/capture-wholesale-order`,
        {
          orderID: data.orderID,
          order: currentOrder,
        }
      );

      console.log("capture-wholesale-order response:", responseData);

      if (responseData.status === "COMPLETED") {
        dispatch(loadCart(0));
        localStorage.setItem("addToCart", "[]");
        toast.success("Order Placed Successfully!");
        setPaid(true);
        router.push(`/payment-successfull/${currentOrder.id}`);
      } else {
        throw new Error("Payment not completed");
      }
    } catch (err: any) {
      setError("Payment failed.");
      console.error("onApprove error:", err?.response?.data || err.message || err);
    }
  };

  const onError = async (err: any) => {
    console.error("PayPal onError:", err);

    try {
      if (orderDataRef.current) {
        await axios.post(
          `${process.env.NEXT_PUBLIC_ADDRESS}/v1/paypal/failed-wholesale-order`,
          {
            order: orderDataRef.current,
          }
        );
      }
    } catch (error) {
      console.error("failed-wholesale-order error:", error);
    }

    toast.error("Failed to process payment. Please try again");
  };

  const onCancel = async () => {
    try {
      if (orderDataRef.current) {
        await axios.post(
          `${process.env.NEXT_PUBLIC_ADDRESS}/v1/paypal/failed-wholesale-order`,
          {
            order: orderDataRef.current,
          }
        );
      }
    } catch (error) {
      console.error("cancel failed-wholesale-order error:", error);
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
            <PayPalButtons
              style={{ layout: "vertical" }}
              forceReRender={["AUD"]}
              onError={onError}
              onCancel={onCancel}
              createOrder={createOrder}
              onApprove={onApprove}
            />
          </div>
        )}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </PayPalScriptProvider>
  );
};

export default PayPalComponent;