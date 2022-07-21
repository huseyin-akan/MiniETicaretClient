import { Injectable } from '@angular/core';
declare var alertify : any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() {
  }

  message(message: string, alertifyOptions : Partial<AlertifyOptions> )
  {    
    alertify.set('notifier','position', alertifyOptions.messagePosition); 
    alertify.set('notifier','delay', alertifyOptions.delay);      
    const msg = alertify[alertifyOptions.messageType](message);
    if(alertifyOptions.dismissOthers){
      msg.dismissOthers();
    }
  }

  dismissAll(){
    alertify.dismissAll();
  }
}
export class AlertifyOptions{
  messageType: MessageType = MessageType.Message;
  messagePosition : MessagePosition = MessagePosition.TopRight;
  delay : number = 3;
  dismissOthers : boolean = false;
}

export enum MessageType{
  Error = "error",
  Message = "message",
  Notify = "notify",
  Success = "success",
  Warning = "warning"
}

export enum MessagePosition{
  TopRight = 'top-right',
  TopCenter = 'top-center',
  TopLeft = 'top-left',
  BottomRight = 'bottom-right',
  BottomCenter = 'bottom-center',
  BottomLeft = 'bottom-left'
}