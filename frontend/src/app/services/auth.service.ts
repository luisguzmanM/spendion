import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignUp, Login, AuthResponse } from '../models/auth.model';
import { API_URL } from './../globals'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  URL_BACKEND: string = API_URL + '/auth';

  constructor(
    private _httpClient : HttpClient
  ) { }

  signup(payload:SignUp ):Observable<AuthResponse>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._httpClient.post<AuthResponse>(`${this.URL_BACKEND}/signup`, payload, {headers: headers})
  }

  login(payload:Login ):Observable<AuthResponse>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._httpClient.post<AuthResponse>(`${this.URL_BACKEND}/login`, payload, {headers: headers})
  }

  confirmAccount(payload:any):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._httpClient.post<any>(`${this.URL_BACKEND}/confirmation`, payload, {headers: headers});
  }
}
