// Next
import type { NextPage } from "next";
import Head from "next/head";

// Data
import { formatMonthlyInventoryData } from "../data/housingDataMethods";
import { monthlyHousingInventory } from "../data/housingData";

// Components
import MonthlyInventoryChart from "../components/charts/MonthlyInventoryChart";
import USMap from "../components/charts/USMap";

interface IProps {
  monthlyData: {
    dateData: string[];
    listingPriceData: number[];
    daysOnMarketData: number[];
    newListingCountData: number[];
    priceIncreasedCountData: number[];
    priceReducedCountData: number[];
    squareFeetData: number[];
    totalListingCountData: number[];
  };
}

const Home: NextPage<IProps> = ({ monthlyData }) => {
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
        <h2 className="mb-2 text-center text-2xl text-white">
          Monthly Inventory Data - US
        </h2>
        <MonthlyInventoryChart monthlyData={monthlyData} />
        <USMap />
      </main>
    </>
  );
};

export default Home;

export const getStaticProps = async () => {
  const monthlyData = formatMonthlyInventoryData(monthlyHousingInventory);

  return {
    props: {
      monthlyData,
    },
  };
};
