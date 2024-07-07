import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AnomalyData } from '../anomalyData/anomaly-data';

@Injectable({
  providedIn: 'root'
})
export class GetAnomalyDataService {

  private apiUrl="http://localhost:3001/data";

  constructor(private http:HttpClient) { }

  getAnomalyData(): Observable<AnomalyData[]> {
    return this.http.get<AnomalyData[]>(this.apiUrl)
    .pipe(
      catchError((error) => {
        console.error('Error fetching anomaly data:', error);
        return throwError(error);
      })
    );
  }
}
