import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnomalyData } from '../anomalyData/anomaly-data';

@Injectable({
  providedIn: 'root'
})
export class CurrentDayAnomaliesService {

  private apiUrl="http://localhost:3006/data";

  constructor(private http:HttpClient) { }

  getHourlyAnomalyData(startTime: string, endTime: string): Observable<AnomalyData[]> {
    // Adjust parameters and API call as per your API structure
    //const url = `${this.apiUrl}/anomaly-data?startTime=${startTime}&endTime=${endTime}`;
    return this.http.get<AnomalyData[]>(this.apiUrl);
  }
}
