// storing the fetched data
export const state = {
  weather: {},
  query: "",
};

// function creating an object that will contain weather data and will be stored into the state
const createObject = function (data) {
  return {
    location: data.location.name,
    tempC: data.current.temp_c,
    text: data.current.condition.text,
    icon: data.current.condition.icon,
    minTemp: data.forecast.forecastday[0].day.mintemp_c,
    maxTemp: data.forecast.forecastday[0].day.maxtemp_c,
    wind: data.current.wind_kph,
    feelsLike: data.current.feelslike_c,
    humidity: data.current.humidity,
    pressure: data.current.pressure_mb,
    day1: {
      minTemp: data.forecast.forecastday[1].day.mintemp_c,
      maxTemp: data.forecast.forecastday[1].day.maxtemp_c,
      icon: data.forecast.forecastday[1].day.condition.icon,
    },
    day2: {
      minTemp: data.forecast.forecastday[2].day.mintemp_c,
      maxTemp: data.forecast.forecastday[2].day.maxtemp_c,
      icon: data.forecast.forecastday[2].day.condition.icon,
    },
    day3: {
      minTemp: data.forecast.forecastday[3].day.mintemp_c,
      maxTemp: data.forecast.forecastday[3].day.maxtemp_c,
      icon: data.forecast.forecastday[3].day.condition.icon,
    },
  };
};

export const getData = async function (city) {
  try {
    const KEY = "f1126fa3b45b4d7fa0c34620231509";
    const data = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${KEY}&q=${city}&days=4&aqi=no&alerts=no`
    );
    if (!data.ok)
      throw new Error(
        "Couldn't load the weather data for this city! Please try another one."
      );
    const weatherData = await data.json();

    state.weather = createObject(weatherData);
  } catch (err) {
    console.error(`Something went wrong: ${err.message}.`);
    throw err;
  }
};

// getting current position
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

export const currentPosition = async function () {
  try {
    const pos = await getPosition();

    const { latitude: lat, longitude: long } = pos.coords;

    // Reverse Geocoding
    const geoPos = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}`
    );
    if (!geoPos.ok) throw new Error("Problem getting your location data");

    const posData = await geoPos.json();

    return posData.city;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
