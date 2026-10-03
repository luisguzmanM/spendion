import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { UtilsService } from 'src/app/services/utils.service';
import { Person } from 'src/app/models/auth.model';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { PaymentCardComponent } from 'src/app/components/payment-card/payment-card.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ProfileSettingComponent } from 'src/app/components/profile-setting/profile-setting.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CreatorComponent } from 'src/app/components/creator/creator.component';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    MatSnackBarModule,
    MatDividerModule,
    PaymentCardComponent,
    MatTabsModule,
    ProfileSettingComponent,
    MatProgressSpinnerModule,
    CreatorComponent
  ],
  providers: [
    UtilsService
  ]
})
export class SettingComponent implements OnInit {

  user: Person;

  constructor(
    private _utilsSvc: UtilsService
  ) { }

  ngOnInit(): void {
    this.user = this._utilsSvc.getDataPerson();
  }

}
