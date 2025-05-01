"use client";

import { logoutUser } from "@/store/actions/auth";
import { AppDispatch, RootState } from "@/store/store";
import { ArrowBigLeft, PanelLeftDashed } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FaTachometerAlt,
  FaClipboardList,
  FaMapMarkerAlt,
  FaCreditCard,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const menuItems = [
  { label: "Dashboard", icon: <FaTachometerAlt />, path: "dashboard" },
  { label: "Orders", icon: <FaClipboardList />, path: "orders" },
  { label: "Addresses", icon: <FaMapMarkerAlt />, path: "addresses" },
  // { label: "Payment Methods", icon: <FaCreditCard />, path: "payment-methods" },
  { label: "Account Details", icon: <FaUser />, path: "details" },
  // { label: "Log Out", icon: <FaSignOutAlt />, path: "logout" },
];

const WholeSaleSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const dispatch = useDispatch<AppDispatch>();
  const { loading, user } = useSelector((state: RootState) => state.auth);

  const logoutHandler = async () => {
    const response = await dispatch(logoutUser());
    const res = response.payload as { status: boolean; message: string };
    if (res?.status) {
      router.push("/login");
    }
  };

  return (
    <aside className="w-64 bg-white shadow-lg border-r min-h-screen overflow-hidden">
      {/* Profile Section */}
      <div className="p-6 border-b flex flex-col items-center text-center">
        <Link href={"/"} >
        <ArrowBigLeft/>
        </Link>
        <h2 className="mt-3 text-lg font-semibold text-gray-800">
          {user?.name}
        </h2>
        <button
          onClick={() => logoutHandler()}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Logout
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-4 overflow-y-auto max-h-[calc(100vh-150px)]">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={`${item.path}`}
            className={`flex items-center gap-3 px-6 py-4 transition-all
              ${
                pathname === item.path
                  ? "bg-gray-100 border-l-4 border-blue-600 text-blue-600 font-semibold"
                  : "text-gray-700 hover:bg-gray-50"
              }
            `}
          >
            <span className="text-xl">{item.icon}</span>
            {item.label}
          </Link>
        ))}

        <button
          onClick={() => logoutHandler()}
          className={`flex items-center gap-3 px-6 py-4 transition-all
              ${
                pathname === "false"
                  ? "bg-gray-100 border-l-4 border-blue-600 text-blue-600 font-semibold"
                  : "text-gray-700 hover:bg-gray-50"
              }
            `}
        >
          <span className="text-xl">
            {" "}
            <FaSignOutAlt />
          </span>
          LogOut
        </button>
      </nav>
    </aside>
  );
};

export default WholeSaleSidebar;
