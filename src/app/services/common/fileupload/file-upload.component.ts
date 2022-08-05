import { HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { FileUploadDialogComponent, FileUploadDialogState } from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';
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
    private customToastrService : CustomToastrService,
    private dialog : MatDialog
    ) { }

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

    this.openDialog( () => {
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
    });
    
  }

  openDialog(afterClosed: any): void {
    const dialogRef = this.dialog.open(FileUploadDialogComponent, {
      width: '250px',
      data: FileUploadDialogState.Yes,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == FileUploadDialogState.Yes) {
        afterClosed();
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


