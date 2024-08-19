// store.ts
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

interface PriceData {
  historicalPrices: [number, number][];
  currentPrice: number;
}

const initialState: PriceData = {
  historicalPrices: [],
  currentPrice: 0,
};

const priceSlice = createSlice({
  name: "price",
  initialState,
  reducers: {
    setHistoricalPrices: (state, action: PayloadAction<[number, number][]>) => {
      state.historicalPrices = action.payload;
    },
    setCurrentPrice: (state, action: PayloadAction<number>) => {
      state.currentPrice = action.payload;
    },
  },
});

export const { setHistoricalPrices, setCurrentPrice } = priceSlice.actions;

export const store = configureStore({
  reducer: {
    price: priceSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
