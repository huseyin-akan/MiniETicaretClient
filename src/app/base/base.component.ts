import { OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";

export class BaseComponent{

  constructor(
    private spinner : NgxSpinnerService
  ) {
        
  }

  showSpinner(spinnerNameType: SpinnerType){
    this.spinner.show(spinnerNameType);
    setTimeout( () => this.hideSpinner(spinnerNameType), 600);
  }

  hideSpinner(spinnerNameType: SpinnerType){
    this.spinner.hide(spinnerNameType);
  }
}

//Not: Burda yer alan s1, s2, s3 app.component.html dosyasındaki spinner komponentlerinin name attribute'ünü ifade eder.
export enum SpinnerType{  
  BallAtom = "spinner1",
  BallScaleMultiple = "spinner2",
  BallSpinClockWiseFadeRotating = "spinner3"
}