import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new Subject<any>();
  isAuthenticated: boolean = false;

  constructor() { }

  isAuthenticate() {
    return this.isAuthenticated;
  }

  setAuthentiate(value: boolean) {
    this.isAuthenticated = value;
  }

  setUser(user: any) {
    this.user.next(user);
  }

  getUser(): Observable<User> {
    return this.user.asObservable();
  }

}
