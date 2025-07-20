import { Component, inject } from '@angular/core';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { PatientService } from '../../services/patient.service';
import { PatientList } from '../../models/patient-list.model';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.scss'
})
export class PatientListComponent {

  columns = [ 'nome', 'idade', 'dataNascimento', 'sexo', 'nomeMae', 'actions' ];
  data: PatientList[] = [];

  constructor(
    private _patientService: PatientService
  ) {}

  ngOnInit() {
    // this._patientService.getAll().subscribe((patients: PatientList[]) => {
    //   this.data = patients;
    // });
  }

}
