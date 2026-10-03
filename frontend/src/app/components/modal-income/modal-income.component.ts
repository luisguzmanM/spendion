import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-income',
  templateUrl: './modal-income.component.html',
  styleUrls: ['./modal-income.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressBarModule,
    HttpClientModule,
    ReactiveFormsModule 
  ],
})
export class ModalIncomeComponent {

  loading : boolean = false;
  form : FormControl = new FormControl('', [Validators.required]);
  @Output() addIncomeEmitter: any = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<ModalIncomeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ){}

  onNoClick(): void {
    this.dialogRef.close();
  }

  buildObject(): any {
    return {
      amount: this.form.value,
      token: localStorage.getItem('token')
    }
  }

  confirm(): void {
    this.loading = true;
    const obj = this.buildObject();
    this.addIncomeEmitter.emit(obj);
  }

}
