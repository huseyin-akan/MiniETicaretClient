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
import { DialogService } from 'src/app/services/common/dialog.service';
import { IModelService } from 'src/app/services/common/models/iModelService';
declare var $: any;

@Directive({
  selector: '[appDelete]',
})
//Note: This delete directive should be called to use as in td delete icons for deleting purposes.
export class DeleteDirective {
  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    public dialog: MatDialog,
    private dialogService : DialogService
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
    this.dialogService.openDialog({
      componentType : DeleteDialogComponent,
      data : DeleteState.Yes,
      afterClosed : () => {this.delete() }
    });
  }

  async delete(){
    const td: HTMLTableCellElement = this.element.nativeElement;
      const tr = td.parentElement;

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
  }
}
