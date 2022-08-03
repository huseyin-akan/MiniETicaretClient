import { HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { AlertifyService, MessagePosition, MessageType } from '../../admin/alertify.service';
import { CustomToastrService, ToastrMessagePosition, ToastrMessageType } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  constructor(private httpClient : HttpClientService,
    private alertifyService : AlertifyService,
    private customToastrService : CustomToastrService) { }

  public files: NgxFileDropEntry[];

  @Input()
  fileUploadOptions: Partial<FileUploadOptions>;

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData : FormData = new FormData();
    const successMessage : string = "Dosyalar başarıyla yüklenmiştir.";
    const errorMessage : string = "Dosya yükleme esnasında beklenmedik bir hata oluştu";

    for(const file of files){
      (file.fileEntry as FileSystemFileEntry).file( (_file : File) => {
        fileData.append(_file.name, _file, file.relativePath)
      })
    }

    this.httpClient.post({
      controller: this.fileUploadOptions.controller,
      action : this.fileUploadOptions.action,
      queryString : this.fileUploadOptions.queryString,
      headers: new HttpHeaders({"responseType" : "blob"})
    }, fileData).subscribe({
      next: (response) => {
        if(this.fileUploadOptions.isAdminPage){
          this.alertifyService.message(successMessage, {dismissOthers : true, messageType : MessageType.Success, messagePosition : MessagePosition.TopRight})
        }else{
          this.customToastrService.message(successMessage, 'Yükleme Başarılı', {messageType : ToastrMessageType.Success, position : ToastrMessagePosition.TopRight})
        }
      },
      error: (err) => {
        if(this.fileUploadOptions.isAdminPage){
          this.alertifyService.message(errorMessage, {dismissOthers : true, messageType : MessageType.Error, messagePosition : MessagePosition.TopRight})
        }else{
          this.customToastrService.message(errorMessage, 'Yükleme Başarısız', {messageType : ToastrMessageType.Error, position : ToastrMessagePosition.TopRight})
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
