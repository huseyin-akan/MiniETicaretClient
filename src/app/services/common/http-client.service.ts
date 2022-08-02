import { Inject, Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(
    private httpClient : HttpClient,
    @Inject("baseApiUrl") //app.module.ts dosyasında providers kısmındaki objeyi enjekte etmek için kullandık.
    private baseApiUrl : string ) { }

  private url(requestParameters : Partial<RequestParameters>):string{    
    let url = "";
    if(requestParameters.baseUrl) url += requestParameters.baseUrl 
    else url += this.baseApiUrl;
    
    url += "/" + requestParameters.controller;

    if(requestParameters.action) url += "/" + requestParameters.action
    return  url;
  }

  get<T>(requestParameters : Partial<RequestParameters>, id?:string) : Observable<T>{
    let url :string = "";
    
    if(requestParameters.fullEndPoint){
      url = requestParameters.fullEndPoint;
    }else{
      url = this.url(requestParameters) + `${id? `/${id}` : ''}`;
    }
    
    if(requestParameters.queryString){
      url += '?' + requestParameters.queryString;
    }

    return this.httpClient.get<T>(url, {headers:requestParameters.headers})
  }

  post<T>(requestParameters : Partial<RequestParameters>, body: Partial<T>) : Observable<T>{
    let url :string = "";
    if(requestParameters.fullEndPoint){
      url = requestParameters.fullEndPoint;
    }else{
      url = this.url(requestParameters);
    }

    if(requestParameters.queryString){
      url += '?' + requestParameters.queryString;
    }

    return this.httpClient.post<T>(url, body, {headers:requestParameters.headers})
  }

  put<T>(requestParameters : Partial<RequestParameters>, body: Partial<T>) : Observable<T>{
    let url :string = "";
    if(requestParameters.fullEndPoint){
      url = requestParameters.fullEndPoint;
    }else{
      url = this.url(requestParameters);
    }

    if(requestParameters.queryString){
      url += '?' + requestParameters.queryString;
    }

    return this.httpClient.put<T>(url, body, {headers:requestParameters.headers});
  }

  delete<T>(requestParameters : Partial<RequestParameters>, id:string): Observable<T>{
    let url :string = "";
    if(requestParameters.fullEndPoint){
      url = requestParameters.fullEndPoint;
    }else{
      url = this.url(requestParameters) +'/'+ id;
    }

    if(requestParameters.queryString){
      url += '?' + requestParameters.queryString;
    }

    return this.httpClient.delete<T>(url, {headers:requestParameters.headers});
  }
}

export class RequestParameters{
  controller? : string;
  action?: string;
  headers?: HttpHeaders;
  baseUrl?: string;
  fullEndPoint?: string;
  queryString?: string;
}