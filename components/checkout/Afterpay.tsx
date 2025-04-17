"use client";

import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import toast from "react-hot-toast";
import { PAYMENT_METHODS } from "@/app/constants";

const AfterPay = ({
  deviceDetails,
  discount,
  spiner,
  setSpiner,
  shippingAddress,
  billingAddress,
  productData,
  selectedShipping,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { loading, user } = useSelector((state: RootState) => state.auth);
  const handleExpressCheckout = async () => {
    setIsProcessing(true);
    toast.loading("Redirecting to Afterpay...");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_ADDRESS}/v1/after_pay/create-wholesale-order`,
        {
          selectedShipping: selectedShipping,
          user: user,
          shippingAddress,
          billingAddress,
          productData,
          discount,
          paymentMethod: PAYMENT_METHODS.afterpay,
          deviceDetails,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.redirectUrl) {
        window.location.href = response.data.redirectUrl; // Redirect to Afterpay checkout
      } else {
        toast.error("Failed to start Afterpay Express Checkout");
      }
    } catch (error) {
      console.error("Afterpay Error:", error);
      toast.error("Something went wrong! Please try again.");
    } finally {
      setIsProcessing(false);
      toast.dismiss();
    }
  };

  return (
    <div style={styles.container}>
      <button
        onClick={handleExpressCheckout}
        disabled={loading || isProcessing}
        style={{
          ...styles.button,
          backgroundColor: isProcessing || loading ? "#7a7a7a" : "#002d2d",
          cursor: isProcessing || loading ? "not-allowed" : "pointer",
        }}
      >
        {isProcessing ? "Processing..." : "Pay with Afterpay "}
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
  button: {
    color: "white",
    padding: "12px 20px",
    borderRadius: "5px",
    fontSize: "16px",
    fontWeight: "bold",
    border: "none",
    transition: "background 0.3s ease",
  },
};

export default AfterPay;
