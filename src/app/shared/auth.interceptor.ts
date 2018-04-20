import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './../auth/auth.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';

import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  // inja dige authservice kar nemikone va store ro inject mikonim
  constructor(private store: Store<fromApp.AppState >) {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepted!', req);
   // const copiedReq = req.clone({headers: req.headers.append('', '')});
    return this.store.select('auth')
    // only get this value once
    .take(1)
    // ba switchmap dige value ro barnemigardone
    // be observable va az hamon value ke miad estefade mikone ke observable ham hast
    // use operator on observable
    .switchMap((authState: fromAuth.State) => {
      const copiedReq = req.clone({params: req.params.set('auth', authState.token)});
       return next.handle(copiedReq);
    });
  }
}
