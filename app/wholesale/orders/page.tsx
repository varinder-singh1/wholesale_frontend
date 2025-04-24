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
        console.log("res.data.result",res.data.result);
        
        setData(res.data.result);
        setApiHit(true);
      }
    } catch (error) {}
  };

  useEffect(()=>{
    getOrders()
  },[])

  const orders = [
    { id: "#1023", customer: "John Doe", total: "$500", status: "Completed", color: "text-green-600" },
    { id: "#1024", customer: "Jane Smith", total: "$1,200", status: "Pending", color: "text-yellow-600" },
    { id: "#1025", customer: "Mark Taylor", total: "$2,500", status: "Shipped", color: "text-blue-600" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 text-black p-2">
      {/* Sidebar */}
      {/* <WholeSaleSidebar /> */}

      {/* Main Content */}
      <div className="flex-1 p-2">
        <h2 className="text-3xl font-bold  ">Orders</h2>
        <p className="text-gray-600 mt-2">View and manage customer orders.</p>

      

        {/* Orders Table */}
        <div className="mt-6 bg-white p-2 rounded-lg shadow">
          <h3 className="text-2xl font-semibold mb-4 ">Order List</h3>
          {/* <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="border p-3">Order ID</th>
                <th className="border p-3">Customer</th>
                <th className="border p-3">Total</th>
                <th className="border p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border p-3">{order.id}</td>
                  <td className="border p-3">{order.customer}</td>
                  <td className="border p-3">{order.total}</td>
                  <td className={`border p-3 font-medium ${order.color}`}>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table> */}
             <Table
        apiHit={apiHit}
        columns={orders_colomn()} //
        tableData={data}
      />
        </div>
      </div>
    </div>
  );
}

export default Orders;
