import { NgFor, NgIf, NgSwitchCase } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbFormFieldModule, NbTabsetModule } from '@nebular/theme';
import { PatientService } from '../../services/patient.service';
import { InformationComponent } from '../../components/information/information.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-form',
  standalone: true,
  imports: [ NbTabsetModule, NbCardModule, NbButtonModule, NbFormFieldModule, ReactiveFormsModule, NgIf, NgFor, NgSwitchCase, InformationComponent ],
  templateUrl: './patient-form.component.html',
  styleUrl: './patient-form.component.scss'
})
export class PatientFormComponent {

  formGroup: FormGroup = this._fb.nonNullable.group({
    id: [null],
    nome: ['', Validators.required],
    dataNascimento: ['', Validators.required],
    sexo: [null, Validators.required],
    contato: ['', Validators.required],
    nomePai: ['', Validators.required],
    nomeMae: ['', Validators.required],
    bairro: [''],
    cep: [''],
    logradouro: [''],
    tipoLogradouro: [''],
    numero: [''],
    diaDaSessao: [null, Validators.required],
    horario: ['', Validators.required],
    evolucao: ['', Validators.required],
  });

  constructor(
    private _fb: FormBuilder,
    private _patientService: PatientService,
    private _router: Router
  ) { }

  save(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      this.formGroup.markAsDirty();
      return;
    }
    
    console.log(this.formGroup.value);

    this._patientService.create(this.formGroup.value).subscribe(tste => {
      console.log(tste);
    })
  }

  back(): void {
    this._router.navigate(['/layout/patient']);
  }

  delete(): void {

  }
  
  get id(): FormControl {
    return this.formGroup.get('id') as FormControl;
  }
  
}
