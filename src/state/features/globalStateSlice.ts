import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Weather } from "../../utils/types";

export interface InitialState {
  searchTerm: string;
  city: string;
  weather: Weather | null;
  isLoading: boolean;
}

const initialState: InitialState = {
  searchTerm: "",
  city: "",
  weather: null,
  isLoading: false,
};

export const globalStateSlice = createSlice({
  name: "globalState",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    setWeather: (state, action: PayloadAction<Weather | null>) => {
      state.weather = action.payload;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSearchTerm, setCity, setWeather, setIsLoading } =
  globalStateSlice.actions;

export default globalStateSlice.reducer;
