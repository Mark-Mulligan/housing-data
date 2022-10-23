import { housingInventory } from "./housingData";

const percentToDataPoint = (percent: string) => {
  return Number(percent.slice(0, percent.length - 1));
};

const dateToDataPoint = (date: string) => {
  let dateObj = new Date(date);
  return dateObj.getTime();
};

export const getMedianListingPriceYYData = () => {
  let result: number[][] = [];

  housingInventory.forEach((dataPoint, index) => {
    if (index > 0) {
      result.push([
        dateToDataPoint(dataPoint[0]),
        percentToDataPoint(dataPoint[2]),
      ]);
    }
  });

  return result;
};
