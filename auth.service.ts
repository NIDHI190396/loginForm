import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor() { }

  loginDetail(userName: any, password: any): boolean {

    const user = new User();

    for (const credential of user.Credentials) {
      if (userName === credential.Username && password === credential.Password) {
        localStorage.setItem("UserCredential", JSON.stringify(credential));
        return true;
      }
    }
    return false;
  }
}



