import { Component, getNgModuleById, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { HttpClientService } from 'src/app/services/common/http-client.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {

  constructor(spinner : NgxSpinnerService, private httpClient : HttpClientService) { 
    super(spinner);
  }

  ngOnInit(): void {
    //this.showSpinner(SpinnerType.BallAtom);
    this.getall();  
  }

  addProduct(){
    this.httpClient.post({controller:'products', action : 'addproduct'}, {name : 'Semacik', stock : 5, price: 3.50, orders: []})
    .subscribe( 
      {
        next : (response) => {
          console.log(response);
      },
      error: (error) => {
        console.log('hata oldu');
        console.log(error);
      },
      complete : () => {
        console.log("istek tamamlandı");
        this.getall();
      }
      });
  }

  getall(){
    this.httpClient.get({controller : 'products', action : 'getall' }).subscribe(
      data => console.log(data)
    )
  }

}
