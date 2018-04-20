import { Params } from '@angular/router';

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import 'rxjs/add/operator/map';


// import { AuthService } from './../auth/auth.service';
import { Recipe } from './../recipe/recipe.model';
import { RecipeService } from './../recipe/recipe.service';


@Injectable()

export class DataStorageService {
  constructor (private httpClient: HttpClient,
                private recipeService: RecipeService) {}

storeRecipes() {
  // const headers = new HttpHeaders().set('Authorization', 'Bearer hfdjfd');

  // return this.httpClient.put('https://recbook-2987f.firebaseio.com/recipes.json',
  //  this.recipeService.getRecipes(), {
  //     observe: 'body',
  //     params:  new HttpParams().set('auth', token)
  //     // headers: headers
  //   });
  const req = new HttpRequest('PUT', 'https://recbook-2987f.firebaseio.com/recipes.json',
     this.recipeService.getRecipes(), {reportProgress: true});
     return this.httpClient.request(req);
}

getRecipes() {
  // this.httpClient.get<Recipe[]>('https://recbook-2987f.firebaseio.com/recipes.json?auth=' + token)
    this.httpClient.get<Recipe[]>('https://recbook-2987f.firebaseio.com/recipes.json',
     {
        observe: 'body',
        responseType: 'json'
     })
      .map(
    (recipes) => {
      console.log(recipes);
      // tslint:disable-next-line:prefer-const
      for (let recipe of recipes) {
        if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
        }
      }
     return recipes;
    }
  )
    .subscribe(
      (recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
      }
    );
}
}
