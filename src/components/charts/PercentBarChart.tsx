// React
import React, { FC } from "react";

// Recharts
import {
  ResponsiveContainer,
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
  containerClasses?: string;
  chartData: PercentBarDataPoint[];
  title: string;
  barName: string;
  barColor: string;
}

const PercentBarChart: FC<IProps> = ({
  containerClasses,
  chartData,
  title,
  barName,
  barColor,
}) => {
  return (
    <div className={containerClasses ? containerClasses : ""}>
      <h2 className="text-center text-2xl text-white">{title}</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={730} height={250} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" style={{ fill: "#f3f4f6" }} />
          <YAxis unit="%" style={{ fill: "#f3f4f6" }} />
          <Tooltip
            formatter={(value) => {
              return `${value}%`;
            }}
            contentStyle={{
              background: "rgba(0, 0, 0, 0.9)",
              color: "white",
              borderRadius: "5px",
              border: "1px solid black",
            }}
          />
          <Legend />
          <Bar dataKey="data" fill={barColor} name={barName} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PercentBarChart;
