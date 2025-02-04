import { Day } from "../utils/types";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function ForecastCard({ dayData }: { dayData: Day }) {
  const {
    dt,
    temp: { day },
    weather: [{ icon }],
  } = dayData;
  const dayInWeek = new Date(dt * 1000).getDay();

  return (
    <div className="flex flex-col bg-gray-300 dark:bg-gray-500 text-gray-600 dark:text-gray-200 items-center rounded-md">
      <h4 className="font-semibold">{DAYS[dayInWeek]}</h4>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt="Weather condition icon"
        width={60}
        height={60}
      />
      <p>{Math.round(day)}°C</p>
    </div>
  );
}

export default ForecastCard;
