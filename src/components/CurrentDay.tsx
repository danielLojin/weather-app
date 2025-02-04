import { Droplets, Wind } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { firstLetterToUppercase } from "../utils/utils";

function CurrentDay() {
  const { weather, city } = useSelector(
    (state: RootState) => state.globalState
  );

  if (!weather) {
    return <div>No weather data available</div>;
  }

  const {
    temp,
    humidity,
    wind_speed,
    weather: [{ main }],
  } = weather.current;

  return (
    <div className="w-full">
      <div className="flex flex-col items-center gap-1 mb-2">
        <h4 className="font-semibold text-xl tracking-wider">
          {firstLetterToUppercase(city)}
        </h4>
        <p className="font-bold text-4xl">{Math.round(temp)}°C</p>
        <p className="tracking-wide text-lg">{main}</p>
      </div>

      <div className="flex justify-around text-sm">
        <div className="flex items-center gap-1">
          <Droplets />
          <span className="font-semibold">{humidity}%</span>
        </div>
        <div className="flex items-center gap-1">
          <Wind />
          <span className="font-semibold">{Math.round(wind_speed)} m/s</span>
        </div>
      </div>
    </div>
  );
}

export default CurrentDay;
