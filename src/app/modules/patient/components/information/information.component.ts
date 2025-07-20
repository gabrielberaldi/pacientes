import { Component, input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NbDatepickerModule, NbInputModule, NbOptionModule, NbSelectModule } from '@nebular/theme';
import { Option } from '../../../../shared/model/option.model';
import { SessionDay } from '../../models/session-day.enum';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [ NbInputModule, NbOptionModule, NbSelectModule, NgFor, NbDatepickerModule],
  templateUrl: './information.component.html',
  styleUrl: './information.component.scss'
})
export class InformationComponent {

  formGroup = input.required<FormGroup>();

  weekDays: Option<SessionDay>[] = [ 
    { value: SessionDay.MONDAY, label: 'Segunda-Feira' },
    { value: SessionDay.TUESDAY, label: 'Terça-Feira' },
    { value: SessionDay.WEDNESDAY, label: 'Quarta-Feira' },
    { value: SessionDay.THURSDAY, label: 'Quinta-Feira' },
    { value: SessionDay.FRIDAY, label: 'Sexta-Feira' },
    { value: SessionDay.SATURDAY, label: 'Sábado' },
    { value: SessionDay.SUNDAY, label: 'Domingo' }
  ]

}
