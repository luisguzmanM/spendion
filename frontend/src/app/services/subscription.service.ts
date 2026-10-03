import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  URL_BACKEND: string = API_URL + '/payment';

  constructor(
    private _httpClient : HttpClient
  ) { }

  createProduct():Observable<any>{
    return this._httpClient.post(`${this.URL_BACKEND}/createProduct`, null);
  }

  createPlan(idProduct:string):Observable<any>{
    return this._httpClient.post(`${this.URL_BACKEND}/createPlan`, {product_id: idProduct});
  }

  createSubscription(payload):Observable<any>{
    return this._httpClient.post(`${this.URL_BACKEND}/createSubscription`, payload);
  }
}
