import { RootState } from '../store';
import { TOrder, TOrdersData } from '@utils-types';

export const selectFeedOrders = (state: RootState): TOrder[] =>
  state.feed.orders;
export const selectFeedInfo = (state: RootState): TOrdersData => ({
  orders: state.feed.orders,
  total: state.feed.total,
  totalToday: state.feed.totalToday
});
export const selectIsFeedLoading = (state: RootState): boolean =>
  state.feed.isLoading;
