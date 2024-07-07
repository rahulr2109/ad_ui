import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WeeklyDataEntry } from '../WeeklyDataEntry/weekly-data-entry';

@Injectable({
  providedIn: 'root'
})
export class Get7DaysDataServiceService {

  private apiUrl="http://localhost:3005/data";
  constructor(private http:HttpClient) { }

  getData():Observable<WeeklyDataEntry[]>{
    return this.http.get<WeeklyDataEntry[]>(this.apiUrl)
  }
}
