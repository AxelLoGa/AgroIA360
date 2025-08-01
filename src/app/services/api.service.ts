import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
   private baseUrl = 'https://final-project-api-production-c94c.up.railway.app/api';

  constructor(private http: HttpClient) { }

   getTemperatura(): Observable<any> {
    return this.http.get(`${this.baseUrl}/temperatura`);
  }

  getHumedad(): Observable<any> {
    return this.http.get(`${this.baseUrl}/humedad`);
  }

  getHumedadTierra(): Observable<any> {
    return this.http.get(`${this.baseUrl}/humedad_tierra`);
  }

  getMediciones(): Observable<any> {
    return this.http.get(`${this.baseUrl}/mediciones`);
  }
  getHora(): Observable<any> {
    return this.http.get(`${this.baseUrl}/hora`)
  }
  getEstadoValvula(): Observable<any>{
    return this.http.get(`${this.baseUrl}/estado_valvula`)
  }
}