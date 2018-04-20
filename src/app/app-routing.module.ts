


import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './core/home/home.component';


const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    {path: 'recipes', loadChildren: './recipe/recipes.module#RecipesModule'},
    { path: 'shopping-list', component: ShoppingListComponent },
    { path: 'contact', component: ContactComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
