import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentDayAnomaliesComponent } from './current-day-anomalies.component';



@NgModule({
  declarations: [
    CurrentDayAnomaliesComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    CurrentDayAnomaliesComponent
  ]
})
export class CurrentDayAnomaliesModule { }
