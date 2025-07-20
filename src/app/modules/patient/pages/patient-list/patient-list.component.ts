import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { PatientService } from '../../services/patient.service';
import { PatientList } from '../../models/patient-list.model';
import { TreeNode } from '../../../../shared/components/table/model/tree-node.model';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.scss'
})
export class PatientListComponent implements OnInit {

  columns = ['id', 'nome', 'dataNascimento', 'sexo', 'nomeMae', 'actions' ];
  data: TreeNode<PatientList>[] = [];

  constructor(
    private _patientService: PatientService
  ) {}

  ngOnInit(): void {
    this._patientService.getAll().subscribe(patients => this.data = patients);
  }

}
