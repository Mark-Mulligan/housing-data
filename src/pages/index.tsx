// Next
import type { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";

// axios
import axios from "axios";

// csv-parse
import { parse } from "csv-parse/sync";

// Data
import { formatMonthlyInventoryData } from "../data/housingDataMethods";

// Components
import MonthlyInventoryChart from "../components/charts/MonthlyInventoryChart";
const PercentBarChart = dynamic(
  import("../components/charts/PercentBarChart"),
  { ssr: false }
);
// import PercentBarChart from "../components/charts/PercentBarChart";

// Types
import { PercentBarDataPoint } from "../customTypes";

interface IProps {
  monthlyInventoryLineChart: {
    dateData: string[];
    listingPriceData: number[];
    daysOnMarketData: number[];
    newListingCountData: number[];
    priceIncreasedCountData: number[];
    priceReducedCountData: number[];
    squareFeetData: number[];
    totalListingCountData: number[];
  };
  listingPriceChangeMM: PercentBarDataPoint[];
  listingPriceChangeYY: PercentBarDataPoint[];
  totalListingsChangeMM: PercentBarDataPoint[];
  totalListingsChangeYY: PercentBarDataPoint[];
}

const Home: NextPage<IProps> = ({
  monthlyInventoryLineChart,
  listingPriceChangeMM,
  listingPriceChangeYY,
  totalListingsChangeMM,
  totalListingsChangeYY,
}) => {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto min-h-screen p-4">
        <h1 className="text-center text-5xl font-extrabold leading-normal text-white md:text-[5rem]">
          US Housing Data
        </h1>
        <section className="mb-16">
          <h2 className="mb-2 text-center text-2xl text-white">
            Monthly Inventory Data - US
          </h2>
          <MonthlyInventoryChart monthlyData={monthlyInventoryLineChart} />
        </section>
        <section className="grid grid-cols-2">
          <PercentBarChart
            containerClasses="mb-12"
            chartData={listingPriceChangeMM}
            title="Median List Price Change M/M"
            barName="List Price Change M/M"
            barColor="#34d399"
          />
          <PercentBarChart
            containerClasses="mb-12"
            chartData={listingPriceChangeYY}
            title="Median List Price Change Y/Y"
            barName="List Price Change Y/Y"
            barColor="#34d399"
          />
          <PercentBarChart
            containerClasses="mb-12"
            chartData={totalListingsChangeMM}
            title="Total Listings Change M/M"
            barName="Total Listings Change M/M"
            barColor="#22d3ee"
          />
          <PercentBarChart
            containerClasses="mb-12"
            chartData={totalListingsChangeYY}
            title="Total Listings Change Y/Y"
            barName="Total Listings Change Y/Y"
            barColor="#22d3ee"
          />
        </section>
      </main>
    </>
  );
};

export default Home;

export const getStaticProps = async () => {
  const { data } = await axios.get(
    "https://econdata.s3-us-west-2.amazonaws.com/Reports/Core/RDC_Inventory_Core_Metrics_Country_History.csv"
  );
  const formattedData = parse(data);
  const {
    monthlyInventoryLineChart,
    listingPriceChangeMM,
    listingPriceChangeYY,
    totalListingsChangeMM,
    totalListingsChangeYY,
  } = formatMonthlyInventoryData(formattedData);

  return {
    props: {
      monthlyInventoryLineChart,
      listingPriceChangeMM,
      listingPriceChangeYY,
      totalListingsChangeMM,
      totalListingsChangeYY,
    },
  };
};
