import { Injectable, signal } from '@angular/core';
import { CurrentUser } from '../models/current-user.model';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  loggedUser = signal<CurrentUser | null>(null);

  constructor() { }
}
