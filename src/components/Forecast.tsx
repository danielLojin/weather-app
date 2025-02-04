import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { Day } from "../utils/types";
import ForecastCard from "./ForecastCard";

function Forecast() {
  const { weather } = useSelector((state: RootState) => state.globalState);

  if (!weather) return <div>No weather data available</div>;

  const fiveDays = weather.daily.slice(1, 6);

  return (
    <div className="flex justify-between w-full">
      {fiveDays.map((day: Day) => (
        <ForecastCard key={day.dt} dayData={day} />
      ))}
    </div>
  );
}

export default Forecast;
