import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../../validators/password-match.validator';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CurrentUserService } from '../../../../core/services/current-user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ ReactiveFormsModule, NgIf, RouterLink ],
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
