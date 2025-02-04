import { FormEvent } from "react";
import toast from "react-hot-toast";

import { getLocationCords, getWeatherData } from "../utils/utils";
import { Weather } from "../utils/types";

import { RootState } from "../state/store";
import { useDispatch, useSelector } from "react-redux";
import {
  setCity,
  setIsLoading,
  setSearchTerm,
  setWeather,
} from "../state/features/globalStateSlice";

function Form() {
  const { searchTerm, isLoading } = useSelector(
    (state: RootState) => state.globalState
  );
  const dispatch = useDispatch();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!searchTerm) return;

    dispatch(setWeather(null));
    dispatch(setIsLoading(true));
    try {
      const locationData = await getLocationCords(searchTerm);

      if (locationData.success) {
        const { lat, lon } = locationData.data;
        const data: Weather = await getWeatherData(lat, lon);
        dispatch(setWeather(data));
      } else {
        toast.error(locationData.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      dispatch(setCity(searchTerm));
      dispatch(setSearchTerm(""));
      dispatch(setIsLoading(false));
    }
  }

  return (
    <form className="flex gap-2 items-center" onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        placeholder="Search city..."
        className="self-stretch px-2 rounded-md border-2 border-gray-300 dark:border-gray-600 disabled:bg-gray-300 disabled:text-gray-400 dark:disabled:bg-gray-600 dark:disabled:text-gray-500 disabled:cursor-not-allowed focus:outline-2 focus:outline-offset-2 focus:outline-gray-400 dark:focus:outline-gray-500"
        value={searchTerm}
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        disabled={isLoading}
      />
      <button
        disabled={isLoading}
        type="submit"
        className="bg-gray-800 text-gray-200 p-2 rounded-md dark:bg-gray-200 dark:text-gray-800 cursor-pointer disabled:bg-gray-800/50 disabled:text-gray-200/50 dark:disabled:bg-gray-200/50 disabled:cursor-not-allowed focus:outline-2 focus:outline-offset-2 focus:outline-gray-400 dark:focus:outline-gray-500"
      >
        Search
      </button>
    </form>
  );
}

export default Form;
