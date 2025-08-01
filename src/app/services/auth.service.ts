import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'https://apiloginregister-production.up.railway.app';

  constructor(private http: HttpClient, private storage: Storage) {}

  login(data: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data);
  }

  register(data: { username: string, email: string, password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  async setToken(token: string) {
    localStorage.setItem('token', token);
  }

  async getToken() {
    return this.storage.get('token');
  }

  async logout() {
    await this.storage.remove('token');
  }
}

