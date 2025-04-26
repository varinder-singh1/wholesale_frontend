"use client";

import React from "react";
import dynamic from "next/dynamic";
// import Chart from "react-apexcharts";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ChartComponent = ({ saleData }) => {
  const options = {
    chart: {
      id: "basic-line",
    },
    xaxis: {
      categories: saleData?.dates,
    },
  };

  const series = [
    {
      name: "series-1",
      data: saleData?.sales,
    },
  ];

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart options={options} series={series} type="line" width={500} />
        </div>
      </div>
    </div>
  );
};

export default ChartComponent;
