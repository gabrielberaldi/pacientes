import { catchError, from, map, Observable, tap, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { TreeNode } from '../../shared/components/table/model/tree-node.model';

export abstract class BaseIpcService<T, R> {

  private readonly _nbToastrsService = inject(NbToastrService);

  constructor(
    private _path: string
  ) {}

  getAll(): Observable<TreeNode<R>[]> {
    return from(window.electron.invoke<R[]>(`${this._path}:getAll`))
      .pipe(
        map(response => response.map(item => ({ data: item }))),
        catchError((error: Error) => {
          this._nbToastrsService.danger(error.message || 'Erro desconhecido', 'Erro');
          return throwError(() => error);
        }),
      );
  }

  getById(id: number): Observable<T> {
    return from(window.electron.invoke<T>(`${this._path}:getById`, { id }))
      .pipe(
        catchError((error: Error) => {
          this._nbToastrsService.danger(error.message || 'Erro desconhecido', 'Erro');
          return throwError(() => error);
        }),
      );
  }

  create(data: T): Observable<T> {
    return from(window.electron.invoke<T>(`${this._path}:create`, data))
      .pipe(
        tap(() => this._nbToastrsService.success('Registro criado com sucesso!', 'Sucesso')),
        catchError((error: Error) => {
          this._nbToastrsService.danger(error.message || 'Erro desconhecido', 'Erro');
          return throwError(() => error);
        }),
      );
  }

  update(data: T): Observable<T> {
    return from(window.electron.invoke<T>(`${this._path}:update`, data))
      .pipe(
        tap(() => this._nbToastrsService.success('Registro atualizado com sucesso!', 'Sucesso')),
        catchError((error: Error) => {
          this._nbToastrsService.danger(error.message || 'Erro desconhecido', 'Erro');
          return throwError(() => error);
        }),
      );
  }

  delete(id: number): Observable<T> {
    return from(window.electron.invoke<T>(`${this._path}:delete`, { id }))
      .pipe(
        tap(() => this._nbToastrsService.success('Registro excluído com sucesso!', 'Sucesso')),
        catchError((error: Error) => {
          this._nbToastrsService.danger(error.message || 'Erro desconhecido', 'Erro');
          return throwError(() => error);
        }),
      );
  }
  
}
