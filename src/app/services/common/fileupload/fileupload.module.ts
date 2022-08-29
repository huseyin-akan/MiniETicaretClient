import { FileUploadDialogComponent } from './../../../dialogs/file-upload-dialog/file-upload-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxFileDropModule } from 'ngx-file-drop';
import { FileUploadComponent } from './file-upload.component';
import { DialogModule } from 'src/app/dialogs/dialog.module';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    FileUploadComponent,
    FileUploadDialogComponent
  ],
  imports: [
    CommonModule,
    NgxFileDropModule,
    MatDialogModule
  ],
  exports: [
    FileUploadComponent
  ]
})
export class FileuploadModule { }
