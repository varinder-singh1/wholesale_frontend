"use client";

import React from "react";
import Loader from "./Loader";

interface Column {
  key: string;
  title: string;
  transform?: (value: any, row: any, index: number) => React.ReactNode;
}

interface TableProps {
  apiHit: boolean;
  columns: any[];
  tableData: Record<string, any>[];
}

const Table: React.FC<TableProps> = ({ apiHit, columns, tableData }) => {
  return (
    <div className="relative overflow-x-auto w-full overflow-y-auto rounded-none sm border border-gray-200 ">
      <table className="w-full min min-h-[150px] text-sm text-center text-gray-500">
        <thead className="text-xs text-black uppercase bg-gray-200 text-lightthemecolor h-[55px]">
          <tr>
            {columns.map((col, index) => (
              <th scope="col" className="px-6 py-3 font-bold border border-gray-300 font-sans" key={index}>
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {apiHit && tableData.length > 0 ? (
            tableData.map((row, ind) => (
              <tr
                className="bg-white border border-gray-300 font-sans hover:bg-gray-50 "
                key={row._id || ind} // Fallback to index if _id is missing
              >
                {columns.map((col, i) => (
                  <td
                    className=" min-w-[100px]  font-sans font-medium whitespace-nowrap  border border-gray-300 text-black "
                    key={i}
                  >
                    {col.transform ? col.transform(row[col.key], row, ind) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : apiHit && tableData.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-4">
                No Record Found!
              </td>
            </tr>
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center py-4">
                <Loader />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
