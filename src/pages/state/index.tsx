// React
import { useEffect, useState } from "react";

// Next
import { useRouter } from "next/router";

// Axios
import axios from "axios";

// Custom Types
import { MonthlyData } from "../../customTypes/";

// Components
import USMap from "../../components/charts/USMap";
import MonthlyInventoryChart from "../../components/charts/MonthlyInventoryChart";

const StatePage = () => {
  const router = useRouter();
  const [chartData, setChartData] = useState<MonthlyData | null>(null);

  const getStateData = async (stateId: string) => {
    try {
      const { data } = await axios.get(
        `/api/data/monthly-inventory/${stateId}`
      );
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const updateChartData = async (stateId: string) => {
    try {
      const stateMonthlyData = await getStateData(stateId);
      setChartData(stateMonthlyData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (router.query.id && typeof router.query.id === "string") {
      updateChartData(router.query.id);
    }
  }, [router.query]);

  return (
    <main className="relative mt-4">
      <div className="absolute w-full text-center">
        <h2 className="text-4xl text-white">Data By State</h2>
      </div>

      <div style={{ maxWidth: 900, margin: "auto" }}>
        <USMap />
      </div>
      {chartData && (
        <section className="mb-4">
          <h2 className="mb-2 text-center text-2xl text-white">
            Monthly Inventory Data - {router.query.id}
          </h2>
          <MonthlyInventoryChart monthlyData={chartData} />
        </section>
      )}
    </main>
  );
};

export default StatePage;
