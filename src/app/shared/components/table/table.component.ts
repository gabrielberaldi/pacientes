import { NgFor, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { Component, effect, input } from '@angular/core';
import { NbButtonModule, NbCardModule, NbIconModule, NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder, NbTreeGridModule } from '@nebular/theme';

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

// interface FSEntry {
//   name: string;
//   size: string;
//   kind: string;
//   items?: number;
// }

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [ NbTreeGridModule, NbCardModule, NgFor, NbButtonModule, NgSwitch, NgSwitchDefault, NgSwitchCase, NbIconModule ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

  columns = input.required<string[]>();
  data = input.required<any[]>();
  sortColumn = input<string>('');
  sortDirection = input<NbSortDirection>(NbSortDirection.ASCENDING);

  dataSource!: NbTreeGridDataSource<any>;


  constructor(
    private _dataSourceBuilder: NbTreeGridDataSourceBuilder<any>
  ) {
    effect(() => {
      this.dataSource = this._dataSourceBuilder.create(this.data());
    })
  }

  editRow(row: any): void {
    console.log(row, ' row');
  }

  deleteRow(row: any): void { 
    console.log('Delete row:', row);
  }

  getSortDirection(column: string): NbSortDirection {
    // return this.sortColumn === column ? this.sortDirection : NbSortDirection.NONE;
    return NbSortDirection.NONE;
  }

  updateSort(sortRequest: NbSortRequest): void {
    // this.sortColumn = sortRequest.column;
    // this.sortDirection = sortRequest.direction;
  }

  // private data: TreeNode<FSEntry>[] = [
  //   { data: { name: 'project-1.doc', kind: 'doc', size: '240 KB', items: 1 } },
  //   { data: { name: 'project-2.doc', kind: 'doc', size: '290 KB', items: 1 } },
  //   { data: { name: 'project-3A.doc', kind: 'doc', size: '200 KB', items: 1 } },
  //   { data: { name: 'project-3B.doc', kind: 'doc', size: '266 KB', items: 1 } },
  //   { data: { name: 'project-4.docx', kind: 'docx', size: '900 KB', items: 1 } },
  //   { data: { name: 'backup.bkp', kind: 'bkp', size: '107 MB', items: 1 } },
  //   { data: { name: 'secret-note.txt', kind: 'txt', size: '2 MB', items: 1 } },
  // ];

}
