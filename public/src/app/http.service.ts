import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  getCakes(){
    return this._http.get('/cakes');
  }

  getOneCake(id){
    return this._http.get(`/cake/${id}`)
  }

  addCake(newCake){
    return this._http.post('/cake', newCake)
  }

  addRate(id, newRate){
    return this._http.post(`/cake/${id}`, newRate)
  }

}
