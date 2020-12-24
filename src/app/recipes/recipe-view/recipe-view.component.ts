import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../../domain/Recipe';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.scss']
})
export class RecipeViewComponent implements OnInit {
  @Input() public recipe!: Recipe;

  constructor() { }

  ngOnInit(): void {
  }

}
