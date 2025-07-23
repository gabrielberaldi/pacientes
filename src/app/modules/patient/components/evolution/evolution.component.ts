import { Component, effect, input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbDatepickerModule, NbInputModule, NbListModule } from '@nebular/theme';
import { Evolution } from '../../models/evolution.model';

@Component({
  selector: 'app-evolution',
  standalone: true,
  imports: [NbListModule, NbCardModule, NbButtonModule, NbInputModule, NbDatepickerModule, NbListModule, ReactiveFormsModule ],
  templateUrl: './evolution.component.html',
  styleUrl: './evolution.component.scss'
})
export class EvolutionComponent {

  formGroup = input.required<FormGroup>();

  addEditEvolution(evolution?: Evolution): void {
    if (!!evolution) {}
    else {}
  }

  deleteEvolution(index: number): void {
    this.evolutionArray.removeAt(index);
  }
  
  get evolutionArray(): FormArray {
    console.log(this.formGroup().get('evolucoes'));
    
    return this.formGroup().get('evolucoes') as FormArray;
  }
}
