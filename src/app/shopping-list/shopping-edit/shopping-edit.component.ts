

import { Subscription } from 'rxjs/Subscription';

import { Ingredient } from './../../shared/ingredient.model';
import { Component, OnInit,  OnDestroy, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducers';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slFrom: NgForm;
  subscription: Subscription;
  editMode = false;
  // editedItemIndex: number;
  editedItem: Ingredient;

//   @Output() ingredientAdded = new EventEmitter<Ingredient>();
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
  this.subscription = this.store.select('shoppingList')
      .subscribe(
        data => {
          if (data.editedIngredientIndex > -1) {
            this.editedItem = data.editedIngredient;
            this.editMode = true;
            this.slFrom.setValue({
              name: this.editedItem.name,
              amount: this.editedItem.amount
            // tslint:disable-next-line:semicolon
            })
          } else {
            this.editMode = false;
          }
        }
      );
    // this.subscription = this.slService.startedEditing
    //   .subscribe(
    //     (index: number) => {
    //       this.editedItemIndex = index;
    //       this.editMode = true;
    //       this.editedItem = this.slService.getIngredient(index);
    //       this.slFrom.setValue({
    //         name: this.editedItem.name,
    //         amount: this.editedItem.amount
    //       });
    //     }
    //   );
  }
// onsubmit check : check if we are in the editmode or not in edit mode, we want to add ingredient
// dispatch new action
  onSubmit(form: NgForm ) {
  const value = form.value;
  const newIngredient = new Ingredient( value.name , value.amount);
  if (this.editMode) {
    this.store.dispatch(new ShoppingListActions.UpdateIngredient({ingredient: newIngredient}));
    // this.slService.updateIngredient(this.editedItemIndex, newIngredient);
  } else {
    // this.slService.addIngredient(newIngredient);
    this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
  }
  this.editMode = false;
  form.reset();
  }
onClear() {
  this.slFrom.reset();
  this.editMode = false;
}
onDelete() {
  this.store.dispatch(new ShoppingListActions.DeleteIngredient());
  // this.slService.deleteIngredient(this.editedItemIndex);
  this.onClear();
}
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    this.store.dispatch(new ShoppingListActions.StopEdit());
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }
}
