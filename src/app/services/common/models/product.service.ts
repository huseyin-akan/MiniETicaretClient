import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { ListProduct } from 'src/app/contracts/list-product';
import { CreateProduct } from 'src/app/contracts/product';
import { __values } from 'tslib';
import { AlertifyService, MessageType } from '../../admin/alertify.service';
import { HttpClientService } from '../http-client.service';
import { IModelService } from './iModelService';

@Injectable({
  providedIn: 'root'
})
export class ProductService implements IModelService{

  constructor(private httpClient: HttpClientService    ,
    private alertify : AlertifyService) { }

  createProduct(product:CreateProduct, successCallBack?:any, errorCallBack?: (errorMessage : string) => void ){
    this.httpClient.post({
      controller: 'products',
      action : 'addproduct',
    }, product).subscribe({
      next: (response) => {
        successCallBack();
      },
      error : (err : HttpErrorResponse) => {
        const myError : Array<{key: string, value: Array<string>}>= err.error; 
        let message = "";
        myError.forEach( (v, index)  => {
          v.value.forEach( (_v, _index) => {
            message += `${_v}<br>`;
          })
        }) 
        errorCallBack(message);      
      }
    });    
  }

  async getAllProducts(page: number = 0, size : number = 5, successCallBack?: () => void, errorCallBack?: (errorMessage : string) => void) : Promise<{totalCount: number, result: ListProduct[]}>{
    const promiseData : Promise<{totalCount: number, result: ListProduct[]}> = this.httpClient.get<{totalCount: number, result: ListProduct[]}>({
      controller: 'products',
      action : 'getall',
      queryString : `page=${page}&size=${size}`
    }).toPromise();

    promiseData
    .then( d => successCallBack() ) //success olursa buraya
    .catch( (err : HttpErrorResponse) => errorCallBack(err.message) );  //error olursa buraya girecek kod.

    return await promiseData;
  }

  async delete(id : string){
    const deleteObservable :Observable<any> = this.httpClient.delete({
      controller:"products",
      action :"deleteproduct"
    }, id)

    await lastValueFrom(deleteObservable)
    .then()
    .catch( (err: HttpErrorResponse )=> this.alertify.message('Ürün silerken hata oldu: ' + err.error, {messageType : MessageType.Success}));
  }  
}
