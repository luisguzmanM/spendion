import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { AuthResponse, Login } from 'src/app/models/auth.model';
import { AuthService } from 'src/app/services/auth.service';
import { UtilsService } from 'src/app/services/utils.service';
import { LogoComponent } from 'src/app/components/logo/logo.component';
import { SharedConstants } from 'src/app/shared/shared.constants';
import { IllustrationComponent } from 'src/app/components/illustration/illustration.component';
import { CreatorComponent } from 'src/app/components/creator/creator.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    LogoComponent,
    IllustrationComponent,
    CreatorComponent
  ],
  providers: [AuthService, UtilsService]
})

export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]),
  })

  loading: boolean = false;
  illustration: string = SharedConstants.ILLUSTRATION.LOGIN;
  message: string = 'We help you save money by establishing budgets for each area of your life';

  constructor(
    private _AuthSvc: AuthService,
    private _utilSvc: UtilsService,
    private _router: Router
  ) { }

  login(): void {
    const user = this.buildUserObject()
    this.callLoginService(user)
  }

  buildUserObject(): Login {
    return {
      email: this.form.controls.email.value,
      password: this.form.controls.password.value,
    }
  }

  callLoginService(userData: Login) {
    this.loading = true;
    this._AuthSvc.login(userData).subscribe({
      next: (res) => this.handleResponse(res),
      error: (err) => this.handleError(err)
    })
  }

  handleResponse(res:AuthResponse): void {
    const { msj } = res;
    this._utilSvc.openSnackBar(msj, 'Close')
    localStorage.setItem('token', res.token);
    localStorage.setItem('person', JSON.stringify(res.person));
    this.loading = false;
    this._router.navigate(['/home'])
  }

  handleError(err:any): void {
    this._utilSvc.openSnackBar(err.error.msj, 'Close')
    this.loading = false;
  }
}