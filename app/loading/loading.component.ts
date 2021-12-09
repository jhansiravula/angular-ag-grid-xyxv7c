import { Component } from '@angular/core';
import { ICellRendererAngularComp } from "ag-grid-angular";

@Component({
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements ICellRendererAngularComp {
  public name: string;

  agInit(params: any) {
    this.name = params.value;
  }

  refresh(params: any): boolean {
    this.name = params.value;

    return true;
  }
}