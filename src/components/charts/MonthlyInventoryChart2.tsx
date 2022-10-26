// React
import { list } from "postcss";
import React, { useState, FC, useEffect } from "react";

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

interface MonthlyData {
  dateData: string[];
  listingPriceData: number[];
  daysOnMarketData: number[];
  newListingCountData: number[];
  priceReducedCountData: number[];
  squareFeetData: number[];
  totalListingCountData: number[];
}

interface IProps {
  monthlyData: {
    dateData: string[];
    listingPriceData: number[];
    daysOnMarketData: number[];
    newListingCountData: number[];
    priceReducedCountData: number[];
    squareFeetData: number[];
    totalListingCountData: number[];
  };
}

interface DisplayedChartData {
  listingPrice: boolean;
  totalListings: boolean;
  newListings: boolean;
  priceReduced: boolean;
  daysOnMarket: boolean;
  squareFeet: boolean;
}

interface MonthlyInventoryChartDataPoint {
  name: string; // date
  listingPrice?: number;
  totalListings?: number;
  newListings?: number;
  priceReduced?: number;
  daysOnMarket?: number;
  squareFeet?: number;
}

const activeBtnCSS =
  "text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2";
const nonActiveBtnCSS =
  "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2";

const MonthlyInventoryChart: FC<IProps> = ({ monthlyData }) => {
  const [chartData, setChartData] = useState<MonthlyInventoryChartDataPoint[]>(
    []
  );

  const [displayedChartData, setDisplayedChartData] =
    useState<DisplayedChartData>({
      listingPrice: true,
      totalListings: false,
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

  const hideListingsYAxis = () => {
    if (
      displayedChartData.totalListings ||
      displayedChartData.newListings ||
      displayedChartData.priceReduced
    ) {
      return false;
    }

    return true;
  };

  const updateChartData = () => {
    const {
      dateData,
      listingPriceData,
      totalListingCountData,
      newListingCountData,
      priceReducedCountData,
      daysOnMarketData,
      squareFeetData,
    } = monthlyData;
    const result: MonthlyInventoryChartDataPoint[] = [];

    for (let i = 0; i < dateData.length; i++) {
      const dataPoint: MonthlyInventoryChartDataPoint = {
        name: dateData[i] || "",
      };

      if (displayedChartData.listingPrice)
        dataPoint.listingPrice = listingPriceData[i];
      if (displayedChartData.totalListings)
        dataPoint.totalListings = totalListingCountData[i];
      if (displayedChartData.newListings)
        dataPoint.newListings = newListingCountData[i];
      if (displayedChartData.priceReduced)
        dataPoint.priceReduced = priceReducedCountData[i];
      if (displayedChartData.daysOnMarket)
        dataPoint.daysOnMarket = daysOnMarketData[i];
      if (displayedChartData.squareFeet)
        dataPoint.squareFeet = squareFeetData[i];

      result.push(dataPoint);
    }

    console.log(result);
    setChartData(result);
  };

  useEffect(() => {
    updateChartData();
  }, [displayedChartData]);

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

            <YAxis
              yAxisId="price"
              unit="$"
              hide={!displayedChartData.listingPrice}
              width={75}
              domain={["auto", "auto"]}
            />

            <YAxis yAxisId="listings" hide={hideListingsYAxis()} />

            <YAxis
              yAxisId="feet"
              unit="ft"
              orientation="right"
              hide={!displayedChartData.squareFeet}
            />

            <YAxis
              yAxisId="days"
              orientation="right"
              unit="days"
              hide={!displayedChartData.daysOnMarket}
            />

            <Tooltip />
            <Legend />
            {displayedChartData.listingPrice && (
              <Line
                type="monotone"
                dataKey="listingPrice"
                stroke="#5ad45a"
                yAxisId="price"
                dot={false}
              />
            )}
            {displayedChartData.totalListings && (
              <Line
                type="monotone"
                dataKey="totalListings"
                stroke="#7c1158"
                yAxisId="listings"
                dot={false}
              />
            )}
            {displayedChartData.newListings && (
              <Line
                type="monotone"
                dataKey="newListings"
                stroke="#8884d8"
                yAxisId="listings"
                dot={false}
              />
            )}
            {displayedChartData.priceReduced && (
              <Line
                type="monotone"
                dataKey="priceReduced"
                stroke="#0d88e6"
                yAxisId="listings"
                dot={false}
              />
            )}
            {displayedChartData.daysOnMarket && (
              <Line
                type="monotone"
                dataKey="daysOnMarket"
                stroke="#ebdc78"
                yAxisId="days"
                dot={false}
              />
            )}
            {displayedChartData.squareFeet && (
              <Line
                type="monotone"
                dataKey="squareFeet"
                stroke="#00b7c7"
                yAxisId="feet"
                dot={false}
              />
            )}
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
