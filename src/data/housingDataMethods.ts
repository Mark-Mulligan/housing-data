// Custom Types
import { MonthlyHousingInventoryDataPoint } from "../customTypes";

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

const dateToDataPoint = (date: string) => {
  let dateObj = new Date(date);
  return dateObj.getTime();
};

export const formatMonthlyInventoryData = (
  housingData: MonthlyHousingInventoryDataPoint[]
) => {
  const listingPriceData: number[][] = [];
  const activeListingCountData: number[][] = [];
  const daysOnMarketData: number[][] = [];
  const newListingCountData: number[][] = [];
  const priceReducedCountData: number[][] = [];
  const squareFeetData: number[][] = [];
  const totalListingCountData: number[][] = [];

  /* 
    Last Index of Data contains a note, first index of data contains columns titles so ignore these.
    Data must be reformatted to start with the earliest dates, thus the backwards for loop
  */
  for (let i = housingData.length - 2; i > 0; i--) {
    let dataPoint = housingData[i];
    if (dataPoint) {
      let date = getDateFromMonthlyData(dataPoint[0]);

      listingPriceData.push([date, Number(dataPoint[2])]);
      activeListingCountData.push([date, Number(dataPoint[5])]);
      daysOnMarketData.push([date, Number(dataPoint[8])]);
      newListingCountData.push([date, Number(dataPoint[11])]);
      priceReducedCountData.push([date, Number(dataPoint[17])]);
      squareFeetData.push([date, Number(dataPoint[23])]);
      totalListingCountData.push([date, Number(dataPoint[32])]);
    }
  }

  return {
    listingPriceData,
    activeListingCountData,
    daysOnMarketData,
    newListingCountData,
    priceReducedCountData,
    squareFeetData,
    totalListingCountData,
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
