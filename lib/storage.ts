// lib/storage.ts
export type Expense = {
  id: string;
  originalAmount: number;
  originalCurrency: string;
  convertedAmount: number;
  baseCurrency: string; // Always 'USD'
  category: string;
  date: string; // ISO string
};

const STORAGE_KEY = 'budgetbyte_expenses';

export function getExpenses(): Expense[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveExpenses(expenses: Expense[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
}

export function addExpense(expense: Expense) {
  const expenses = getExpenses();
  expenses.push(expense);
  saveExpenses(expenses);
}

export function deleteExpense(id: string) {
  const expenses = getExpenses().filter(e => e.id !== id);
  saveExpenses(expenses);
}

export function clearExpenses() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}