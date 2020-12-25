import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipeViewComponent } from './recipes/recipe-view/recipe-view.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ScheduleEditComponent } from './recipes/schedule-edit/schedule-edit.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RecipeDataComponent } from './recipes/recipe-data/recipe-data.component';
import {MatSelectModule} from '@angular/material/select';
import { ScheduleEventPipe } from './filters/schedule-event.pipe';
import { CalendarComponent } from './calendar/calendar/calendar.component';
import { CalendarDayComponent } from './calendar/calendar-day/calendar-day.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipeViewComponent,
    RecipeListComponent,
    RecipeEditComponent,
    ScheduleEditComponent,
    RecipeDataComponent,
    ScheduleEventPipe,
    CalendarComponent,
    CalendarDayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
