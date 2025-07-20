import { NgFor, NgIf, NgSwitchCase } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbFormFieldModule, NbTabsetModule } from '@nebular/theme';
import { PatientService } from '../../services/patient.service';
import { InformationComponent } from '../../components/information/information.component';

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
    nomePai: [''],
    nomeMae: [''],
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
    private _patientService: PatientService
  ) { }

}
