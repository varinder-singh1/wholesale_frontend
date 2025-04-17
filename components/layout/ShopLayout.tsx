"use client";

import React, { useEffect, useState, ReactNode } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import ShopNavBar from "./ShopNavbar";
import ShopMenuHeader from "./ShopMenuHeader";
import MobileBottomNavigation from "./MobileBottomNavigation";
import ShopFooter from "./ShopFooter";
import MenuBarDetail from "./ShopSideBar";
import { DEPARTMENT_VIEW, USER_ROLE } from "@/app/constants";
import { getDepartment } from "@/store/actions/admin/department";
import { cartCountAction } from "@/store/actions/cart";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Loader from "../globals/Loader";

interface ShopLayoutProps {
  children: ReactNode;
}

const ShopLayout: React.FC<ShopLayoutProps> = ({ children }) => {
  const [data, setData] = useState<Record<string, any>[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<any>(null);
  const { loading, user } = useSelector((state: RootState) => state.auth);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const listDepartments = async () => {
    try {
      const res = await dispatch(getDepartment({})).unwrap();
      if (res.success) {
        setData(res?.data?.result ?? []);
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  useEffect(() => {
    const firstSegment = pathname.split("/")[1];
    if (
      firstSegment !== "sign-in" &&
      firstSegment !== "signup" &&
      firstSegment !== "login"
    ) {
      if (!loading && (!user || user?.role !== USER_ROLE.wholesale)) {
        router.push("/sign-in");
      }
    }
  }, [user, loading, router, pathname]);

  useEffect(() => {
    listDepartments();
    cartCountF();
  }, [dispatch]);

  const cartCountF = async () => {
    await dispatch(cartCountAction());
  };

  const openSidebar = (department: any) => {
    setSelectedDepartment(department);
    setSidebarOpen(true);
  };

  return (
    <div className="relative dark:bg-white">
      {/* Top Navbar & Header */}
      <ShopNavBar departments={data} setOpen={openSidebar} />
      <ShopMenuHeader data={data} setOpen={openSidebar} />

      {/* Sidebar + Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Dark Overlay */}
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setSidebarOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="fixed top-0 left-0 w-[300px] h-screen z-50 bg-white shadow-lg"
            >
              <MenuBarDetail
                selectedItem={data}
                toggleDrawer={setSidebarOpen}
                setDetailsOpen={setSidebarOpen}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        children
      )}

      {/* Bottom Mobile Navigation & Footer */}
      <MobileBottomNavigation departments={data} />
      <ShopFooter />
    </div>
  );
};

export default ShopLayout;
