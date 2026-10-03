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
import { AuthService } from 'src/app/services/auth.service';
import { SignUp } from 'src/app/models/auth.model';
import { Router, RouterModule } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { LogoComponent } from 'src/app/components/logo/logo.component';
import { IllustrationComponent } from 'src/app/components/illustration/illustration.component';
import { SharedConstants } from 'src/app/shared/shared.constants';
import { CreatorComponent } from 'src/app/components/creator/creator.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    LogoComponent,
    IllustrationComponent,
    CreatorComponent
  ],
  providers: [
    AuthService,
    UtilsService
  ]
})

export class SignupComponent {
  form = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]),
  })
  loading: boolean = false;
  illustration: string = SharedConstants.ILLUSTRATION.SIGNUP;
  message: string = 'A tool where you can create life budgets and where you can keep track of your expenses';

  constructor(
    private _AuthSvc: AuthService,
    private _utilSvc: UtilsService,
    private router: Router
  ) { }

  signup(): void {
    const user = this.buildUserObject()
    this.callSignUpService(user)
  }

  buildUserObject(): SignUp {
    return {
      firstName: this.form.controls.firstName.value,
      lastName: this.form.controls.lastName.value,
      email: this.form.controls.email.value,
      password: this.form.controls.password.value,
    }
  }

  callSignUpService(userData: SignUp) {
    this.loading = true;
    this._AuthSvc.signup(userData).subscribe({
      next: res => this.handleResponse(res),
      error: err => this.handleError(err)
    })
  }

  handleResponse(res:any): void {
    const { msj } = res;
    this.loading = false;
    this._utilSvc.openSnackBar(msj, 'Close');
    this.router.navigate(['/confirmation']);
  }

  handleError(err:any): void {
    this.loading = false;
    this._utilSvc.openSnackBar(err.error.msj, 'Close');
  }

}
