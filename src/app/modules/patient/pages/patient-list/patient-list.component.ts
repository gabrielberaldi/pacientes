import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { PatientService } from '../../services/patient.service';
import { PatientList } from '../../models/patient-list.model';
import { TreeNode } from '../../../../shared/components/table/model/tree-node.model';
import { formatDate } from '@angular/common';
import { TableEvent } from '../../../../shared/components/table/model/table-event.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.scss'
})
export class PatientListComponent implements OnInit {

  columns = ['id', 'nome', 'dataNascimento', 'sexo', 'nomeMae', 'actions'];
  data: TreeNode<PatientList>[] = [];

  constructor(
    private _patientService: PatientService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._patientService.getAll().subscribe(patients => {
      this.data = patients.map(patient => ({
        ...patient,
        data: {
          ...patient.data,
          dataNascimento: formatDate(patient.data.dataNascimento, 'dd/MM/yyyy', 'pt-BR')
        }
      }));
    });
  }

  onEvent({ action, data }: TableEvent<PatientList>): void { 
    switch (action) {
      case 'add': return this._add();
      case 'edit': return this._edit(data as PatientList);
      case 'delete': return this._delete(data as PatientList);
    }
  }

  private _add(): void {
    this._router.navigate([`/layout/patient/edit`]);
  }

  private _edit(data: PatientList) {
    this._router.navigate([`/layout/patient/edit/${data.id}`]);
  }

  private _delete(data: PatientList) {
    this._patientService.delete(data.id).subscribe(() => {});
  }

}
