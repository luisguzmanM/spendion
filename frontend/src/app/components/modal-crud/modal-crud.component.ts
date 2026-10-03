import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular material components
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TYPE_ELEMENT } from 'src/app/models/budget.model';

@Component({
  selector: 'app-modal-crud',
  templateUrl: './modal-crud.component.html',
  styleUrls: ['./modal-crud.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressBarModule
  ],
})

export class ModalCrudComponent implements OnInit {

  defaultTitle: string = 'Title modal';
  defaultLabelTextField = 'Text field';
  defaultLabelNumberField = 'Number field';
  form: FormGroup;
  loading: boolean = false;
  
  @Output() newBudgetEmitter: any = new EventEmitter();
  @Output() newExpenseEmitter: any = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<ModalCrudComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  buildObject(): any {
    return {
      title: this.form.controls['title'].value,
      amount: this.form.controls['amount'].value,
      token: localStorage.getItem('token')
    }
  }

  confirm(): void {
    this.loading = true;
    const obj = this.buildObject();
    this.data.type === TYPE_ELEMENT.EXPENSE ? this.newExpenseEmitter.emit(obj) : this.newBudgetEmitter.emit(obj);
  }

}
