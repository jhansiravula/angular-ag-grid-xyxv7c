import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { DataSourceService } from './data-source.service';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  imports:      [ 
    BrowserModule,
    FormsModule,
    AgGridModule.withComponents([LoadingComponent]),
  ],
  declarations: [ AppComponent, HelloComponent, LoadingComponent ],
  bootstrap:    [ AppComponent ],
  providers: [DataSourceService]
})
export class AppModule { }
