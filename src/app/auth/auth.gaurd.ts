import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot
} from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | Promise<boolean> {

        let sessionToken = sessionStorage.getItem('token');
        let sessionUser = sessionStorage.getItem('user');

        let isAuthenticated = this.authService.isAuthenticate();

        if (!isAuthenticated) {
            if (sessionToken && sessionUser) {
                this.authService.setAuthentiate(true);
                this.authService.setUser(JSON.parse(sessionUser));
                return true;
            }
            this.router.navigate(['/login']);
        }
        return isAuthenticated;
    }
}