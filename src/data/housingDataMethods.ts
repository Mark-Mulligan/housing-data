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
  const activeListingCountData: number[] = [];
  const daysOnMarketData: number[] = [];
  const newListingCountData: number[] = [];
  const priceReducedCountData: number[] = [];
  const squareFeetData: number[] = [];
  const totalListingCountData: number[] = [];

  /* 
    Last Index of Data contains a note, first index of data contains columns titles so ignore these.
    Data must be reformatted to start with the earliest dates, thus the backwards for loop
  */
  for (let i = housingData.length - 2; i > 0; i--) {
    let dataPoint = housingData[i];
    if (dataPoint) {
      dateData.push(formatMonthlyDate(dataPoint[0]));
      listingPriceData.push(Number(dataPoint[2]));
      activeListingCountData.push(Number(dataPoint[5]));
      daysOnMarketData.push(Number(dataPoint[8]));
      newListingCountData.push(Number(dataPoint[11]));
      priceReducedCountData.push(Number(dataPoint[17]));
      squareFeetData.push(Number(dataPoint[23]));
      totalListingCountData.push(Number(dataPoint[32]));
    }
  }

  return {
    dateData,
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
