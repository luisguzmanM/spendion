import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  URL_BACKEND: string = API_URL + '/setting';

  constructor(
    private _httpClient : HttpClient
  ) { }

  updateDataUser(payload:any):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._httpClient.post<any>(`${this.URL_BACKEND}/updateDataUser`, payload, {headers: headers})
  }
}
