// Custom Types
import {
  MonthlyHousingInventoryDataPoint,
  PercentBarDataPoint,
} from "../customTypes";

const decimalToPercent = (numStr: string) => {
  let result = Number(numStr) * 100;
  return Number(result.toFixed(2));
};

const formatMonthlyDate = (date: string) => {
  let year = date.slice(0, 4);
  let month = date.slice(4);
  return `${month}/${year}`;
};

const addPercentBarDataPoint = (
  date: string,
  percentDataPoint: string,
  dataArr: PercentBarDataPoint[]
) => {
  if (percentDataPoint !== "") {
    dataArr.push({ date, data: decimalToPercent(percentDataPoint) });
  }
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
  const priceReducedChangeMM: PercentBarDataPoint[] = [];
  const priceReducedChangeYY: PercentBarDataPoint[] = [];
  const daysOnMarketChangeMM: PercentBarDataPoint[] = [];
  const daysOnMarketChangeYY: PercentBarDataPoint[] = [];

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
      daysOnMarketData.push(Number(dataPoint[8]));
      newListingCountData.push(Number(dataPoint[11]));
      priceReducedCountData.push(Number(dataPoint[17]));
      squareFeetData.push(Number(dataPoint[26]));
      totalListingCountData.push(Number(dataPoint[32]));

      // There is not data for this point on the earlier months
      addPercentBarDataPoint(date, dataPoint[3], listingPriceChangeMM);
      addPercentBarDataPoint(date, dataPoint[4], listingPriceChangeYY);
      addPercentBarDataPoint(date, dataPoint[33], totalListingsChangeMM);
      addPercentBarDataPoint(date, dataPoint[34], totalListingsChangeYY);
      addPercentBarDataPoint(date, dataPoint[18], priceReducedChangeMM);
      addPercentBarDataPoint(date, dataPoint[19], priceReducedChangeYY);
      addPercentBarDataPoint(date, dataPoint[9], daysOnMarketChangeMM);
      addPercentBarDataPoint(date, dataPoint[10], daysOnMarketChangeYY);
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
    priceReducedChangeMM,
    priceReducedChangeYY,
    daysOnMarketChangeMM,
    daysOnMarketChangeYY,
  };
};
