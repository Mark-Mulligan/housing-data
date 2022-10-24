// React
import { FC } from "react";

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
    priceIncreasedCountData: number[][];
    priceReducedCountData: number[][];
  };
}

const MonthlyInventoryChart: FC<IProps> = ({ data }) => {
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
      name: "Price Increased",
      yAxis: 1,
      data: data.priceIncreasedCountData,
      showInNavigator: true,
    });
    series.push({
      name: "Price Reduced",
      yAxis: 1,
      data: data.priceReducedCountData,
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
    <div style={{ height: 500 }}>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"stockChart"}
        containerProps={{ style: { height: "100%" } }}
        options={generateWeeklyInventoryChartOptions()}
      />
    </div>
  );
};

export default MonthlyInventoryChart;
