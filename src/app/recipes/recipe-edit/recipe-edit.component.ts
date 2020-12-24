import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Recipe} from '../../domain/Recipe';
import {RecipeService} from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  @Input() public recipe: Recipe = new Recipe();

  constructor(private router: Router, private recipeService: RecipeService) { }

  ngOnInit(): void {
  }
  public onSubmit(): Promise<boolean> {
    this.recipeService.addRecipe(this.recipe);
    return this.router.navigate(['recipes']);
  }
}
