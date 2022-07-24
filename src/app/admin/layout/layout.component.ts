import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AlertifyService, MessagePosition, MessageType } from 'src/app/services/admin/alertify.service';
import { CustomToastrService, ToastrMessagePosition, ToastrMessageType } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(
    private alertifyService : AlertifyService,
    private toastrService : CustomToastrService,
    private toastr : ToastrService,
    private spinner : NgxSpinnerService
    ) {    
  }

  ngOnInit(): void {
    this.alertifyService.message("Husolandınız", {messageType:MessageType.Message, messagePosition : MessagePosition.TopCenter});
    this.toastrService.message("Husoka","Husolar", {messageType: ToastrMessageType.Error, position : ToastrMessagePosition.TopFullWidth});
  }

}
