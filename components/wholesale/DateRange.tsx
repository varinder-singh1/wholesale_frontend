import { useState } from "react";

const DateRange = ({ onSelect }) => {
  const [selectedRange, setSelectedRange] = useState("this_year");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedRange(value);
    if (value !== "custom") {
      onSelect({[value]:true});
    }
  };

  const handleDateChange = () => {
    if (startDate && endDate) {
      onSelect({custom:true, start_date: startDate, end_date: endDate });
    }
  };

  return (
    <div className="mb-4">
      <label className="text-gray-700 font-semibold mr-2">Select Date Range:</label>
      <select
        className="p-2 border rounded-lg bg-white text-gray-700"
        value={selectedRange}
        onChange={handleChange}
      >
            <option value="today">Today</option>
        <option value="this_year">This Year</option>
        <option value="this_month">This Month</option>
        <option value="last_month">Last Month</option>
        <option value="last_seven_days">Last 7 Days</option>
        <option value="custom">Custom</option>
      </select>

      {selectedRange === "custom" && (
        <div className="mt-4 flex gap-4">
          <input
            type="date"
            className="p-2 border rounded-lg bg-white text-gray-700"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className="p-2 border rounded-lg bg-white text-gray-700"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <button
            className="p-2 bg-blue-500 text-white rounded-lg"
            onClick={handleDateChange}
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
};

export default DateRange ;
