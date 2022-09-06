import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headers: any = { 
            'Content-Type': 'application/json'
        };

        const token = sessionStorage.getItem('token');
 
        if (token) {
            headers['token'] = `${token}`;
        }

        const authReq = req.clone({ setHeaders: headers });
        return next.handle(authReq);
    }
}