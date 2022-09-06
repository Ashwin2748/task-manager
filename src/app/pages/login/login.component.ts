import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { loginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  emailAddress: any;
  password: any;
  

  constructor(private router: Router, 
    private loginService: loginService,
    private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.loginService.loginUser(this.emailAddress, this.password).subscribe(
        (loggedInUser: User) => {
          sessionStorage.setItem('token', loggedInUser.data.token);
          sessionStorage.setItem('user', JSON.stringify(loggedInUser));
          this.authService.setAuthentiate(true);
          this.authService.setUser(loggedInUser);
          this.router.navigate(['/view']);
        },
        (error) => {
          if (error.status === 404 || error.status === 401) {
            alert(error.error.message);
          } else {
            alert('Unable to login, Please try again later !');
          }
          form.reset();
        }
      )
    }
  }

  navigateTo() {
    this.router.navigate(['/signup']);
  }

}
