"use client";

import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import toast from "react-hot-toast";
import { PAYMENT_METHODS } from "@/app/constants";
 
import Image from "next/image";

const ZipPay = ({
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
    toast.loading("Redirecting to zip pay...");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_ADDRESS}/v1/zip_pay/create-wholesale-order`,
        {
          selectedShipping: selectedShipping,
          user: user,
          shippingAddress,
          billingAddress,
          productData,
          discount,
          paymentMethod: PAYMENT_METHODS.zip_pay,
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    padding: "12px 24px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: isProcessing || loading ? "#cccccc" : "#002d2d",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "600",
    cursor: isProcessing || loading ? "not-allowed" : "pointer",
    opacity: isProcessing || loading ? 0.7 : 1,
    transition: "background-color 0.3s ease, transform 0.2s ease",
  }}
  aria-busy={isProcessing || loading}
>
  <Image
    src="/images/zip-pay.png"
    height={28}
    width={28}
    alt="Zip Pay"
    style={{ objectFit: "contain" }}
  />
  {isProcessing ? "Processing..." : "Pay with Zip"}
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

export default ZipPay;
