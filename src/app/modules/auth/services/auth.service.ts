import { Injectable } from '@angular/core';
import { BaseIpcService } from '../../../core/services/base-ipc.service';
import { catchError, from, Observable } from 'rxjs';
import { UserRegister } from '../model/user-register';
import { CurrentUser } from '../../../core/models/current-user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseIpcService<CurrentUser> {

  constructor() {
    super('auth');
  }
  
  login(user: UserRegister): Observable<CurrentUser> {
    return from(window.electron.invoke<CurrentUser>('auth:login', user))
      .pipe(
        catchError((error: Error) => { 
          throw this._snackBar.open(error.message);
        }
    ));
  }

  register(user: UserRegister): Observable<CurrentUser> {
    return from(window.electron.invoke<CurrentUser>('auth:register', user))
      .pipe(
        catchError((error: Error) => { 
          throw this._snackBar.open(error.message);
        }
    ));
  }

}
