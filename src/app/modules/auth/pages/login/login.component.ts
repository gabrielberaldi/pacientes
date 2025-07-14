import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CurrentUserService } from '../../../../core/services/current-user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ MatCardModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, NgIf, MatButtonModule, MatIconModule, RouterLink ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

   form = this._formBuilder.nonNullable.group({
    email: ['', [ Validators.required, Validators.email ]],
    senha: ['', Validators.required]
  });

  showPassword = false;

  constructor(
    private _authService: AuthService,
    private _currentUserService: CurrentUserService,
    private _formBuilder: FormBuilder
  ) {}

  login(): void {
    this._authService.login(this.form.getRawValue()).subscribe(user => this._currentUserService.loggedUser.set(user));
  }

  get controls(): Record<string, FormControl> {
    return this.form.controls;
  }

  get icon(): string {
    return this.showPassword ? 'visibility' : 'visibility_off'
  }
  
}


