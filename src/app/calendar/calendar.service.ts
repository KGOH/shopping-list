import { Injectable } from '@angular/core';
import {RecipeService} from '../recipes/recipe.service';

declare const shopping_list: any;

export class CalendarEvent {
  event!: string;
  drugs!: string[];
}

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private recipeService: RecipeService) { }

  public getCalendarEvents(date: Date): CalendarEvent[] {
    return shopping_list.core.formatted_schedule_for_a_day(date, this.recipeService.recipes);
  }
}
