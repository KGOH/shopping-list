import {Inject, Injectable} from '@angular/core';
import {Recipe} from '../domain/Recipe';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';

const STORAGE_KEY = 'recipes';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  public recipes: Recipe[] = [];

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
    this.recipes = this.storage.get(STORAGE_KEY) || [];
  }
  public addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.storage.set(STORAGE_KEY, this.recipes);
  }
}
