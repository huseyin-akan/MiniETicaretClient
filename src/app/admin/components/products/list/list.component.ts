import { SelectProductImageDialogComponent } from './../../../../dialogs/select-product-image-dialog/select-product-image-dialog.component';
import { DialogService } from './../../../../services/common/dialog.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListProduct } from 'src/app/contracts/list-product';
import { AlertifyService, MessagePosition, MessageType } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';
declare var $: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit  {

  constructor(
    spinner: NgxSpinnerService,
    public productService : ProductService,
     private alertify : AlertifyService,
     private dialogService : DialogService
     ) { 
    super(spinner);
  }

  displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate' , 'updatedDate', 'photos', 'edit', 'delete'];
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
  
  delete(id : string, event){
    const img : HTMLImageElement = event.srcElement;
    const rowToDelete = img.parentElement.parentElement;
    $(rowToDelete).fadeOut(2000);
  }

  addProductImages(id : string){
    this.dialogService.openDialog({
      componentType : SelectProductImageDialogComponent,
      data : id,
      options: {
        width: "1400px"
      }
    });
  }

}
