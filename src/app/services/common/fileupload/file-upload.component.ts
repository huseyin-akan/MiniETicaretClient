import { FileUploadDialogState } from './../../../dialogs/file-upload-dialog/file-upload-dialog.component';
import { FileUploadDialogComponent } from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';
import { DialogService } from './../dialog.service';
import { HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { AlertifyService, MessagePosition, MessageType } from '../../admin/alertify.service';
import { CustomToastrService, ToastrMessagePosition, ToastrMessageType } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent{

  constructor(private httpClient : HttpClientService,
    private alertifyService : AlertifyService,
    private customToastrService : CustomToastrService,
    private dialog : MatDialog,
    private dialogService : DialogService
    ) { }

  public files: NgxFileDropEntry[];
  fileData : FormData = new FormData();
  successMessage : string = "Dosyalar başarıyla yüklenmiştir.";
  errorMessage : string = "Dosya yükleme esnasında beklenmedik bir hata oluştu";

  @Input()
  fileUploadOptions: Partial<FileUploadOptions>;

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;

    for(const file of files){
      (file.fileEntry as FileSystemFileEntry).file( (_file : File) => {
        this.fileData.append(_file.name, _file, file.relativePath)
      })
    }

    this.dialogService.openDialog({
      componentType : FileUploadDialogComponent,
      data : FileUploadDialogState.Yes,
      afterClosed : () => {this.uploadFiles() }
    });
  }

  uploadFiles(){
    this.httpClient.post({
      controller: this.fileUploadOptions.controller,
      action : this.fileUploadOptions.action,
      queryString : this.fileUploadOptions.queryString,
      headers: new HttpHeaders({"responseType" : "blob"})
    }, this.fileData).subscribe({
      next: (response) => {
        if(this.fileUploadOptions.isAdminPage){
          this.alertifyService.message(this.successMessage, {dismissOthers : true, messageType : MessageType.Success, messagePosition : MessagePosition.TopRight})
        }else{
          this.customToastrService.message(this.successMessage, 'Yükleme Başarılı', {messageType : ToastrMessageType.Success, position : ToastrMessagePosition.TopRight})
        }
      },
      error: (err) => {
        if(this.fileUploadOptions.isAdminPage){
          this.alertifyService.message(this.errorMessage, {dismissOthers : true, messageType : MessageType.Error, messagePosition : MessagePosition.TopRight})
        }else{
          this.customToastrService.message(this.errorMessage, 'Yükleme Başarısız', {messageType : ToastrMessageType.Error, position : ToastrMessagePosition.TopRight})
        }
      }
    });
  }

  

  
}

export class FileUploadOptions{
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  isAdminPage?: boolean = false;
}


