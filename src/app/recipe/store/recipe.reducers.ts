
import { Recipe } from './../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';

import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducers';


export interface FeatureState extends fromApp.AppState {
  recipes: State;
}


export interface State {
  recipes: Recipe[];
}
// initial state here is actually of type  state

const initialState: State = {
  recipes: [
        new Recipe(
      'A test1 Recipe',
        'FOOD CRAZY',
        'http://maxpixel.freegreatpicture.com/static/photo/2x/Food-Dishes-Eat-Gastronomy-Lunch-Recipe-2760200.jpg',
        [
          new Ingredient('Qenua', 3),
          new Ingredient('Olive Oil', 1)
        ]),
        new Recipe('A test2 Recipe',
        'SUSHI HOMEMADE',
        'https://c1.staticflickr.com/3/2453/3748516440_a64797c7d3_b.jpg',
        [
          new Ingredient('Lax', 1),
          new Ingredient('Noori', 5)
        ])
      ]
};
export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
  switch (action.type) {
    case (RecipeActions.SET_RECIPES):
      return {
        ...state,
        recipes: [...action.payload]
      };
    case (RecipeActions.ADD_RECIPE):
        return {
          ...state,
          recipes: [...state.recipes, action.payload]
        };
    case (RecipeActions.UPDATE_RECIPE):
        const recipe = state.recipes[action.payload.index];
        const updatedRecipe = {
          ...recipe,
          ...action.payload.updatedRecipe
        };
        const recipes = [...state.recipes];
        recipes[action.payload.index] = updatedRecipe;
        return {
          ...state,
          recipes: recipes
        };
    case (RecipeActions.DELETE_RECIPE):
          const oldRecipes = [...state.recipes];
          oldRecipes.splice(action.payload, 1);
          return {
            ...state,
            recipes: oldRecipes
          };
      default:
          return  state;
  }
}
