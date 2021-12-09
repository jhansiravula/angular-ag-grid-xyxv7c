import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridNg2 } from 'ag-grid-angular';
import { IDatasource, CellClickedEvent } from 'ag-grid';

import { DataSourceService } from './data-source.service';
import { LoadingComponent } from './loading/loading.component';
import { Person } from './person';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent {
  name = 'Angular 5';
  rowData: Object[];
  colDefinitions = [
    {headerName: 'Name', field: 'name', cellRendererFramework: LoadingComponent},
    {headerName: 'Age', field: 'age'},
    {headerName: 'Profession', field: 'profession'},
    {headerName: 'Salary', field: 'salary'}
  ];
  dataSource: IDatasource;
  private _timeout: number = 200;
  private _filter: string =  '';

  @ViewChild(AgGridNg2) agGrid: AgGridNg2;

  constructor(public dataSourceService: DataSourceService) {
    this.dataSource = this.dataSourceService.getDataSource(this.timeout);

    this.dataSourceService.updates$.subscribe(() => 
      this.agGrid.api.refreshInfiniteCache()
    );
  }

  onCellClicked($event: CellClickedEvent) {
    if ($event.colDef.field === 'salary') {
      const person: Person = Object.assign($event.data, {
        salary: $event.data.salary + 100
      }) as Person;

      this.dataSourceService.update(person);
    }
  }

  set filter(value: string) {
    this._filter = value;
    this.dataSource = this.dataSourceService.getDataSource(this.timeout, value);
  }

  get filter(): string {
    return this._filter;
  }

  set timeout(value: number) {
    this._timeout = value;
    this.dataSource = this.dataSourceService.getDataSource(value, this.filter);
  }

  get timeout(): number {
    return this._timeout;
  }
}
