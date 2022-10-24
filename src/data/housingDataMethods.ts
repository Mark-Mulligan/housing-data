import { housingInventory } from "./housingData";

type housingInventoryDataPoint = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
];

const percentToDataPoint = (percent: string) => {
  return Number(percent.slice(0, percent.length - 1));
};

const dateToDataPoint = (date: string) => {
  let dateObj = new Date(date);
  return dateObj.getTime();
};

export const getMedianListingPriceYYData = () => {
  let result: number[][] = [];

  const housingInventoryReversed: housingInventoryDataPoint[] = [];

  for (let i = housingInventory.length - 1; i > 0; i--) {
    let dataPoint = housingInventory[i];
    if (dataPoint) {
      housingInventoryReversed.push(dataPoint);
    }
  }

  housingInventoryReversed.forEach((dataPoint: any, index: number) => {
    if (index > 0) {
      result.push([
        dateToDataPoint(dataPoint[0]),
        percentToDataPoint(dataPoint[2]),
      ]);
    }
  });

  return result;
};

export const createChartData = (data: number[][]) => {
  return {
    title: {
      text: "My stock chart",
    },
    yAxis: {
      title: {
        text: "%",
      },
    },

    xAxis: {
      accessibility: {
        rangeDescription: "Range: 2010 to 2020",
      },
    },

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

    series: [
      {
        name: "Median Listing Price (Y/Y)",
        data: getMedianListingPriceYYData(),
      },
    ],
  };
};
