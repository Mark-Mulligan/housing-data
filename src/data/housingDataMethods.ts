// Custom Types
import {
  MonthlyHousingInventoryDataPoint,
  PercentBarDataPoint,
} from "../customTypes";

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

const getDateFromMonthlyData = (date: string) => {
  let year = Number(date.slice(0, 4));
  let month = Number(date.slice(4)) - 1;
  let dateObj = new Date(year, month, 1);
  return dateObj.getTime();
};

const decimalToPercent = (numStr: string) => {
  let result = Number(numStr) * 100;
  return Number(result.toFixed(2));
};

const dateToDataPoint = (date: string) => {
  let dateObj = new Date(date);
  return dateObj.getTime();
};

const formatMonthlyDate = (date: string) => {
  let year = date.slice(0, 4);
  let month = date.slice(4);
  return `${month}/${year}`;
};

export const formatMonthlyInventoryData = (
  housingData: MonthlyHousingInventoryDataPoint[]
) => {
  const dateData: string[] = [];
  const listingPriceData: number[] = [];
  const daysOnMarketData: number[] = [];
  const newListingCountData: number[] = [];
  const priceReducedCountData: number[] = [];
  const squareFeetData: number[] = [];
  const totalListingCountData: number[] = [];
  const listingPriceChangeMM: PercentBarDataPoint[] = [];
  const listingPriceChangeYY: PercentBarDataPoint[] = [];
  const totalListingsChangeMM: PercentBarDataPoint[] = [];
  const totalListingsChangeYY: PercentBarDataPoint[] = [];

  /* 
    Last Index of Data contains a note, first index of data contains columns titles so ignore these.
    Data must be reformatted to start with the earliest dates, thus the backwards for loop
  */
  for (let i = housingData.length - 2; i > 0; i--) {
    let dataPoint = housingData[i];

    if (dataPoint) {
      let date = formatMonthlyDate(dataPoint[0]);
      dateData.push(date);
      listingPriceData.push(Number(dataPoint[2]));

      // There is not data for this point on the earlier months
      if (dataPoint[3] !== "") {
        listingPriceChangeMM.push({
          date,
          data: decimalToPercent(dataPoint[3]),
        });
      }

      if (dataPoint[4] !== "") {
        listingPriceChangeYY.push({
          date,
          data: decimalToPercent(dataPoint[4]),
        });
      }

      daysOnMarketData.push(Number(dataPoint[8]));
      newListingCountData.push(Number(dataPoint[11]));
      priceReducedCountData.push(Number(dataPoint[17]));
      squareFeetData.push(Number(dataPoint[26]));
      totalListingCountData.push(Number(dataPoint[32]));

      if (dataPoint[33] !== "") {
        totalListingsChangeMM.push({
          date,
          data: decimalToPercent(dataPoint[33]),
        });
      }
      if (dataPoint[34] !== "") {
        totalListingsChangeYY.push({
          date,
          data: decimalToPercent(dataPoint[34]),
        });
      }
    }
  }

  return {
    monthlyInventoryLineChart: {
      dateData,
      listingPriceData,
      daysOnMarketData,
      newListingCountData,
      priceReducedCountData,
      squareFeetData,
      totalListingCountData,
    },
    listingPriceChangeMM,
    listingPriceChangeYY,
    totalListingsChangeMM,
    totalListingsChangeYY,
  };
};

export const formatInventoryData = (
  housingInventory: housingInventoryDataPoint[]
) => {
  const medianListingPriceYY: number[][] = [];
  const medianListingCountYY: number[][] = [];
  const medianDaysOnMarketByDay: number[][] = [];
  const medianDaysOnMarketAsPct: number[][] = [];

  for (let i = housingInventory.length - 1; i > 0; i--) {
    let dataPoint = housingInventory[i];
    if (dataPoint) {
      let date = dateToDataPoint(dataPoint[0]);
      let listingPriceChangeYY = percentToDataPoint(dataPoint[2]);
      let listingCountChangeYY = percentToDataPoint(dataPoint[3]);
      let daysOnMarketByDay = Number(dataPoint[4]);
      let daysOnMarketAsPct = percentToDataPoint(dataPoint[5]);

      medianListingPriceYY.push([date, listingPriceChangeYY]);
      medianListingCountYY.push([date, listingCountChangeYY]);
      medianDaysOnMarketByDay.push([date, daysOnMarketByDay]);
      medianDaysOnMarketAsPct.push([date, daysOnMarketAsPct]);
    }
  }

  return {
    medianListingPriceYY,
    medianListingCountYY,
    medianDaysOnMarketByDay,
    medianDaysOnMarketAsPct,
  };
};
