import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  setCity,
  setIsLoading,
  setWeather,
} from "./state/features/globalStateSlice";
import { RootState } from "./state/store";
import { Weather } from "./utils/types";
import { getGeolocation, getWeatherData, reverseGeo } from "./utils/utils";

import CurrentDay from "./components/CurrentDay";
import Forecast from "./components/Forecast";
import Form from "./components/Form";
import Heading from "./components/Heading";
import Layout from "./components/Layout";
import Spinner from "./components/Spinner";

function App() {
  const { weather, isLoading } = useSelector(
    (state: RootState) => state.globalState
  );
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchCords() {
      dispatch(setIsLoading(true));
      try {
        const cords = await getGeolocation();

        if (cords.success) {
          const { lat, lon } = cords.data;

          const city = await reverseGeo(lat, lon);
          dispatch(setCity(city));

          const data: Weather = await getWeatherData(lat, lon);
          dispatch(setWeather(data));
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong. Please try again later.");
      } finally {
        dispatch(setIsLoading(false));
      }
    }

    fetchCords();
  }, []);

  return (
    <>
      <Layout>
        <Heading />
        <Form />
        {isLoading && !weather && <Spinner />}
        {weather && !isLoading && (
          <>
            <CurrentDay />
            <Forecast />
          </>
        )}
      </Layout>
      <Toaster />
    </>
  );
}

export default App;
