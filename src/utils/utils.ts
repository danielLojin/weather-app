import toast from "react-hot-toast";
import { Result } from "./types";

export async function getLocationCords(
  city: string
): Promise<Result<{ lat: number; lon: number }, string>> {
  try {
    const GEO_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${
      import.meta.env.VITE_WEATHER_API_KEY
    }`;

    const res = await fetch(GEO_URL);
    const cords: { lat: number; lon: number }[] = await res.json();

    if (cords.length > 0) {
      return { success: true, data: { lat: cords[0].lat, lon: cords[0].lon } };
    } else {
      return { success: false, message: "City not found" };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Failed to fetch location. Please try again later.",
    };
  }
}

export async function getWeatherData(lat: number, lon: number) {
  try {
    const WEATHER_URL = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${
      import.meta.env.VITE_WEATHER_API_KEY
    }`;

    const res = await fetch(WEATHER_URL);
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}

export function firstLetterToUppercase(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getGeolocation(): Promise<
  Result<{ lat: number; lon: number }, string>
> {
  return new Promise((resolve) => {
    if ("geolocation" in navigator) {
      // Geolocation is supported
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Success callback
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          resolve({ success: true, data: { lat, lon } });
        },
        (error: GeolocationPositionError) => {
          // Error callback
          toast.error(`Error getting location: "${error.message}"`);
          resolve({
            success: false,
            message: `Error getting location: "${error.message}"`,
          });
        }
      );
    } else {
      // Geolocation is not supported
      toast.error("Geolocation is not supported by this browser.");
      resolve({
        success: false,
        message: "Geolocation is not supported by this browser.",
      });
    }
  });
}

export async function reverseGeo(lat: number, lon: number) {
  try {
    const URL = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${
      import.meta.env.VITE_WEATHER_API_KEY
    }`;

    const res = await fetch(URL);
    const data = await res.json();
    return data.at(0).name;
  } catch (error) {
    console.log(error);
  }
}
