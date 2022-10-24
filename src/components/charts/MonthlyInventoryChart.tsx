// React
import { FC, useState } from "react";

// Highcharts
import React from "react";
import Highcharts, { chart } from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import HighchartsExporting from "highcharts/modules/exporting";

// if (typeof Highcharts === "object") {
//   console.log("highcharts", Highcharts);
//   HighchartsExporting(Highcharts);
// }

interface IProps {
  data: {
    listingPriceData: number[][];
    activeListingCountData: number[][];
    daysOnMarketData: number[][];
    newListingCountData: number[][];
    priceReducedCountData: number[][];
    squareFeetData: number[][];
    totalListingCountData: number[][];
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

const MonthlyInventoryChart: FC<IProps> = ({ data }) => {
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

  const generateSeries = () => {
    const series = [];

    series.push({
      name: "Listing Price",
      yAxis: 0,
      data: data.listingPriceData,
      showInNavigator: true,
      tooltip: { valueSuffix: " $" },
    });

    series.push({
      name: "Active Listings",
      yAxis: 1,
      data: data.activeListingCountData,
      showInNavigator: true,
    });

    series.push({
      name: "Days on Market",
      yAxis: 2,
      data: data.daysOnMarketData,
      showInNavigator: true,
    });

    series.push({
      name: "New Listings",
      yAxis: 1,
      data: data.newListingCountData,
      showInNavigator: true,
    });

    series.push({
      name: "Price Reduced",
      yAxis: 1,
      data: data.priceReducedCountData,
      showInNavigator: true,
    });

    series.push({
      name: "Square FT",
      yAxis: 3,
      data: data.squareFeetData,
      showInNavigator: true,
    });
    series.push({
      name: "Total Listings",
      yAxis: 1,
      data: data.totalListingCountData,
      showInNavigator: true,
    });

    return series;
  };

  const generateWeeklyInventoryChartOptions = () => {
    return {
      title: {
        text: "Housing Inventory Data",
      },
      legend: {
        align: "left",
        verticalAlign: "top",
      },
      yAxis: [
        {
          opposite: false,
          labels: {
            format: "{value} $",
          },
          title: {
            text: "Price $",
          },
        },
        {
          title: {
            text: "Listings",
          },
          labels: {
            format: "{value}",
          },
        },
        {
          title: {
            text: "Days",
          },
          labels: {
            format: "{value}",
          },
        },
        {
          opposite: false,
          title: {
            text: "Square Feet",
          },
          labels: {
            format: "{value}",
          },
        },
      ],

      xAxis: {
        accessibility: {
          rangeDescription: "Range: 2010 to 2020",
        },
      },

      series: generateSeries(),

      rangeSelector: {
        selected: 1,
      },

      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              legend: {
                layout: "horizontal",
                align: "center",
                verticalAlign: "bottom",
              },
            },
          },
        ],
      },
      tooltip: {
        shared: true,
      },
    };
  };

  return (
    <div>
      <div style={{ height: 500 }}>
        <HighchartsReact
          highcharts={Highcharts}
          constructorType={"stockChart"}
          containerProps={{ style: { height: "100%" } }}
          options={generateWeeklyInventoryChartOptions()}
        />
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
