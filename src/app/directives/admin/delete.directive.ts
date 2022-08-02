import { ProductService } from 'src/app/services/common/models/product.service';
import { Directive, ElementRef, HostListener, Input, Output, Renderer2, EventEmitter } from '@angular/core';
declare var $:any;

@Directive({
  selector: '[appDelete]'
})
//Note: This delete directive should be called to use as in td delete icons for deleting purposes.
export class DeleteDirective {
  
  constructor(
    private element : ElementRef,
    private renderer : Renderer2,
    private productService : ProductService) 
  {
    const img = renderer.createElement("img");
    img.setAttribute("src", "../../../../../assets/delete.png");
    img.setAttribute("style", "cursor:pointer");
    img.width = 25;
    img.height = 25;
    renderer.appendChild(element.nativeElement, img);
  }

  @Input()
  id : string;

  @Output()
  callbackForDel : EventEmitter<any> = new EventEmitter();
   
  @HostListener("click")
  async onClick(){
    const td :HTMLTableCellElement = this.element.nativeElement;
    const tr = td.parentElement;

    await this.productService.delete(this.id);
    $(tr).fadeOut(2000, this.callbackForDel.emit() );    
  }

}
