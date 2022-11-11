// React
import { useEffect, useState, useContext } from "react";

// Next
import { useRouter } from "next/router";
import Head from "next/head";

// Axios
import axios from "axios";

// Custom Types
import { StateData } from "../../customTypes/";

// Context
import { AppContext } from "../../context/AppContext";

// Components
import USMap from "../../components/charts/USMap";
import MonthlyInventoryChart from "../../components/charts/MonthlyInventoryChart";
import LoadingScreen from "../../components/ui/LoadingScreen";
import ChangeOverTimeChart from "../../components/charts/ChangeOverTimeChart";

// Utils
import { getStateNameFromVal } from "../../utils/USMap";
import { extractSearchString } from "../../utils/routing";

const StatePage = () => {
  const router = useRouter();
  const { setLastSearchString } = useContext(AppContext);
  const [chartData, setChartData] = useState<StateData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getStateData = async (stateId: string) => {
    try {
      const { data } = await axios.get(
        `/api/data/monthly-inventory/${stateId}`
      );
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const updateChartData = async (stateId: string) => {
      setIsLoading(true);
      try {
        const stateMonthlyData = await getStateData(stateId);
        setChartData(stateMonthlyData);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };

    if (router.query.id && typeof router.query.id === "string") {
      updateChartData(router.query.id);
      const searchString = extractSearchString(router.asPath);
      setLastSearchString(searchString);
    }
  }, [router.query, router.asPath, setLastSearchString]);

  return (
    <>
      <Head>
        <title key="tittle">
          {` US Housing Market - State Data ${
            typeof router.query.val === "string"
              ? getStateNameFromVal(router.query.val)
              : ""
          }`}
        </title>
        <meta
          name="description"
          content="Data and charts showing different housing Market metrics at the state level."
        />
        <link rel="icon" href="/logo.ico" />
      </Head>
      <div className="px-2 sm:px-4">
        <main className="container relative mx-auto pb-4">
          <div className="mt-16 w-full text-center md:absolute md:mt-24">
            <h2 className="mb-4 text-center text-3xl text-white">
              Monthly Inventory Data By State
            </h2>
            <p className="m-auto max-w-xl text-center text-slate-400">
              Click on a state in the map to view that state&apos;s data below.
            </p>
          </div>
          <div className="h-0 md:h-32" />

          <div className="m-auto mb-4 max-w-[850px]">
            <USMap />
          </div>
          {chartData && typeof router.query.val === "string" && (
            <>
              <section className="mb-16">
                <h2 className="mb-4 text-center text-3xl text-white">
                  Monthly Inventory Data -{" "}
                  {getStateNameFromVal(router.query.val)}
                </h2>
                <p className="m-auto mb-6 max-w-xl text-center text-slate-400">
                  The data below shows the values for different housing metrics
                  in the United States. Click on the buttons below to view
                  different metrics in the chart. Data is provided by{" "}
                  <a
                    href="https://www.realtor.com/research/data/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-white"
                  >
                    relator.com
                  </a>
                </p>
                <MonthlyInventoryChart
                  monthlyData={chartData.monthlyInventoryLineData}
                />
              </section>
              <section>
                <h2 className="mb-4 text-center text-3xl text-white">
                  Trends Over Time - {getStateNameFromVal(router.query.val)}
                </h2>
                <p className="m-auto mb-6 max-w-xl text-center text-slate-400">
                  The data in this section shows the rate of change of different
                  housing metrics over time. These metrics can be view on a year
                  over year basis or month over month basis. Values are
                  represented as percents (ex. Listing prices may be 10% higher
                  this month on a year over year basis). Data is provided by{" "}
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
                      chart1Data={chartData.listingPriceChangeYY}
                      chart2Data={chartData.listingPriceChangeMM}
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
                      chart1Data={chartData.totalListingsChangeYY}
                      chart2Data={chartData.totalListingsChangeMM}
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
                      chart1Data={chartData.newListingsChangeYY}
                      chart2Data={chartData.newListingsChangeMM}
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
                      chart1Data={chartData.priceReducedChangeYY}
                      chart2Data={chartData.priceReducedChangeMM}
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
                      chart1Data={chartData.daysOnMarketChangeYY}
                      chart2Data={chartData.daysOnMarketChangeMM}
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
                      chart1Data={chartData.squareFeetChangeYY}
                      chart2Data={chartData.squareFeetChangeMM}
                      bar1Color="#f43f5e"
                      bar1Name="Square Feet Change Y/Y"
                      bar2Color="#f43f5e"
                      bar2Name="Square Feet Change M/M"
                    />
                  </li>
                </ul>
              </section>
            </>
          )}
          {isLoading && <LoadingScreen loadingText="Loading State Data..." />}
        </main>
      </div>
    </>
  );
};

export default StatePage;
