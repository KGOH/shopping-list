import {Component, DoCheck, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {RecipeService} from '../recipe.service';
import {Recipe} from '../../domain/Recipe';
import {Schedule} from '../../domain/Schedule';
import {ScheduleEditComponent} from '../schedule-edit/schedule-edit.component';
import {RecipeDataComponent} from '../recipe-data/recipe-data.component';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit, DoCheck {
  recipe = new Recipe();
  mode = 'data';
  valid = false;

  @ViewChild(RecipeDataComponent) recipeData!: RecipeDataComponent;

  constructor(private router: Router, private recipeService: RecipeService) { }

  get schedules(): Schedule[] {
    return this.recipe.course.schedules;
  }

  ngOnInit(): void {
  }

  onRecipeSave(): void {
    this.recipeService.addRecipe(this.recipe);
    this.router.navigate(['recipes']);
  }

  addSchedule(): boolean {
    this.mode = 'schedule';
    return false;
  }

  onCreateSchedule(comp: ScheduleEditComponent, schedule: Schedule): void {
    setTimeout(() => this.schedules.push(schedule));
    comp.schedule = new Schedule();
    this.mode = 'data';
  }

  ngDoCheck(): void {
    this.valid = this.recipeData && this.recipeData.form.valid && this.schedules.length > 0;
  }
}
