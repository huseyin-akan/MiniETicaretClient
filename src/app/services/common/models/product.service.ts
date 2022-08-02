import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { ListProduct } from 'src/app/contracts/list-product';
import { CreateProduct } from 'src/app/contracts/product';
import { __values } from 'tslib';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClientService) { }

  createProduct(product:CreateProduct, successCallBack?:any, errorCallBack?: (errorMessage : string) => void ){
    this.httpClient.post({
      controller: 'products',
      action : 'addproduct'
    }, product).subscribe({
      next: (response) => {
        alert('başarılı');
        successCallBack();
      },
      error : (err : HttpErrorResponse) => {
        alert('hata oluştu');
        const myError : Array<{key: string, value: Array<string>}>= err.error; 
        let message = "";
        myError.forEach( (v, index)  => {
          v.value.forEach( (_v, _index) => {
            message += `${_v}<br>`;
          })
        }) 
        errorCallBack(message);      
      },
      complete : () => {
        
      }
    });

    this.httpClient.post({
      controller: 'products',
      action : 'addproduct'
    }, product).subscribe(
      (response) => {

      },
      (err) => {
        
      }
    );
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

    await firstValueFrom(deleteObservable);
  }
  
}
