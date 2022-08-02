import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListProduct } from 'src/app/contracts/list-product';
import { AlertifyService, MessagePosition, MessageType } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit  {

  constructor(spinner: NgxSpinnerService, private productService : ProductService, private alertify : AlertifyService) { 
    super(spinner);
  }

  displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate' , 'updatedDate'];
  dataSource :MatTableDataSource<ListProduct>= null;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  async ngOnInit(): Promise<void> {
    await this.getProducts();
  }

  async getProducts(){
    this.showSpinner(SpinnerType.BallAtom);
    let allProducts : {totalCount: number, result: ListProduct[]} = await this.productService.getAllProducts(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5,
    () => this.hideSpinner(SpinnerType.BallAtom) ,
    (errMsg) => {
      this.alertify.message(errMsg, {messageType : MessageType.Error, dismissOthers : true, messagePosition : MessagePosition.TopRight});
    } 
    );
    this.dataSource = new MatTableDataSource<ListProduct>(allProducts.result);
    this.paginator.length = allProducts.totalCount;
    //this.dataSource.paginator = this.paginator;
  }

  async pageChanged(){
    await this.getProducts();
  }

}