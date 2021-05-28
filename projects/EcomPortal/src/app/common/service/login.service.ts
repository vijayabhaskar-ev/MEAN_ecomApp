import { Injectable, Inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { IUser } from './user';

import { environment } from '../../../environments/environment';
import { APP_CONFIG } from '../../material-shared/AppConfig';
import { IAppConfig } from '../../material-shared/IAppConfig';
import { IResponse } from './IResponse';
import { BehaviorSubject } from 'rxjs';
import { EncDecService } from 'projects/ecom/core/src/lib/enc-dec.service';
//import { EncDecService } from '@lips/common';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loggedIn = new BehaviorSubject<boolean>(false);
  role = new BehaviorSubject<string>('');





  constructor(private http: HttpClient,
              private encService: EncDecService,
              @Inject(APP_CONFIG) private appConfig: IAppConfig) {
    console.log(appConfig.apiEndPoint);
  }


  login(user: IUser) {
    return this.http.post<IResponse>(this.appConfig.apiEndPoint + '/user/login', user);
  }

  isLoggedIn(value?: boolean) {
    if (sessionStorage.getItem('role')) {
      this.loggedIn.next(true);
    } else {
      this.loggedIn.next(false);
    }
    return this.loggedIn.asObservable();
  }

  userRole(role?: string) {
    if (sessionStorage.getItem('role')) {
      const currentRole = this.encService.decrypt(sessionStorage.getItem('role'), '');
      this.role.next(currentRole);
    } else {
      this.role.next(role);
    }
    return this.role.asObservable();
  }

}
