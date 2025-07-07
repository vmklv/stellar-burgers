import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsReducer } from './slices/ingredients';
import { userReducer } from './slices/user';
import { burgerConstructorReducer } from './slices/burger-constructor';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  user: userReducer,
  burgerConstructor: burgerConstructorReducer
});

export type RootState = ReturnType<typeof rootReducer>;
