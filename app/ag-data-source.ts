import { IDatasource, IGetRowsParams } from 'ag-grid';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { Person } from './person';


export class AgDataSource implements IDatasource {
  private data$: Observable<Person[]>;
  private lastData: Person[];

  constructor(data: Observable<Person[]>, filter?: string, private timeout: number = 0) { 
    if (filter) {
      const lowerCaseFilter = filter.toLowerCase();
      const numericFilter = +filter;

      this.data$ = data.map(data => {
        return data.filter(person => {
          return person.name.toLowerCase().indexOf(lowerCaseFilter) >= 0 || 
            person.profession.toLocaleLowerCase().indexOf(lowerCaseFilter) >= 0 ||
            person.age === numericFilter || 
            numericFilter >= 100 && person.salary >= numericFilter;
        });
      });
    } else {
      this.data$ = data;
    }   

    this.data$.subscribe(data => this.lastData = data); 
  }
  
  getRows(params: IGetRowsParams): void {
    setTimeout(() => {
      params.successCallback(
        this.lastData.slice(params.startRow, params.endRow), this.lastData.length
      );
    }, this.timeout);
  } 
}