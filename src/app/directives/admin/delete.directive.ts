import { ProductService } from 'src/app/services/common/models/product.service';
import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Output,
  Renderer2,
  EventEmitter,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  DeleteDialogComponent,
  DeleteState,
} from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { IModelService } from 'src/app/services/common/models/iModelService';
import { AlertifyService, MessageType } from 'src/app/services/admin/alertify.service';
declare var $: any;

@Directive({
  selector: '[appDelete]',
})
//Note: This delete directive should be called to use as in td delete icons for deleting purposes.
export class DeleteDirective {
  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private httpClient: HttpClientService,
    public dialog: MatDialog
  ) {
    const img = renderer.createElement('img');
    img.setAttribute('src', '../../../../../assets/delete.png');
    img.setAttribute('style', 'cursor:pointer');
    img.width = 25;
    img.height = 25;
    renderer.appendChild(element.nativeElement, img);
  }

  @Input()
  id: string;

  @Input()
  serviceForDel : IModelService;

  @Output()
  callbackForDel: EventEmitter<any> = new EventEmitter();

  @HostListener('click')
  async onClick() {
    this.openDialog(async () => {
      const td: HTMLTableCellElement = this.element.nativeElement;
      const tr = td.parentElement;

      // this.httpClient.delete({
      //   controller: this.controllerForDel,
      //   action: this.actionForDel
      // }, this.id).subscribe({
      //   next: (response) => {
      //     $(tr).animate(
      //       {
      //         opacity: 0,
      //         left: '+=50',
      //         height: 'toggle',
      //       },
      //       700,
      //       this.callbackForDel.emit()
      //     );
      //   }
      // })
      await this.serviceForDel.delete(this.id);
      $(tr).animate(
        {
          opacity: 0,
          left: '+=50',
          height: 'toggle',
        },
        700,
        this.callbackForDel.emit()        
      );      
    });
  }

  openDialog(afterClosed: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: DeleteState.Yes,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == DeleteState.Yes) {
        afterClosed();
      }
    });
  }
}
