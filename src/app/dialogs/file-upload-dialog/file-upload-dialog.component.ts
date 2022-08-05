import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BaseDialog } from '../base/base-dialog';

@Component({
  selector: 'app-file-upload-dialog',
  templateUrl: './file-upload-dialog.component.html',
  styleUrls: ['./file-upload-dialog.component.scss']
})
export class FileUploadDialogComponent extends BaseDialog<FileUploadDialogComponent> {

  constructor(dialogRef : MatDialogRef<FileUploadDialogComponent>) {
    super(dialogRef);
   }
   data;
  ngOnInit(): void {
  }

}

export enum FileUploadDialogState{
  Yes,
  No
}
