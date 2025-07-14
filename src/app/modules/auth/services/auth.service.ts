import { Injectable } from '@angular/core';
import { BaseIpcService } from '../../../core/services/base-ipc.service';
import { catchError, from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseIpcService<any> {

  constructor() {
    super('auth');
  }
  
  login(): Observable<any> {
    return from(window.electron.invoke<any>('auth:register'))
      .pipe(
        catchError((error: Error) => { 
          throw this._snackBar.open(error.message);
        }
    ));
  }

  register(): Observable<any> {
    return from(window.electron.invoke<any>('auth:register'))
      .pipe(
        catchError((error: Error) => { 
          throw this._snackBar.open(error.message);
        }
    ));
  }

}
