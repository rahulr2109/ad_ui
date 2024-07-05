import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarGraphComponent } from './bar-graph.component';



@NgModule({
  declarations: [
    BarGraphComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [ BarGraphComponent ]
})
export class BarGraphModule { }
