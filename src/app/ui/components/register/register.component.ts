import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { CustomToastrService, ToastrMessagePosition, ToastrMessageType } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BaseComponent implements OnInit {

  constructor(
    private formBuilder: UntypedFormBuilder,
    //private userService: UserService,
    private toastrService: CustomToastrService,
    spinner: NgxSpinnerService) {
    super(spinner)
  }

  registerForm: UntypedFormGroup;

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      nameSurname: ["", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)
      ]],
      username: ["", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)
      ]],
      email: ["", [
        Validators.required,
        Validators.maxLength(250),
        Validators.email
      ]],
      password: ["",
        [
          Validators.required
        ]],
      passwordConfirm: ["",
        [
          Validators.required
        ]]
    }, {
      validators: (group: AbstractControl): ValidationErrors | null => {
        let sifre = group.get("password").value;
        let sifreTekrar = group.get("passwordConfirm").value;
        return sifre === sifreTekrar ? null : { notSame: true };
      }
    })
  }

  get component() {
    return this.registerForm.controls;
  }

  submitted: boolean = false;
  async onSubmit(user: any) { //TODO-HUS any'yi User yapıcaz.
    this.submitted = true;

    if (this.registerForm.invalid)
      return;

    //const result: Create_User = await this.userService.create(user);
    const result : any = {};  //TODO-HUS bu satırı sil yukarıyı aç. 
    if (result.succeeded)
      this.toastrService.message(result.message, "Kullanıcı Kaydı Başarılı", {
        messageType: ToastrMessageType.Success,
        position: ToastrMessagePosition.TopRight
      })
    else
      this.toastrService.message(result.message, "Hata", {
        messageType: ToastrMessageType.Error,
        position: ToastrMessagePosition.TopRight
      })
  }
}
