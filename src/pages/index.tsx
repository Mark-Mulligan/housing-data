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
const ChangeOverTimeChart = dynamic(
  import("../components/charts/ChangeOverTimeChart"),
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
  newListingsChangeMM: PercentBarDataPoint[];
  newListingsChangeYY: PercentBarDataPoint[];
  priceReducedChangeMM: PercentBarDataPoint[];
  priceReducedChangeYY: PercentBarDataPoint[];
  daysOnMarketChangeMM: PercentBarDataPoint[];
  daysOnMarketChangeYY: PercentBarDataPoint[];
  squareFeetChangeMM: PercentBarDataPoint[];
  squareFeetChangeYY: PercentBarDataPoint[];
}

const Home: NextPage<IProps> = ({
  monthlyInventoryLineChart,
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
}) => {
  return (
    <>
      <Head>
        <title>US Housing Market - National Data</title>
        <meta
          name="description"
          content="Data and charts showing different United States Housing Market metrics."
        />
        <link rel="icon" href="/logo.ico" />
      </Head>

      <main className="dark container mx-auto min-h-screen px-2 sm:px-4">
        <h1 className="mt-16 mb-4 text-center text-4xl font-extrabold leading-normal text-white md:text-[5rem]">
          US Housing Data
        </h1>
        <section className="mb-16">
          <h2 className="mb-4 text-center text-3xl text-white">
            Monthly Inventory Data
          </h2>
          <p className="m-auto mb-6 max-w-xl text-center text-slate-400">
            The data below shows the values for different housing metrics in the
            United States. Click on the buttons below to view different metrics
            in the chart. Data is provided by{" "}
            <a
              href="https://www.realtor.com/research/data/"
              target="_blank"
              rel="noreferrer"
              className="text-white"
            >
              relator.com
            </a>
          </p>
          <MonthlyInventoryChart monthlyData={monthlyInventoryLineChart} />
        </section>
        <section>
          <h2 className="mb-4 text-center text-3xl text-white">
            Trends Over Time
          </h2>
          <p className="m-auto mb-6 max-w-xl text-center text-slate-400">
            The data in this section shows the rate of change of different
            housing metrics over time. These metrics can be view on a year over
            year basis or month over month basis. Values are represented as
            percents (ex. Listing prices may be 10% higher this month on a year
            over year basis). Data is provided by{" "}
            <a
              href="https://www.realtor.com/research/data/"
              target="_blank"
              rel="noreferrer"
              className="text-white"
            >
              relator.com
            </a>
          </p>
          <ul className="grid grid-cols-1 lg:grid-cols-2 ">
            <li>
              <ChangeOverTimeChart
                chartContainerClasses="mb-8 lg:h-[450px] h-[400px]"
                title="Median List Price Change"
                chart1Data={listingPriceChangeYY}
                chart2Data={listingPriceChangeMM}
                bar1Color="#34d399"
                bar1Name="Median List Price Change Y/Y"
                bar2Color="#34d399"
                bar2Name="Median List Price Change M/M"
              />
            </li>
            <li>
              <ChangeOverTimeChart
                chartContainerClasses="mb-8 lg:h-[450px] h-[400px]"
                title="Total Listings Change"
                chart1Data={totalListingsChangeYY}
                chart2Data={totalListingsChangeMM}
                bar1Color="#22d3ee"
                bar1Name="Total Listings Change Y/Y"
                bar2Color="#22d3ee"
                bar2Name="Total Listings Change M/M"
              />
            </li>
            <li>
              <ChangeOverTimeChart
                chartContainerClasses="mb-8 lg:h-[450px] h-[400px]"
                title="New Listings Change"
                chart1Data={newListingsChangeYY}
                chart2Data={newListingsChangeMM}
                bar1Color="#60a5fa"
                bar1Name="New Listings Change Y/Y"
                bar2Color="#60a5fa"
                bar2Name="New Listings Change M/M"
              />
            </li>
            <li>
              <ChangeOverTimeChart
                chartContainerClasses="mb-8 lg:h-[450px] h-[400px]"
                title="Price Reduced Change"
                chart1Data={priceReducedChangeYY}
                chart2Data={priceReducedChangeMM}
                bar1Color="#a78bfa"
                bar1Name="Price Reduced Change Y/Y"
                bar2Color="#a78bfa"
                bar2Name="Price Reduced Change M/M"
              />
            </li>
            <li>
              <ChangeOverTimeChart
                chartContainerClasses="mb-8 lg:h-[450px] h-[400px]"
                title="Days on Market Change"
                chart1Data={daysOnMarketChangeYY}
                chart2Data={daysOnMarketChangeMM}
                bar1Color="#fbbf24"
                bar1Name="Days On Market Change Y/Y"
                bar2Color="#fbbf24"
                bar2Name="Days On Market Change M/M"
              />
            </li>
            <li>
              <ChangeOverTimeChart
                chartContainerClasses="mb-8 lg:h-[450px] h-[400px]"
                title="Square Feet Change"
                chart1Data={squareFeetChangeYY}
                chart2Data={squareFeetChangeMM}
                bar1Color="#f43f5e"
                bar1Name="Square Feet Change Y/Y"
                bar2Color="#f43f5e"
                bar2Name="Square Feet Change M/M"
              />
            </li>
          </ul>
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
    newListingsChangeMM,
    newListingsChangeYY,
    priceReducedChangeMM,
    priceReducedChangeYY,
    daysOnMarketChangeMM,
    daysOnMarketChangeYY,
    squareFeetChangeMM,
    squareFeetChangeYY,
  } = formatMonthlyInventoryData(formattedData);

  return {
    props: {
      monthlyInventoryLineChart,
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
    },
    revalidate: 14400, // Every 4 hours (in seconds)
  };
};
