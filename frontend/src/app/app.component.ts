import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';

declare var gtag;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ]
})

export class AppComponent {

  constructor(
    private router: Router
  ) {
    const navEndEvents$ = this.router.events.pipe(filter(event => event instanceof NavigationEnd));
    navEndEvents$.subscribe((event: NavigationEnd) => {
      gtag('config', 'G-6SQLL8ENHZ', {
        'page_path': event.urlAfterRedirects 
      });
    })
  }

}
