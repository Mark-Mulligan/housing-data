// Custom Types
import {
  MonthlyInventoryChartDataPoint,
  MonthlyData,
  DisplayedChartData,
} from "../../../customTypes";

export const updateChartData = (
  monthlyData: MonthlyData,
  displayedChartData: DisplayedChartData
) => {
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
    if (displayedChartData.squareFeet) dataPoint.squareFeet = squareFeetData[i];

    result.push(dataPoint);
  }

  return result;
};
