// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

// axios
import axios from "axios";

// csv-parse
import { parse } from "csv-parse/sync";

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
  res: NextApiResponse<Data | Error>
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

    for (let i = formattedData.length - 2; i > 0; i--) {
      if (formattedData[i][2].toLowerCase() === stateId) {
        let dataPoint = formattedData[i];
        dateData.push(formatMonthlyDate(dataPoint[0]));
        stateData.push(dataPoint[1]);
        listingPriceData.push(Number(dataPoint[3]));
        daysOnMarketData.push(Number(dataPoint[9]));
        newListingCountData.push(Number(dataPoint[12]));
        priceReducedCountData.push(Number(dataPoint[18]));
        squareFeetData.push(Number(dataPoint[27]));
        totalListingCountData.push(Number(dataPoint[33]));
      }
    }

    const result = {
      dateData,
      stateData,
      listingPriceData,
      daysOnMarketData,
      newListingCountData,
      priceReducedCountData,
      squareFeetData,
      totalListingCountData,
    };
    res.status(200).json(result);
    //console.log(formattedData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Unable to fetch data." });
  }
}
