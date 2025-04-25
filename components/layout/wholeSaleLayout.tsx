"use client";

import { useEffect, useState } from "react";
import WholeSaleSidebar from "@/components/wholesale/WholeSaleSideBar";
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter, usePathname } from "next/navigation";
import { USER_ROLE } from "@/app/constants";
import Loader from "../globals/Loader";

const WholeSaleLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { loading, user } = useSelector((state: RootState) => state.auth);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user?.role !== USER_ROLE.wholesale)) {
      router.push("/login");
    }
  }, [user, loading, router, pathname]);

  if (loading) return <Loader />;

  if (!user) return null;

  return (
    <div className="flex text-black min-h-screen bg-gray-100 relative">
      {/* Sidebar */}
      <aside
        className={`bg-white shadow-lg z-50 transform transition-transform duration-300 
          md:translate-x-0 fixed md:static inset-y-0 left-0 w-64 
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:flex flex-col`}
      >
        {/* Sidebar Header (Mobile Only) */}
        <div className="p-4 flex justify-between items-center border-b md:hidden">
          <h2 className="text-lg font-semibold">Menu</h2>
          <IoClose
            className="text-2xl cursor-pointer"
            onClick={() => setIsSidebarOpen(false)}
          />
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 overflow-y-auto">
          <WholeSaleSidebar />
        </div>
      </aside>

      {/* Overlay for Mobile Sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col px-4 md:px-6 lg:px-8">
        {/* Header (Mobile Only) */}
        <header className="md:hidden bg-white shadow-md p-3 flex items-center justify-between">
          <FaBars
            className="text-2xl cursor-pointer"
            onClick={() => setIsSidebarOpen(true)}
          />
          <h1 className="text-lg font-bold">Wholesale Dashboard</h1>
        </header>

        {/* Page Content */}
        <main className="flex-1 py-4 w-full max-w-[58rem] overflow-x-hidden mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default WholeSaleLayout;
