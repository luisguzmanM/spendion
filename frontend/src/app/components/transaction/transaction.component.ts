import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BudgetService } from 'src/app/services/budget.service';
import { MatTooltipModule } from '@angular/material/tooltip'

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    CommonModule,
    MatTooltipModule
  ],
})

export class TransactionComponent implements OnInit  {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  transactions: any[] = [];
  budgets: any[] = [];
  displayedColumns: string[] = ['date', 'desc', 'amount', 'budget'];
  dataSource;

  constructor(
    private _budgetSvc: BudgetService
  ) {}

  ngOnInit(): void {
    this.getBudgetsFromService();
  }

  getBudgetsFromService():void{
    this._budgetSvc.dataBudgets$.subscribe(data => {
      this.budgets = data;
      this.getTransactions();
    })
  }

  getTransactions(){
    const budgetsWithRecordData = this.budgets.filter(budget => budget.record !== null);
    if(!budgetsWithRecordData.length || budgetsWithRecordData.length === 0) return;
    this.transactions = [];
    for(let budget of budgetsWithRecordData){
      for(let transaction of budget.record){
        this.transactions.push({
          budget: budget.title,
          desc: transaction.desc,
          amount: transaction.amount,
          date: transaction.date,
        })
      }
    }
    this.dataSource = new MatTableDataSource<any>(this.transactions);
    this.dataSource.paginator = this.paginator;
  }
  
}