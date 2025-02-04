export interface Weather {
  current: {
    temp: number;
    humidity: number;
    wind_speed: number;
    weather: {
      main: string;
    }[];
  };
  daily: {
    dt: number;
    temp: {
      day: number;
    };
    weather: {
      icon: string;
    }[];
  }[];
}

export type Day = Omit<Weather["daily"][0], "current">;

export type Result<T, E> =
  | { success: true; data: T }
  | { success: false; message: E };
