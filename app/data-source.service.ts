import { Injectable } from '@angular/core';
import { IDatasource} from 'ag-grid';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/merge';

import { Person } from './person';
import { AgDataSource } from './ag-data-source';

@Injectable()
export class DataSourceService {
  private data$: Observable<Person[]>;
  private changes$: Subject<Person>;

  constructor() {
    const initialData = this.getInitialData();

    this.changes$ = new Subject<Person>();

    this.data$ = this.changes$.scan(
      (data: Person[], change: Person): Person[] => {
        const copy = data.slice();

        copy[+change.id] = change;

        return copy;
      }, 
      initialData
    )
    .merge(
      Observable.of(initialData)
    );
  }

  private getInitialData(): Person[] {
    const data: Person[] = [];

    for (let i = 0; i < 5000; i++) { // Create some bullshit list of persons
      data.push({
        id: i.toString(),
        name: this.randomChoice([
          'Bartek',
          'Ala',
          'Marcin',
          'Paweł',
          'Dagmara',
          'Mariusz',
          'Marcel',
          'Maurycy',
          'Dariusz',
          'Ignacy',
          'Karolina',
          'Agnieszka',
          'Paulina',
          'Anna'
        ]),
        age: Math.floor(Math.random() * 60) + 20,
        profession: this.randomChoice([
          'soldier',
          'politican',
          'programmer',
          'doctor',
          'plumber'
        ]),
        salary: this.randomChoice([2000, 2500, 3000, 4000, 4521, 10000])
      });
    }

    return data;
  }

  randomChoice<T>(values: T[]): T {
    const index = Math.floor(Math.random() * values.length);

    return values[index];
  }

  getDataSource(timeout: number, filter?: string): IDatasource {
    return new AgDataSource(this.data$, filter, timeout);
  }

  update(person: Person) {
    this.changes$.next(person);
  }

  get updates$(): Observable<Person> {
    return this.changes$.asObservable();
  }
}