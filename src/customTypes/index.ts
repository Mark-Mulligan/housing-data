export interface MonthlyInventoryChartDataPoint {
  name: string; // date
  listingPrice?: number;
  totalListings?: number;
  newListings?: number;
  priceReduced?: number;
  daysOnMarket?: number;
  squareFeet?: number;
}

export interface MonthlyData {
  dateData: string[];
  listingPriceData: number[];
  daysOnMarketData: number[];
  newListingCountData: number[];
  priceReducedCountData: number[];
  squareFeetData: number[];
  totalListingCountData: number[];
}

export type MonthlyHousingInventoryDataPoint = [
  string, // "month_date_yyyymm" -- 0,
  string, // "country" -- 1,
  string, // "median_listing_price" -- 2,
  string, // "median_listing_price_mm" -- 3,
  string, // "median_listing_price_yy" -- 4,
  string, // "active_listing_count" -- 5,
  string, // "active_listing_count_mm" -- 6,
  string, // "active_listing_count_yy" -- 7,
  string, // "median_days_on_market" -- 8,
  string, // "median_days_on_market_mm" -- 9,
  string, // "median_days_on_market_yy" -- 10,
  string, // "new_listing_count" -- 11,
  string, // "new_listing_count_mm" -- 12,
  string, // "new_listing_count_yy" -- 13,
  string, // "price_increased_count" -- 14,
  string, // "price_increased_count_mm" -- 15,
  string, // "price_increased_count_yy -- 16",
  string, // "price_reduced_count -- 17",
  string, // "price_reduced_count_mm --18",
  string, // "price_reduced_count_yy -- 19",
  string, // "pending_listing_count -- 20",
  string, // "pending_listing_count_mm -- 21",
  string, // "pending_listing_count_yy -- 22",
  string, // "median_listing_price_per_square_foot --23",
  string, // "median_listing_price_per_square_foot_mm -- 24",
  string, // "median_listing_price_per_square_foot_yy -- 25",
  string, // "median_square_feet --26",
  string, // "median_square_feet_mm -- 27",
  string, // "median_square_feet_yy -- 28",
  string, // "average_listing_price -- 29",
  string, // "average_listing_price_mm -- 30",
  string, // "average_listing_price_yy -- 31",
  string, // "total_listing_count -- 32",
  string, // "total_listing_count_mm -- 33",
  string, // "total_listing_count_yy -- 34",
  string, // "pending_ratio -- 35",
  string, // "pending_ratio_mm",
  string, // "pending_ratio_yy",
  string // "quality_flag"
];
