import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { loginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  emailAddress: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';

  constructor(private router: Router, 
    private loginService: loginService,
    private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const request = {
        emailAddress: this.emailAddress,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName
      }
      this.loginService.registerUser(request).subscribe(
        (loggedInUser: User) => {
          sessionStorage.setItem('token', loggedInUser.data.token);
          sessionStorage.setItem('user', JSON.stringify(loggedInUser));
          this.authService.setAuthentiate(true);
          this.authService.setUser(loggedInUser);
          this.router.navigate(['/view']);
        },
        (error) => {
          if (error.status === 409) {
            alert(error.error.message);
          }
          form.reset();
        }
      )
    }
  }

  navigateTo() {
    this.router.navigate(['/login']);
  }

}
