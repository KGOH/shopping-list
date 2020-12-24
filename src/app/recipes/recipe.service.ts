import { Injectable } from '@angular/core';
import {Recipe} from '../domain/Recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  public recipes: Recipe[] = [];

  constructor() {
    this.recipes.push({
      issuer: 'Dr. Evil',
      description: 'Курс лечения от доброты'
    } as Recipe, {
      issuer: 'Mario',
      description: 'Грибная диета'
    } as Recipe);
  }
  public addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
  }
}
