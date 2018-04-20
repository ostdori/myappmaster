
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { Ingredient } from './../shared/ingredient.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducers';



@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  //  observable ---- JS object with an ingredient property
  shoppingListState: Observable<{ingredients: Ingredient[]}>;
  // private subscription: Subscription;


  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
  this.shoppingListState = this.store.select('shoppingList');
  // this.subscription = this.slService.ingredientsChanged
  //   .subscribe(
  //     (ingredients: Ingredient[]) => {
  //   this.ingredients = ingredients;
}

onEditItem(index: number) {
  this.store.dispatch(new ShoppingListActions.StartEdit(index));
  // this.slService.startedEditing.next(index);
}
// ngOnDestroy() {
//   // Called once, before the instance is destroyed.
//   // Add 'implements OnDestroy' to the class.
//   this.subscription.unsubscribe();
// }

}
