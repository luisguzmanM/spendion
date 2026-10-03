import { Component, Input } from '@angular/core';
import { CommonModule } from "@angular/common"

// Angular material components
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DecimalPipe } from '@angular/common';


@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css'],
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    MatTooltipModule,
    DecimalPipe,
    CommonModule
  ]
})
export class BudgetComponent {

  @Input() data: any;

  constructor() { }

}
