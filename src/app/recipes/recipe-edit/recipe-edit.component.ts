import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Recipe} from '../../domain/Recipe';
import {RecipeService} from '../recipe.service';
import {Schedule} from '../../domain/Schedule';
import {FormControl, FormGroup} from '@angular/forms';
import {Course} from '../../domain/Course';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  public schedules: Schedule[] = [];
  public form = new FormGroup({
    issuer: new FormControl(),
    description: new FormControl()
  });

  constructor(private router: Router, private recipeService: RecipeService) { }

  ngOnInit(): void {
  }
  public onSubmit(): Promise<boolean> {
    const recipe = this.form.value as Recipe;
    recipe.courses = [{schedules: this.schedules} as Course];
    this.recipeService.addRecipe(recipe);
    return this.router.navigate(['recipes']);
  }
}
