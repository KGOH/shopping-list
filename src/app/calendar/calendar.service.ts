import { Injectable } from '@angular/core';
import {RecipeService} from '../recipes/recipe.service';

declare const shopping_list: any;

export class CalendarEvent {
  event: string;
  drugs: string[];
}

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private recipeService: RecipeService) { }

  public getCalendarEvents(date: Date): CalendarEvent[] {
    // return shopping_list.core.formatted_schedule_for_a_day(date, this.recipeService.recipes);
    return [{
      event: `За 30 минут до завтрака`,
      drugs: [
        'Стокрин 600 мг таблетка, 2 шт',
        'Стн 600 мг таблетка, 2 шт'
      ]
    }, {
      event: `До обеда`,
      drugs: [
        'Стокрин 200 мг таблетка, 2 шт',
        'Стн 300 мг таблетка, 2 шт'
      ]
    }] as CalendarEvent[];
  }
}
