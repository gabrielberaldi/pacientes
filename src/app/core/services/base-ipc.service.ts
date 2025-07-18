
import { catchError, from, Observable, tap } from 'rxjs';
import { inject } from '@angular/core';

export abstract class BaseIpcService<T> {

  // private readonly _alertService = inject(AlertService);
  // private readonly _storageService = inject(StorageService);

  //  protected _snackBar = inject(MatSnackBar);

  constructor(
    private _path: string
  ) {}

  getAll(): Observable<T[]> {
    return from(window.electron.invoke<T[]>(`${this._path}:getAll`))
      .pipe(catchError((error: Error) => { 
        throw window.alert(error.message)
      }
    ));
  }

  getById(id: number): Observable<T> {
    return from(window.electron.invoke<T>(`${this._path}:getById`, { id }))
      .pipe(catchError((error: Error) => { 
        throw window.alert(error.message);
      }
    ));
  }

  create(data: T): Observable<T> {
    return from(window.electron.invoke<T>(`${this._path}:create`, data))
      .pipe(
        // tap(() => this._alertService.success('Registro criado com sucesso!')),
        catchError((error: Error) => { 
          throw window.alert(error.message)
        }
    ));
  }

  update(data: T): Observable<T> {
    return from(window.electron.invoke<T>(`${this._path}:update`, data))
      .pipe(
        // tap(() => this._alertService.success('Registro atualizado com sucesso!')),
        catchError((error: Error) => { 
          throw window.alert(error.message)
        }
    ));
  }

  delete(id: number): Observable<T> {
    // const token = this._storageService.getAuth()?.token || '';
    return from(window.electron.invoke<T>(`${this._path}:delete`, { id }))
      .pipe(
        // tap(() => this._alertService.success('Registro excluído com sucesso!')),    
        catchError((error: Error) => { 
          // throw this._alertService.error(error.message);
          throw error;
        }
    ));
  }


}
