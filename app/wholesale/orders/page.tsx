"use client"
import Table from "@/components/globals/Table";
import WholeSaleSidebar from "@/components/wholesale/WholeSaleSideBar";
import { orders_colomn } from "@/helpers/tableColumn";
import { getMyWholesaleOrder } from "@/store/actions/admin/order";
import { AppDispatch } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function Orders() {

  const [data, setData] = useState<any>([]);
  const [apiHit, setApiHit] = useState(false);
  const dispatch = useDispatch<AppDispatch>();


  const getOrders = async () => {
    try {
      const res = await dispatch(getMyWholesaleOrder({})).unwrap();
      if (res.success) {
        console.log("res.data.result", res.data.result);

        setData(res.data.result);
        setApiHit(true);
      }
    } catch (error) { }
  };

  useEffect(() => {
    getOrders()
  }, [])

  const orders = [
    { id: "#1023", customer: "John Doe", total: "$500", status: "Completed", color: "text-green-600" },
    { id: "#1024", customer: "Jane Smith", total: "$1,200", status: "Pending", color: "text-yellow-600" },
    { id: "#1025", customer: "Mark Taylor", total: "$2,500", status: "Shipped", color: "text-blue-600" },
  ];

  return (
    <div className="">


      {/* Main Content */}
      <div className="p-2">
        <h2 className="text-3xl font-bold  ">Orders</h2>
        <p className="text-gray-600 mt-2">View and manage customer orders.</p>



        {/* Orders Table */}
        <div className="mt-6  bg-white p-2 sm:p-4 md:p-6 rounded-lg shadow w-[350px] sm:w-[60%] lg:w-full overflow-hidden">
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4">Order List</h3>

          <div className="w-full overflow-x-auto">
            <Table
              apiHit={apiHit}
              columns={orders_colomn()}
              tableData={data}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

export default Orders;
