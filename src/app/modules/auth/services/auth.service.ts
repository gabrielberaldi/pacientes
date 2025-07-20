import { Injectable } from '@angular/core';
import { catchError, from, Observable } from 'rxjs';
import { UserRegister } from '../model/user-register';
import { CurrentUser } from '../../../core/models/current-user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  login(user: UserRegister): Observable<CurrentUser> {
    return from(window.electron.invoke<CurrentUser>('auth:login', user))
      .pipe(
        catchError((error: Error) => { 
          throw window.alert(error.message)
        }
    ));
  }

  register(user: UserRegister): Observable<CurrentUser> {
    return from(window.electron.invoke<CurrentUser>('auth:register', user))
      .pipe(
        catchError((error: Error) => { 
          throw window.alert(error.message)
        }
    ));
  }

}
