"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import {
  FaClipboardList,
  FaCreditCard,
  FaShoppingCart,
} from "react-icons/fa";

// Dynamic chart import
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Dashboard: React.FC = () => {
  const [selectedSales, setSelectedSales] = useState<keyof typeof salesData>("lastYear");
  const [chartType, setChartType] = useState<"bar" | "line" | "area" | "pie" | "donut">("bar");

  const salesData = {
    lastYear: {
      series: [{ name: "Sales", data: [5000, 7000, 8000, 9000, 11000, 12000] }],
      categories: ["Jan", "Mar", "May", "Jul", "Sep", "Nov"],
      title: "Last Year Sales",
    },
    lastMonth: {
      series: [{ name: "Sales", data: [4000, 6000, 7000, 8000] }],
      categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
      title: "Last Month Sales",
    },
    lastWeek: {
      series: [{ name: "Sales", data: [5000, 5500, 6000, 6200, 6400, 7000, 7500] }],
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      title: "Last Week Sales",
    },
    salesDistribution: {
      series: [{ name: "Sales", data: [5000, 4500, 32000, 120000] }],
      categories: ["Today", "Yesterday", "Last Week", "Last Month"],
      title: "Yesterday & Today Sales",
    },
    totalSales: {
      series: [{ name: "Sales", data: [5000, 4500, 32000, 120000] }],
      categories: ["Today", "Yesterday", "Last Week", "Last Month"],
      title: "Total Sales Overview",
    },
  };

  const chartOptions = {
    chart: { type: chartType, height: 300 },
    xaxis: salesData[selectedSales].categories
      ? { categories: salesData[selectedSales].categories }
      : undefined,
    labels: salesData[selectedSales].categories || [],
    colors: ["#4F46E5", "#22C55E", "#EAB308", "#EF4444"],
  };

  const chartSeries = salesData[selectedSales].series;

  return (
    <div className="h-full bg-gray-100 text-black p-4 sm:p-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Dashboard Overview</h2>
      <p className="text-gray-600 mt-2 text-sm sm:text-base">Manage your account, orders, and settings.</p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-6">
        {[
          { title: "Total Orders", value: "1,230", icon: <FaClipboardList className="text-blue-500" /> },
          { title: "Revenue", value: "$50,000", icon: <FaCreditCard className="text-yellow-500" /> },
          { title: "Pending Orders", value: "87", icon: <FaShoppingCart className="text-red-500" /> },
        ].map((stat, index) => (
          <div key={index} className="bg-white p-4 sm:p-6 rounded-lg shadow flex items-center gap-4">
            <div className="text-2xl sm:text-3xl">{stat.icon}</div>
            <div>
              <p className="text-sm sm:text-base text-gray-600">{stat.title}</p>
              <h3 className="text-lg sm:text-2xl font-semibold">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Options */}
      <div className="mt-8 flex flex-wrap gap-2 sm:gap-4 items-center">
        {Object.keys(salesData).map((option) => (
          <button
            key={option}
            onClick={() => setSelectedSales(option as keyof typeof salesData)}
            className={`px-3 py-2 rounded-md text-sm sm:text-base ${
              selectedSales === option ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
            }`}
          >
            {salesData[option as keyof typeof salesData].title}
          </button>
        ))}

        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value as typeof chartType)}
          className="p-2 border rounded-md bg-white text-sm sm:text-base"
        >
          <option value="bar">Bar Chart</option>
          <option value="line">Line Chart</option>
          <option value="area">Area Chart</option>
          <option value="pie">Pie Chart</option>
          <option value="donut">Donut Chart</option>
        </select>
      </div>

      {/* Chart */}
      <div className="mt-8 bg-white p-4 sm:p-6 rounded-lg shadow">
        <h3 className="text-lg sm:text-xl font-semibold mb-4">{salesData[selectedSales].title}</h3>
        <Chart options={chartOptions} series={chartSeries} type={chartType} height={300} />
      </div>

      {/* Table */}
      <div className="mt-10 bg-white p-4 sm:p-6 rounded-lg shadow">
        <h3 className="text-lg sm:text-2xl font-semibold mb-4">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 text-left text-sm sm:text-base">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-3">Order ID</th>
                <th className="border p-3">Customer</th>
                <th className="border p-3">Total</th>
                <th className="border p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: "#1023", customer: "John Doe", total: "$500", status: "Completed", color: "text-green-600" },
                { id: "#1024", customer: "Jane Smith", total: "$1,200", status: "Pending", color: "text-yellow-600" },
                { id: "#1025", customer: "Mark Taylor", total: "$2,500", status: "Shipped", color: "text-blue-600" },
              ].map((order, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border p-3">{order.id}</td>
                  <td className="border p-3">{order.customer}</td>
                  <td className="border p-3">{order.total}</td>
                  <td className={`border p-3 font-medium ${order.color}`}>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
