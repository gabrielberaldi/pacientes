import { NgFor, NgIf, NgSwitchCase } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbFormFieldModule, NbTabsetModule } from '@nebular/theme';
import { PatientService } from '../../services/patient.service';
import { InformationComponent } from '../../components/information/information.component';
import { ActivatedRoute, Router } from '@angular/router';
import { parseISO } from 'date-fns'
import { EvolutionComponent } from '../../components/evolution/evolution.component';
import { Evolution } from '../../models/evolution.model';

@Component({
  selector: 'app-patient-form',
  standalone: true,
  imports: [ NbTabsetModule, NbCardModule, NbButtonModule, NbFormFieldModule, ReactiveFormsModule, NgIf, NgFor, NgSwitchCase, InformationComponent, EvolutionComponent ],
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
    evolucoes: this._fb.array([])
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
    if (!this.id.value) this._patientService.create(this.formGroup.value).subscribe(({ id }) => this._router.navigate([`/layout/patient/edit/${id}`]));
    else this._patientService.update(this.formGroup.value).subscribe();
  }

  private _getData(): void {
    const id = Number(this._actvatedRoute.snapshot.params['id']);
    if (!id) return
    this._patientService.getById(id).subscribe(patient => {
      this.formGroup.patchValue({ ...patient, dataNascimento: parseISO(patient.dataNascimento) })
      this._addControlsToFormArray(patient.evolucoes);
    });
  }

  private _addControlsToFormArray(evolutions: Evolution[]): void {
    if (!evolutions || !evolutions.length) return;
    for (const evolution of evolutions) {
      const group = this._newFormGroup()
      group.patchValue(evolution);
      this.evolutionArray.push(group);
    }
  }
  
  private _newFormGroup(): FormGroup {
    return this._fb.group({
      id: [null],
      date: ['', Validators.required],
      text: ['', Validators.required]
    })
  }
  
  get id(): FormControl {
    return this.formGroup.get('id') as FormControl;
  }

  private get evolutionArray(): FormArray {
    return this.formGroup.get('evolucoes') as FormArray;
  }
  
}
