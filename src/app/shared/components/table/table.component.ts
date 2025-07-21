import { NgFor, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { Component, effect, input, output } from '@angular/core';
import { Router } from '@angular/router';
import { NbButtonModule, NbCardModule, NbFormFieldModule, NbIconModule, NbInputModule, NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder, NbTreeGridModule } from '@nebular/theme';
import { TableEvent } from './model/table-event.model';

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [ NbTreeGridModule, NbCardModule, NgFor, NbButtonModule, NgSwitch, NgSwitchDefault, NgSwitchCase, NbIconModule, NbInputModule, NbFormFieldModule ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

  columns = input.required<string[]>();
  data = input.required<TreeNode<any>[]>();
  dataSource!: NbTreeGridDataSource<any>;
  sortColumn = input<string>('');
  sortDirection = input<NbSortDirection>(NbSortDirection.ASCENDING);

  event = output<TableEvent<any>>()

  constructor(
    private _dataSourceBuilder: NbTreeGridDataSourceBuilder<any>,
    private _router: Router
  ) {
    effect(() => { this.dataSource = this._dataSourceBuilder.create(this.data()); })
  }

  add(): void {
    this._router.navigate(['/layout/patient/edit']);
    this.event.emit({ action: 'add' });
  }

  edit({ data }: TreeNode<any>): void {
    this.event.emit({ action: 'edit', data });
  }

  delete({ data }: TreeNode<any>): void { 
    this.event.emit({ action: 'delete', data });
  }

  getSortDirection(column: string): NbSortDirection {
    // return this.sortColumn === column ? this.sortDirection : NbSortDirection.NONE;
    return NbSortDirection.NONE;
  }

  updateSort(sortRequest: NbSortRequest): void {
    // this.sortColumn = sortRequest.column;
    // this.sortDirection = sortRequest.direction;
  }

 
 
}
