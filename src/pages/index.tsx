// Next
import type { NextPage } from "next";
import Head from "next/head";

// Data
import { formatMonthlyInventoryData } from "../data/housingDataMethods";
import { monthlyHousingInventory } from "../data/housingData";

// Components
import MonthlyInventoryChart2 from "../components/charts/MonthlyInventoryChart2";

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
        <h1 className="text-center text-5xl font-extrabold leading-normal text-gray-700 md:text-[5rem]">
          US Housing Data
        </h1>
        <MonthlyInventoryChart2 monthlyData={monthlyData} />
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
