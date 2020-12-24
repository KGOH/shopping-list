import { Component, OnInit } from '@angular/core';
import {Recipe} from '../../domain/Recipe';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  public recipes: Recipe[] = [];

  constructor() { }

  ngOnInit(): void {
    this.recipes.push({
      issuer: 'Dr. Evil',
      description: 'Курс лечения от доброты'
    } as Recipe, {
      issuer: 'Mario',
      description: 'Грибная диета'
    } as Recipe);
  }
}
