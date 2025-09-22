import { Component, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NbDatepickerModule, NbInputModule, NbOptionModule, NbSelectModule } from '@nebular/theme';
import { Option } from '../../../../shared/model/option.model';
import { PhoneMaskDirective } from '../../../../shared/directive/phone-mask.directive';
import { SessionDay } from '../../../../shared/enum/session-day.enum';
import { StreetType } from '../../../../shared/enum/street-type.enum';

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [ PhoneMaskDirective, NbInputModule, NbOptionModule, NbSelectModule, NbDatepickerModule, ReactiveFormsModule],
  templateUrl: './information.component.html',
  styleUrl: './information.component.scss'
})
export class InformationComponent {

  formGroup = input.required<FormGroup>();
  genderOptions: Option<string>[] = [
    { value: 'M', label: 'Masculino' },
    { value: 'F', label: 'Feminino' },
  ];
  streetTypes: Option<StreetType>[] = Object.values(StreetType).map(value => ({ label: value, value }));
  weekDays: Option<SessionDay>[] = Object.values(SessionDay).map(value => ({ label: value, value }));

  getControl(name: string): FormControl {
    return this.formGroup().get(name) as FormControl;
  }

}
