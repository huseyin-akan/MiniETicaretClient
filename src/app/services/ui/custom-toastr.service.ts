import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CustomToastrService {
  constructor(private toastr: ToastrService) {}

  message(
    message: string,
    title: string,
    toastrOptions : Partial<ToastrOptions>
  ) {
    this.toastr[toastrOptions.messageType](message, title, {positionClass : toastrOptions.position});
  }
}

export class ToastrOptions{
  messageType: ToastrMessageType;
  position: ToastrMessagePosition;
}

export enum ToastrMessageType {
  Success = 'success',
  Error = 'error',
  Info = 'info',
  Warning = 'warning',
}

export enum ToastrMessagePosition {
  TopRight = 'toast-top-right',
  BottomRight = 'toast-bottom-right',
  BottomLeft = 'toast-bottom-left',
  TopLeft = 'toast-top-left',
  TopFullWidth = 'toast-top-full-width',
  BottomFullWidth = 'toast-bottom-full-width',
  TopCenter = 'toast-top-center',
  BottomCenter = 'toast-bottom-center',
}
