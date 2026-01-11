import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ErrorChart = ({ data }) => {
  //Transform data from recharts
  const chartData = data.map((item) => ({
    month: new Date(item.month + "-01").toLocaleDateString("en-US", {
      month: "short",
      year: "2-digit",
    }),

    Salesforce: item.salesforceErrors,
    Jira: item.jiraErrors,
  }));

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        {" "}
        Error Trends (Last 6 Month)
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        {" "}
        <LineChart data={chartData}>
          {" "}
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e0e0e0"></CartesianGrid>{" "}
          <XAxis dataKey="month" stroke="#666" style={{ fontSize: "12px" }} />{" "}
          <YAxis stroke="#666" style={{ fontSize: "12px" }} />{" "}
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          />{" "}
          <Legend />{" "}
          <Line
            type="monotone"
            dataKey="Salesforce"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: "#3b82f6", r: 4 }}
            activeDot={{ r: 6 }}
          />{" "}
          <Line
            type="monotone"
            dataKey="Jira"
            stroke="#f10606ff"
            strokeWidth={2}
            dot={{ fill: "#f10606ff", r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>{" "}
      </ResponsiveContainer>
    </div>
  );
};

export default ErrorChart;
