import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-modal-confirmation',
  templateUrl: './modal-confirmation.component.html',
  styleUrls: ['./modal-confirmation.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatProgressBarModule
  ],
})
export class ModalConfirmationComponent {

  defaultTitle: string = 'Action';
  defaultMessage: string = 'Are you sure to execute this action?';
  loading: boolean = false;

  @Output() confirmButton: any = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<ModalConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ){}

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirm():void {
    this.loading = true;
    this.confirmButton.emit();
  }

}
