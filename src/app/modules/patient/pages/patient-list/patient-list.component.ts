import { Component, signal, OnInit } from '@angular/core';
import { TableColumn, TableComponent } from '../../../../shared/components/table/table.component';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.scss'
})
export class PatientListComponent implements OnInit {

  columns: TableColumn[] = [
    { key: 'id', title: 'ID' },
    { key: 'name', title: 'Name' },
    { key: 'email', title: 'Email' },
  ];

  data = signal<any[]>([]);
  displayedColumns: string[] = ['id', 'name', 'email'];  


  ngOnInit(): void {
    const arr = [
      { id: 1, name: 'TEste 123 ', email: 'aaaaaaa@aaa.com' },
      { id: 2, name: 'TEste 123 ', email: 'bbbbbbbb@b.com' },
      { id: 2, name: 'TEste 123 ', email: 'cccccc@c.com' },
    ]
    this.data.set(arr);
  }

}
