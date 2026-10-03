export interface Budget {
  id_budget: number,
  title: string,
  amount: number,
  record: Record,
  progress?: number,
  spent?: number
  free?: number,
}

export interface BudgetToSend {
  title: string;
  amount: number;
  token: string;
}

export interface RecordToSend {
  desc: string;
  amount: number;
  id: string;
  date: string;
}

export interface Record {
  id: number,
  title: string,
  amount: number
}

export interface Transaction {
  id: string,
  desc: string,
  amount: number
}

export const TYPE_ELEMENT = {
  BUDGET: 'budget',
  EXPENSE: 'expense',
  INCOME: 'income'
}