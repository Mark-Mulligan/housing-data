// Next
import type { NextApiRequest, NextApiResponse } from "next";

// axios
import axios from "axios";

// csv-parse
import { parse } from "csv-parse/sync";

// Custom Types
import { PercentBarDataPoint, StateData } from "../../../../customTypes";

// Utils
import { addPercentBarDataPoint } from "../../../../data/housingDataMethods";

const formatMonthlyDate = (date: string) => {
  let year = date.slice(0, 4);
  let month = date.slice(4);
  return `${month}/${year}`;
};

type Data = {
  dateData: string[];
  stateData: string[];
  listingPriceData: number[];
  daysOnMarketData: number[];
  newListingCountData: number[];
  priceReducedCountData: number[];
  squareFeetData: number[];
  totalListingCountData: number[];
};

type Error = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StateData | Error>
) {
  const { stateId } = req.query;

  if (!stateId) {
    res.status(400).json({ message: "bad request" });
    return;
  }

  try {
    const { data } = await axios.get(
      "https://econdata.s3-us-west-2.amazonaws.com/Reports/Core/RDC_Inventory_Core_Metrics_State_History.csv"
    );
    const formattedData = parse(data);

    const dateData: string[] = [];
    const stateData: string[] = [];
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
    const newListingsChangeMM: PercentBarDataPoint[] = [];
    const newListingsChangeYY: PercentBarDataPoint[] = [];
    const priceReducedChangeMM: PercentBarDataPoint[] = [];
    const priceReducedChangeYY: PercentBarDataPoint[] = [];
    const daysOnMarketChangeMM: PercentBarDataPoint[] = [];
    const daysOnMarketChangeYY: PercentBarDataPoint[] = [];
    const squareFeetChangeMM: PercentBarDataPoint[] = [];
    const squareFeetChangeYY: PercentBarDataPoint[] = [];

    for (let i = formattedData.length - 2; i > 0; i--) {
      if (formattedData[i][2].toLowerCase() === stateId) {
        let dataPoint = formattedData[i];
        let date = formatMonthlyDate(dataPoint[0]);
        dateData.push(date);
        stateData.push(dataPoint[1]);
        listingPriceData.push(Number(dataPoint[3]));
        daysOnMarketData.push(Number(dataPoint[9]));
        newListingCountData.push(Number(dataPoint[12]));
        priceReducedCountData.push(Number(dataPoint[18]));
        squareFeetData.push(Number(dataPoint[27]));
        totalListingCountData.push(Number(dataPoint[33]));
        addPercentBarDataPoint(date, dataPoint[4], listingPriceChangeMM);
        addPercentBarDataPoint(date, dataPoint[5], listingPriceChangeYY);
        addPercentBarDataPoint(date, dataPoint[34], totalListingsChangeMM);
        addPercentBarDataPoint(date, dataPoint[35], totalListingsChangeYY);
        addPercentBarDataPoint(date, dataPoint[13], newListingsChangeMM);
        addPercentBarDataPoint(date, dataPoint[14], newListingsChangeYY);
        addPercentBarDataPoint(date, dataPoint[19], priceReducedChangeMM);
        addPercentBarDataPoint(date, dataPoint[20], priceReducedChangeYY);
        addPercentBarDataPoint(date, dataPoint[10], daysOnMarketChangeMM);
        addPercentBarDataPoint(date, dataPoint[11], daysOnMarketChangeYY);
        addPercentBarDataPoint(date, dataPoint[28], squareFeetChangeMM);
        addPercentBarDataPoint(date, dataPoint[29], squareFeetChangeYY);
      }
    }

    const result = {
      monthlyInventoryLineData: {
        dateData,
        listingPriceData,
        totalListingCountData,
        newListingCountData,
        priceReducedCountData,
        daysOnMarketData,
        squareFeetData,
      },
      listingPriceChangeMM,
      listingPriceChangeYY,
      totalListingsChangeMM,
      totalListingsChangeYY,
      newListingsChangeMM,
      newListingsChangeYY,
      priceReducedChangeMM,
      priceReducedChangeYY,
      daysOnMarketChangeMM,
      daysOnMarketChangeYY,
      squareFeetChangeMM,
      squareFeetChangeYY,
    };
    res.status(200).json(result);
    //console.log(formattedData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Unable to fetch data." });
  }
}
