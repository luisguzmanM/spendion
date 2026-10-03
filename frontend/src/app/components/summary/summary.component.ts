import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular material components
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ModalIncomeComponent } from '../modal-income/modal-income.component';
import { MatDialog } from '@angular/material/dialog';
import { TYPE_ELEMENT } from 'src/app/models/budget.model';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
  standalone: true,
  imports: [
    CommonModule,

    // Angular material components
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class SummaryComponent implements OnInit {

  @Input() summary: any;
  @Output() incomeEmitter: any = new EventEmitter;

  constructor(
    public _dialog: MatDialog,
    private _homeSvc: HomeService
  ){}

  ngOnInit(): void {
    
  }

  openModalAddIncome():void{
    const dialogRef = this._dialog.open(ModalIncomeComponent, {
      width: '250px',
      maxHeight: '90vh',
      disableClose: true,
      data: {
        title: 'Add income',
        labelNumberField: 'Income',
        type: TYPE_ELEMENT.INCOME
      },
    })

    dialogRef.componentInstance.addIncomeEmitter.subscribe(res => {
      this.incomeEmitter.emit(res);
      dialogRef.componentInstance.loading = false;
      dialogRef.close()
    })
  }

}
