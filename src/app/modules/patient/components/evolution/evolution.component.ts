import { Component, input } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbDatepickerModule, NbInputModule, NbListModule } from '@nebular/theme';
import { Evolution } from '../../models/evolution.model';

@Component({
  selector: 'app-evolution',
  standalone: true,
  imports: [NbListModule, NbCardModule, NbButtonModule, FormsModule, NbInputModule, NbDatepickerModule],
  templateUrl: './evolution.component.html',
  styleUrl: './evolution.component.scss'
})
export class EvolutionComponent {

  formGroup = input.required<FormGroup>();

  evolutions: Evolution[] = [
    {
      id: 1,
      patientId: 123,
      date: '2025-07-20',
      text: 'Paciente apresentou melhora significativa na mobilidade do joelho esquerdo.'
    },
    {
      id: 2,
      patientId: 123,
      date: '2025-07-15',
      text: 'Queixas de dor moderada durante a manhã, recomendada fisioterapia.'
    },
    {
      id: 3,
      patientId: 123,
      date: '2025-07-10',
      text: 'Primeira avaliação, paciente com limitação de movimento e dor aguda.'
    }
  ]


  saveEvolution(any: any): void {

  }

  deleteEvolution(any: any): void {

  }

  addEvolution(): void {

  }
}
