import { Component, input } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbDatepickerModule, NbDialogModule, NbDialogService, NbInputModule, NbListModule } from '@nebular/theme';
import { Evolution } from '../../models/evolution.model';
import { ModalEvolutionComponent } from '../modal-evolution/modal-evolution.component';
import { filter } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-evolution',
  standalone: true,
  imports: [NbListModule, NbCardModule, NbButtonModule, NbInputModule, NbDatepickerModule, NbListModule, ReactiveFormsModule, NbDialogModule, DatePipe ],
  templateUrl: './evolution.component.html',
  styleUrl: './evolution.component.scss'
})
export class EvolutionComponent {

  formGroup = input.required<FormGroup>();

  constructor(
    private _nbDialogService: NbDialogService
  ) {}

  addEditEvolution(evolution?: Evolution, index?: number): void {
    const title = evolution ? 'Editar Evolução' : 'Nova Evolução';
    this._nbDialogService.open(ModalEvolutionComponent, { context: { title, evolution }}).onClose.pipe(
      filter((result: FormGroup) => !!result)
    ).subscribe(result => {
      if (!!index && index >= 0) {
        this.evolutionArray.at(index).patchValue(result.value);
      } else {
        this.evolutionArray.push(result);
      }
    });
  }

  deleteEvolution(index: number): void {
    this.evolutionArray.removeAt(index);
  }

  get evolutionArray(): FormArray {
    return this.formGroup().get('evolucoes') as FormArray;
  }
}
