import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryComponent } from '../summary/summary.component';
import { HomeService } from 'src/app/services/home.service';
import { Budget } from 'src/app/models/budget.model';
import { BudgetService } from 'src/app/services/budget.service';

@Component({
  selector: 'app-container-summary',
  templateUrl: './container-summary.component.html',
  styleUrls: ['./container-summary.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    SummaryComponent
  ],
})
export class ContainerSummaryComponent implements OnInit {

  token = localStorage.getItem('token');
  summary: any[] = [];
  budgets: any[] = [];

  income: number = 0;
  spent: number = 0;
  balance: number = 0;

  constructor(
    private _budgetSvc: BudgetService,
    private _homeSvc: HomeService
  ){}

  ngOnInit(): void {
    this._homeSvc.getIncome(this.token).subscribe(res => {
      this.income = parseInt(res.income);
    })
    this._budgetSvc.dataBudgets$.subscribe(budgets => {
      this.budgets = budgets;
      setTimeout(() => {
        this.buildSummary();
      }, 500);
    })
  }
  
  buildSummary(){
    let allExpenses = 0;
    this.budgets.map((budget, i) => {
      if(budget.record !== null){
        allExpenses += budget.record.reduce((acc, e) => acc + e.amount, 0);
      }
    })
    this.balance = this.income - allExpenses;
    this.summary = [
      {
        title: 'Incomes',
        amount: this.income.toFixed(2),
        icon: '💰'
      },
      {
        title: 'Expenses',
        amount: allExpenses.toFixed(2),
        icon: '💸'
      },
      {
        title: 'Balance',
        amount: this.balance.toFixed(2),
        icon: '⚖️'
      }
    ]
  }

  updateIncome(event:Event){
    this._homeSvc.addIncome(event).subscribe(res => {
      this.income = res.income;
      this.buildSummary();
    })
  }
}
