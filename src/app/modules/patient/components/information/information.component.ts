import { Component, Input, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NbDatepickerModule, NbInputModule, NbOptionModule, NbSelectModule } from '@nebular/theme';
import { Option } from '../../../../shared/model/option.model';
import { SessionDay } from '../../models/session-day.enum';
import { PhoneMaskDirective } from '../../../../shared/directive/phone-mask.directive';

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [ PhoneMaskDirective, NbInputModule, NbOptionModule, NbSelectModule, NbDatepickerModule, ReactiveFormsModule],
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
  ];

  genderOptions: Option<string>[] = [
    { value: 'M', label: 'Masculino' },
    { value: 'F', label: 'Feminino' },
  ]

  getControl(name: string): FormControl {
    return this.formGroup().get(name) as FormControl;
  }

}
