import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetComponent } from '../budget/budget.component';
import { ModalBudgetComponent } from '../modal-budget/modal-budget.component';
import { MatDialog } from '@angular/material/dialog';
import { Budget } from 'src/app/models/budget.model';
import { BudgetService } from 'src/app/services/budget.service';

@Component({
  selector: 'app-container-budgets',
  templateUrl: './container-budgets.component.html',
  styleUrls: ['./container-budgets.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    BudgetComponent,
  ],
})

export class ContainerBudgetsComponent implements OnInit {

  budgets: Budget[] = [];

  constructor(
    public dialog: MatDialog,
    private _budgetSvc: BudgetService
  ){}

  ngOnInit(): void {
    this._budgetSvc.dataBudgets$.subscribe(budgets => {
      this.budgets = budgets
    })
  }

  openDialogSelectedBudget(budget: Budget) {
    const { title, amount, spent, free, progress, record, id_budget } = budget;
    const dialogRef = this.dialog.open(ModalBudgetComponent, {
      width: '600px',
      maxWidth: '100%',
      maxHeight: '90vh',
      disableClose: true,
      data: {
        title: title,
        amount: amount,
        spent: spent,
        free: free,
        progress: progress,
        record: record,
        id_budget: id_budget
      },
    }); 

    dialogRef.componentInstance.deleteBudgetEmitter.subscribe(() => {
      this._budgetSvc.deleteBudget(id_budget);
      dialogRef.close()
    }) 

    dialogRef.componentInstance.addExpenseEmitter.subscribe(res => {
      this._budgetSvc.updateRecordBudget(id_budget, res);
    })

    dialogRef.componentInstance.deleteExpenseEmitter.subscribe(payload => {
      this._budgetSvc.deleteExpense(payload);
    })
  }
}
