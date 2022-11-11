// Next
import type { AppType } from "next/dist/shared/lib/utils";

// Tailwind Globals
import "../styles/globals.css";

// Context;
import { AppContextProvider } from "../context/AppContext";

// Components
import Navbar from "../components/ui/Navbar";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <AppContextProvider>
      <Navbar />
      <Component {...pageProps} />
    </AppContextProvider>
  );
};

export default MyApp;
