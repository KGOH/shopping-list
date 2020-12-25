import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipeViewComponent } from './recipes/recipe-view/recipe-view.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ScheduleComponent } from './recipes/schedule/schedule.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    RecipeViewComponent,
    RecipeListComponent,
    RecipeEditComponent,
    ScheduleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
