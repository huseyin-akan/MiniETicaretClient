import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { User } from 'src/app/contracts/user';
import { CreateUserModel } from 'src/app/contracts/users/createUser';
import { CustomToastrService } from '../ui/custom-toastr.service';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService, private toastrService: CustomToastrService) { }

  async create(user: User): Promise<CreateUserModel> {
    const observable: Observable<CreateUserModel | User> = this.httpClientService.post<CreateUserModel | User>({
      controller: "users"
    }, user);

    return await firstValueFrom(observable) as CreateUserModel;
  }
}
