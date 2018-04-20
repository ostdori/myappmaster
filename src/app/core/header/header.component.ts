import { StoreRecipes } from './../../recipe/store/recipe.actions';
import { Observable } from 'rxjs/Observable';


import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Response } from '@angular/http';
// import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Store } from '@ngrx/store';

// import { AuthService } from './../../auth/auth.service';
import { DataStorageService } from './../../shared/data-storage.service';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as AuthActions from '../../auth/store/auth.actions';
import * as RecipeActions from '../../recipe/store/recipe.actions';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
// add new service for store
export class HeaderComponent implements OnInit {
  authState: Observable<fromAuth.State>;

  constructor (private dataStorageService: DataStorageService,
               private store: Store<fromApp.AppState>) {}

ngOnInit() {
  // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  // Add 'implements OnInit' to the class.
  this.authState = this.store.select('auth');
}
  onSaveData() {
    this.store.dispatch(new RecipeActions.StoreRecipes());
    // this.dataStorageService.storeRecipes()
    //   .subscribe(
    //     (response) => {
    //       console.log(response);
    //     }
    //   );

  }

  onFetchData() {
   this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }

}
