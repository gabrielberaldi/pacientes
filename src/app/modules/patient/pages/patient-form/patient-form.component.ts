import { NgFor, NgIf, NgSwitchCase } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbFormFieldModule, NbTabsetModule } from '@nebular/theme';
import { PatientService } from '../../services/patient.service';
import { InformationComponent } from '../../components/information/information.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-patient-form',
  standalone: true,
  imports: [ NbTabsetModule, NbCardModule, NbButtonModule, NbFormFieldModule, ReactiveFormsModule, NgIf, NgFor, NgSwitchCase, InformationComponent ],
  templateUrl: './patient-form.component.html',
  styleUrl: './patient-form.component.scss'
})
export class PatientFormComponent implements OnInit {

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
    private _actvatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
    private _patientService: PatientService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._getData();
  }

  back(): void {
    this._router.navigate(['/layout/patient']);
  }

  delete(): void {
    this._patientService.delete(this.id.value).subscribe(() => this.back());
  }

  save(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      this.formGroup.markAsDirty();
      return;
    }
    
    this._patientService.create(this.formGroup.value).subscribe(tste => console.log(tste));
  }

  private _getData(): void {
    const id = Number(this._actvatedRoute.snapshot.params['id']);
    if (!!id) this._patientService.getById(id).subscribe(patient => this.formGroup.patchValue(patient));
    console.log(this.formGroup.value, 'formGroup value');
  }
  
  get id(): FormControl {
    return this.formGroup.get('id') as FormControl;
  }
  
}
