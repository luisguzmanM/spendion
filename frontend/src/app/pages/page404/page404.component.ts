import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page404',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.css']
})
export class Page404Component {

  constructor(
    private _router: Router
  ){}

  returnToHome(){
    this._router.navigate(['/home']);
  }

}
