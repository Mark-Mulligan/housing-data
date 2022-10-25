// React
import React, { useState, FC } from "react";

// Recharts
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";

// Components
import CustomLabel from "./CustomLabel";

const setInitialChartData = (
  dateData: string[],
  listingPriceData: number[]
) => {
  const result = [];

  for (let i = 0; i < dateData.length; i++) {
    result.push({ name: dateData[i], listingPrice: listingPriceData[i] });
  }

  return result;
};

interface IProps {
  monthlyData: {
    dateData: string[];
    listingPriceData: number[];
    activeListingCountData: number[];
    daysOnMarketData: number[];
    newListingCountData: number[];
    priceIncreasedCountData: number[];
    priceReducedCountData: number[];
    squareFeetData: number[];
    totalListingCountData: number[];
  };
}

interface DisplayedChartData {
  listingPrice: boolean;
  totalListings: boolean;
  activeListings: boolean;
  newListings: boolean;
  priceReduced: boolean;
  daysOnMarket: boolean;
  squareFeet: boolean;
}

const activeBtnCSS =
  "text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2";
const nonActiveBtnCSS =
  "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2";

const MonthlyInventoryChart: FC<IProps> = ({ monthlyData }) => {
  const [chartData, setChartData] = useState(
    setInitialChartData(monthlyData.dateData, monthlyData.listingPriceData)
  );

  const [displayedChartData, setDisplayedChartData] =
    useState<DisplayedChartData>({
      listingPrice: true,
      totalListings: false,
      activeListings: false,
      newListings: false,
      priceReduced: false,
      daysOnMarket: false,
      squareFeet: false,
    });

  const handleChartButtonClick = (key: keyof DisplayedChartData) => {
    setDisplayedChartData((previousState) => ({
      ...previousState,
      [key]: !previousState[key],
    }));
  };

  return (
    <div>
      <div style={{ height: 500, width: "100%" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="price">
              <Label dx={-20} value="Price" angle={-90} position="insideLeft" />
            </YAxis>
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="listingPrice"
              stroke="#8884d8"
              yAxisId="price"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="text-center">
        <button
          className={
            displayedChartData.listingPrice ? activeBtnCSS : nonActiveBtnCSS
          }
          onClick={() => handleChartButtonClick("listingPrice")}
        >
          Listing Price
        </button>
        <button
          className={
            displayedChartData.totalListings ? activeBtnCSS : nonActiveBtnCSS
          }
          onClick={() => handleChartButtonClick("totalListings")}
        >
          Total Listing
        </button>
        <button
          className={
            displayedChartData.activeListings ? activeBtnCSS : nonActiveBtnCSS
          }
          onClick={() => handleChartButtonClick("activeListings")}
        >
          Active Listings
        </button>
        <button
          className={
            displayedChartData.newListings ? activeBtnCSS : nonActiveBtnCSS
          }
          onClick={() => handleChartButtonClick("newListings")}
        >
          New Listings
        </button>
        <button
          className={
            displayedChartData.priceReduced ? activeBtnCSS : nonActiveBtnCSS
          }
          onClick={() => handleChartButtonClick("priceReduced")}
        >
          Price Reduced
        </button>
        <button
          className={
            displayedChartData.daysOnMarket ? activeBtnCSS : nonActiveBtnCSS
          }
          onClick={() => handleChartButtonClick("daysOnMarket")}
        >
          Days on Market
        </button>
        <button
          className={
            displayedChartData.squareFeet ? activeBtnCSS : nonActiveBtnCSS
          }
          onClick={() => handleChartButtonClick("squareFeet")}
        >
          Square Feet
        </button>
      </div>
    </div>
  );
};

export default MonthlyInventoryChart;
