import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RecipeListComponent} from './recipes/recipe-list/recipe-list.component';
import {RecipeEditComponent} from './recipes/recipe-edit/recipe-edit.component';

const routes: Routes = [
  {path: 'recipes', component: RecipeListComponent},
  {path: 'recipes/new-recipe', component: RecipeEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
