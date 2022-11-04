// React
import { FC, useState } from "react";

// Components
import PercentBarChart from "./PercentBarChart";

// Custom Types
import { PercentBarDataPoint } from "../../customTypes";

const activeBtnCSS =
  "text-gray-900 bg-gray-100 border border-gray-300 focus:outline-none hover:bg-gray-100 py-2 px-3 text-xs font-medium rounded-lg mr-2 mb-2";

const nonActiveBtnCSS =
  "border focus:outline-none font-medium rounded-lg text-xs px-3 py-2 text-center mr-2 mb-2 border-gray-600 text-gray-400 hover:text-white hover:bg-gray-600 focus:ring-gray-800";

interface IProps {
  title: string;
  chartContainerClasses?: string;
  chart1Data: PercentBarDataPoint[];
  chart2Data: PercentBarDataPoint[];
  bar1Name: string;
  bar2Name: string;
  bar1Color: string;
  bar2Color: string;
}

const ChangeOverTimeChart: FC<IProps> = ({
  title,
  chartContainerClasses,
  chart1Data,
  chart2Data,
  bar1Name,
  bar1Color,
  bar2Name,
  bar2Color,
}) => {
  const [activeChart, setActiveChart] = useState<0 | 1>(0);

  return (
    <div>
      <h2 className="mb-2 text-center text-2xl text-white">{title}</h2>
      <div className="text-center">
        <button
          className={activeChart === 0 ? activeBtnCSS : nonActiveBtnCSS}
          onClick={() => setActiveChart(0)}
        >
          Year over Year
        </button>
        <button
          className={activeChart === 1 ? activeBtnCSS : nonActiveBtnCSS}
          onClick={() => setActiveChart(1)}
        >
          Month over Month
        </button>
      </div>
      {activeChart === 0 ? (
        <PercentBarChart
          containerClasses={chartContainerClasses}
          chartData={chart1Data}
          barName={bar1Name}
          barColor={bar1Color}
        />
      ) : (
        <PercentBarChart
          containerClasses={chartContainerClasses}
          chartData={chart2Data}
          barName={bar2Name}
          barColor={bar2Color}
        />
      )}
    </div>
  );
};

export default ChangeOverTimeChart;
