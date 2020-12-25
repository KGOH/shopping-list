import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RecipeListComponent} from './recipes/recipe-list/recipe-list.component';
import {RecipeEditComponent} from './recipes/recipe-edit/recipe-edit.component';
import {ScheduleEditComponent} from './recipes/schedule-edit/schedule-edit.component';

const routes: Routes = [
  {
    path: 'recipes', component: RecipeListComponent
  },
  {
    path: 'recipes/new', component: RecipeEditComponent
  },
  {
    path: 'recipes/new/schedules/new', component: ScheduleEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
