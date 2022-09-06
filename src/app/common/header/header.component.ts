import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username: string = '';
  
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe(
      (user: User) => {
        if (user.data) {
          this.username = user.data.name;
        }
      }
    )
  }

  onLogOut() {
    this.username = '';
    this.authService.setAuthentiate(false);
    this.authService.setUser(null);
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}
