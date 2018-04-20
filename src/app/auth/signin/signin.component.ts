import { TrySignin } from './../store/auth.actions';

import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';

import { Store } from '@ngrx/store';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
// bad az ezafe kardane Effect dige ehtiaji be injecte service nadarim va be jash store ro inject mikonim
// (private authService: AuthService)
  constructor( private store: Store<fromApp.AppState>) { }

  ngOnInit() {
  }
  onSignin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.store.dispatch(new AuthActions.TrySignin({username: email, password: password}));
  }

}
