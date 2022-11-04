// React
import React, { FC } from "react";

// Recharts
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";

// Custom Types
import { PercentBarDataPoint } from "../../customTypes";

interface IProps {
  chartData: PercentBarDataPoint[];
}

const PercentBarChart: FC<IProps> = ({ chartData }) => {
  return (
    <BarChart width={730} height={250} data={chartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="data" fill="#8884d8" />
    </BarChart>
  );
};

export default PercentBarChart;
