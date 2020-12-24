import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RecipeListComponent} from './recipes/recipe-list/recipe-list.component';

const routes: Routes = [
  {path: 'recipes', component: RecipeListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
