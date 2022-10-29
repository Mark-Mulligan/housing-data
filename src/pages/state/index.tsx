import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import USMap from "../../components/charts/USMap";

const StatePage = () => {
  const router = useRouter();

  const getStateData = async (stateId: string) => {
    try {
      const { data } = await axios.get(
        `/api/data/monthly-inventory/${stateId}`
      );
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <main className="relative mt-4">
      <div className="absolute w-full text-center">
        <h2 className="text-4xl text-white">Data By State</h2>
      </div>

      <div style={{ maxWidth: 900, margin: "auto" }}>
        <USMap />
      </div>
    </main>
  );
};

export default StatePage;
