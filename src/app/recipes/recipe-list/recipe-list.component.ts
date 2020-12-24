import { Component, OnInit } from '@angular/core';
import {Recipe} from '../../domain/Recipe';
import {RecipeService} from '../recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  public recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.recipes;
  }
}
