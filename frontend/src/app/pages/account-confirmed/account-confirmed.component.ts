import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from 'src/app/components/logo/logo.component';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UtilsService } from 'src/app/services/utils.service';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-account-confirmed',
  templateUrl: './account-confirmed.component.html',
  styleUrls: ['./account-confirmed.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    LogoComponent,
    RouterModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [
    AuthService,
    UtilsService
  ]
})
export class AccountConfirmedComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private _authSvc: AuthService,
  ){}

  ngOnInit(): void {
    this._route.queryParams.subscribe(params => {
      const token = params['token'];
      console.log('Confirmation token: ', token)
      if (token) {
        const obj = {
          token: token
        }
        console.log('payload :', obj)
        this._authSvc.confirmAccount(obj).subscribe({
          next: res => {
            console.log('Service confirmation response :', res);
          },
          error: err => {
            console.log('Service confirmation error: ', err)
            console.log(err)
          }
        })
      } else {
        console.log('There is an error with the url token')
      }
    });
  }

}
