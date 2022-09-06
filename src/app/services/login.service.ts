import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { User } from '../models/User';

const apiUrl = environment.apiUrl;

@Injectable({providedIn: 'root'})

export class loginService {
  constructor(private httpClient: HttpClient) { }

  loginUser( email:string, password: string ): Observable<User> {
    const body = {
      email: email,
      password: password
    }
    const url = `${apiUrl}/login`;
    return this.httpClient.post<User>(url, body);
  }

  registerUser(data: any): Observable<User> {
    const url = `${apiUrl}/register`;
    return this.httpClient.post<User>(url, data);
  }
  
}