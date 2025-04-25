"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
const requestSend = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg text-center  ">
        {/* Animated Checkmark */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
          className="flex items-center justify-center w-24 h-24 mx-auto bg-green-500 rounded-full"
        >
          <svg
            className="w-12 h-12 text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12l4 4L19 7"></path>
          </svg>
        </motion.div>

        <h2 className="text-2xl md:text-3xl font-bold mt-6 text-gray-800">
          Request Sent Successfully
        </h2>
        <p className="text-gray-500 mt-2 w-full md:w-[540px]">
        Thank you for signing up for a Trade Account! We’re reviewing your request and will notify you once it’s approved. For any queries, please contact <br /> <Link className="text-blue-600" href="mailto:sales@kayhanaudio.com.au">sales@kayhanaudio.com.au.</Link>
        </p>

        {/* Back to Home Button */}
        {/* <button
          onClick={() => router.push("/")}
          className="mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
        >
          Go to Homepage
        </button> */}
      </div>
    </div>
  );
};

export default requestSend;