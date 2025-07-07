import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsReducer } from './slices/ingredients';
import { userReducer } from './slices/user';
import { burgerConstructorReducer } from './slices/burger-constructor';
import { feedReducer } from './slices/feed';
import { orderReducer } from './slices/order';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  user: userReducer,
  burgerConstructor: burgerConstructorReducer,
  feed: feedReducer,
  order: orderReducer
});

export type RootState = ReturnType<typeof rootReducer>;
