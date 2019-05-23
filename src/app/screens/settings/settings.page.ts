/* Core */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/* Services */
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

}
