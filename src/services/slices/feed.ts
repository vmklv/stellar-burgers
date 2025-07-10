import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
import { TOrder } from '@utils-types';

export const fetchFeed = createAsyncThunk('feed/fetchFeed', async () => {
  const data = await getFeedsApi();
  return data;
});

type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  hasError: boolean;
};

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  hasError: false
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(fetchFeed.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  }
});

export const feedReducer = feedSlice.reducer;
