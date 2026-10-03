import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

// Angular material
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Components
import { BudgetComponent } from 'src/app/components/budget/budget.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { TransactionComponent } from 'src/app/components/transaction/transaction.component';
import { ModalCrudComponent } from 'src/app/components/modal-crud/modal-crud.component';
import { MatButtonModule } from '@angular/material/button';
import { HomeService } from 'src/app/services/home.service';
import { HttpClientModule } from '@angular/common/http';
import { UtilsService } from 'src/app/services/utils.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ContainerBudgetsComponent } from 'src/app/components/container-budgets/container-budgets.component';
import { BudgetService } from 'src/app/services/budget.service';
import { ContainerSummaryComponent } from 'src/app/components/container-summary/container-summary.component';
import { TYPE_ELEMENT } from 'src/app/models/budget.model';
import { Person } from 'src/app/models/auth.model';
import { SubscriptionModalComponent } from 'src/app/components/subscription-modal/subscription-modal.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    HomeService,
    UtilsService,
    BudgetService
  ],
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    BudgetComponent,
    TransactionComponent,
    MatTabsModule,
    MatDialogModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    ContainerBudgetsComponent,
    ContainerSummaryComponent
  ]
})
export class HomeComponent implements OnInit {

  loading: boolean = false;
  user:Person;

  constructor(
    private _dialog: MatDialog,
    private _budgetSvc: BudgetService,
    private _utilsSvc: UtilsService
  ) { }

  ngOnInit(): void {
    this.user = this._utilsSvc.getDataPerson();
  }

  openDialogCrud(): void {
    const { flg_premium } = this.user;

    let free_days = this._utilsSvc.getFreeDays();    

    if(flg_premium === true){
      free_days = 0
    }

    if(flg_premium === false && free_days === 0){
      this.validateSubscription();
      return;
    }

    const dialogRef = this._dialog.open(ModalCrudComponent, {
      width: '250px',
      maxHeight: '90vh',
      disableClose: true,
      data: {
        title: 'Create budget',
        labelTextField: 'Title',
        labelNumberField: 'Budget',
        type: TYPE_ELEMENT.BUDGET
      },
    })

    dialogRef.componentInstance.newBudgetEmitter.subscribe(newBudget => {
      this._budgetSvc.createBudget(newBudget);
      dialogRef.componentInstance.loading = false;
      dialogRef.close()
    })
  }  

  validateSubscription():void{
    const dialogRef = this._dialog.open(SubscriptionModalComponent, {
      width: '500px',
      height: '300px',
      maxHeight: '90vh',
      disableClose: false,
      data: {}
    })
  }
}