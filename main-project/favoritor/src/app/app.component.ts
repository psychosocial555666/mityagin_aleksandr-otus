import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (token !== null) {
      this.userService.login('', '')
    }
  }
}
