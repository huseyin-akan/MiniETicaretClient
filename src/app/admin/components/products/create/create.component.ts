import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreateProduct } from 'src/app/contracts/product';
import { AlertifyService, MessageType } from 'src/app/services/admin/alertify.service';
import { FileUploadOptions } from 'src/app/services/common/fileupload/file-upload.component';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {

  constructor(private productService : ProductService,
     spinner : NgxSpinnerService,
     private alertify : AlertifyService) {
    super(spinner);
   }

  ngOnInit(): void {
  }

  @Output() uploadOptions: Partial<FileUploadOptions> = {
    action : 'uploadimage',
    controller : 'products',
    explanation: 'Resimleri sürükleyin ya da ekleyin...',
    isAdminPage : true,
    accept : ".jpg, .png, .jpeg"
  };

  @Output() createdProduct : EventEmitter<CreateProduct> = new EventEmitter();

  create(name : HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement){
    this.showSpinner(SpinnerType.BallAtom);
    const createProduct : CreateProduct = new CreateProduct();
    createProduct.name = name.value;
    createProduct.stock = parseInt(stock.value);
    createProduct.price = parseFloat(price.value);

    this.productService.createProduct(createProduct,
      () => {
      this.hideSpinner(SpinnerType.BallAtom)
      this.alertify.message("Ürün başarıyla eklenmiştir.", {
        dismissOthers : true,
        messageType : MessageType.Success
      })
      this.createdProduct.emit(createProduct);
    },
    errMsg => {
      this.alertify.message(errMsg, {
        dismissOthers : true,
        messageType : MessageType.Error
      })      
    } );
  }

}
