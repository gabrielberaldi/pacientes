import { AbstractControl, ValidationErrors } from "@angular/forms";

export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const senha = control.get('senha')?.value;
  const confirmacaoSenha = control.get('confirmacaoSenha')?.value;
  if (senha !== confirmacaoSenha) {
    return { senhaNaoConfere: true };
  }
  return null;
}