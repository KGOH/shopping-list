import {Inject, Injectable} from '@angular/core';
import {Recipe} from '../domain/Recipe';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';
import {map as _map} from 'lodash-es';
import {Course} from '../domain/Course';
import {Schedule, ScheduleEvent} from '../domain/Schedule';
import {Drug, DrugPackage} from '../domain/Drug';

const STORAGE_KEY = 'recipes';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  public recipes: Recipe[] = [];

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
    this.recipes = _map(this.storage.get(STORAGE_KEY) || [], x => this.convertRecipe(x));
    console.log(this.recipes);
  }
  public addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.storage.set(STORAGE_KEY, this.recipes);
  }

  public clear(): void {
    this.recipes.splice(0, this.recipes.length);
    this.storage.set(STORAGE_KEY, this.recipes);
  }

  private convertRecipe(recipeObj: any): Recipe {
    const result: Recipe = Object.assign(new Recipe(), recipeObj);
    result.courses = _map(result.courses, x => this.convertCourse(x));
    return result;
  }

  private convertCourse(courseObj: any): Course {
    const course: Course = Object.assign(new Course(), courseObj);
    course.schedules = _map(course.schedules, x => this.convertSchedule(x));
    return course;
  }

  private convertSchedule(scheduleObj: any): Schedule {
    const schedule: Schedule = Object.assign(new Schedule(), scheduleObj);
    schedule.package = this.convertDrugPackage(schedule.package);
    schedule.events = _map(schedule.events, x => this.convertScheduleEvent(x));
    return schedule;
  }

  private convertDrugPackage(obj: any): DrugPackage {
    const drugPackage: DrugPackage = Object.assign(new DrugPackage(), obj);
    const drug = drugPackage.drug;
    drugPackage.drug = new Drug(drug.id, drug.name, drug.englishName);
    return drugPackage;
  }

  private convertScheduleEvent(obj: any): ScheduleEvent {
    return Object.assign(new ScheduleEvent(), obj);
  }
}
