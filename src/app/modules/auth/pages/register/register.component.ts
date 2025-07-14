import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { passwordMatchValidator } from '../../validators/password-match.validator';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CurrentUserService } from '../../../../core/services/current-user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, NgIf, MatButtonModule, MatIconModule, RouterLink ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  form = this._formBuilder.nonNullable.group({
    nome: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', Validators.required ],
    confirmacaoSenha: ['', Validators.required ]
  }, { validators: passwordMatchValidator });

  showPassword = false;

  constructor(
    private _authService: AuthService,
    private _currentUserService: CurrentUserService,
    private _formBuilder: FormBuilder
  ) { }

  register(): void {
    this._authService.register(this.form.getRawValue()).subscribe(user => this._currentUserService.loggedUser.set(user));
  }

  get controls(): Record<string, FormControl> {
    return this.form.controls;
  }

}
