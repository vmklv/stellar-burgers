import { RootState } from '../store';
import { TIngredient } from '@utils-types';

export const selectIngredients = (state: RootState): TIngredient[] =>
  state.ingredients.items;

export const selectIsIngredientsLoading = (state: RootState): boolean =>
  state.ingredients.isLoading;

export const selectBuns = (state: RootState): TIngredient[] =>
  state.ingredients.items.filter((item) => item.type === 'bun');

export const selectSauces = (state: RootState): TIngredient[] =>
  state.ingredients.items.filter((item) => item.type === 'sauce');

export const selectMains = (state: RootState): TIngredient[] =>
  state.ingredients.items.filter((item) => item.type === 'main');
