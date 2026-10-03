import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscription-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './subscription-modal.component.html',
  styleUrls: ['./subscription-modal.component.css']
})
export class SubscriptionModalComponent implements OnInit{

  constructor(
    public dialogRef: MatDialogRef<SubscriptionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _router: Router,
  ){}

  ngOnInit():void {}

  goToSubscriptionSection(){
    this._router.navigate(['/setting']);
    this.dialogRef.close();
  }

}
