import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';


import * as fromRecipe from '../store/recipe.reducers';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

// @Output() recipeWasSelected = new EventEmitter<Recipe>();
recipeState: Observable<fromRecipe.State>;
// subscription: Subscription;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private store: Store<fromRecipe.FeatureState>) {
}

  ngOnInit() {
      this.recipeState = this.store.select('recipes');
    // this.subscription = this.recipeService.recipesChanged
    //   .subscribe(
    //     (recipes: Recipe[]) => {
    //       this.recipes = recipes;
    //     }
    //   );
    // this.recipes = this.recipeService.getRecipes();
  }
onNewRecipe() {
  this.router.navigate(['new'], { relativeTo: this.route});
}
// ngOnDestroy() {
//   // Called once, before the instance is destroyed.
//   // Add 'implements OnDestroy' to the class.
//   this.subscription.unsubscribe();
// }
}
