import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service';
declare var M: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'avis';
  constructor(private router: Router, public authservice: AuthService) {
    this.crearDrop();
  }

  ngOnInit() {
    //captura los eventos del navegador
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
          console.log('Event generated');
      }
    });
    if (!this.authservice.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }
  logout(): void {
    this.authservice.logout();
    this.router.navigate(['/']);
  }
  crearDrop(): void {
    //dropdown config
    document.addEventListener('DOMContentLoaded', () => {
      var elems = document.querySelectorAll('.dropdown-trigger');
      var instances = M.Dropdown.init(elems, {
        coverTrigger: false,
        constrainWidth: true
      });
    });
  }

}
