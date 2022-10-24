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
