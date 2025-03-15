import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FinanceData {
  id: string;
  date: string;
  amount: number;
  category: string;
  description: string;
  type: 'income' | 'expense';
}

interface FinanceState {
  transactions: FinanceData[];
  loading: boolean;
  error: string | null;
}

const initialState: FinanceState = {
  transactions: [],
  loading: false,
  error: null,
};

const financeSlice = createSlice({
  name: 'finance',
  initialState,
  reducers: {
    fetchTransactionsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTransactionsSuccess: (state, action: PayloadAction<FinanceData[]>) => {
      state.loading = false;
      state.transactions = action.payload;
      state.error = null;
    },
    fetchTransactionsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    addTransaction: (state, action: PayloadAction<FinanceData>) => {
      state.transactions.push(action.payload);
    },
    updateTransaction: (state, action: PayloadAction<FinanceData>) => {
      const index = state.transactions.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.transactions[index] = action.payload;
      }
    },
    deleteTransaction: (state, action: PayloadAction<string>) => {
      state.transactions = state.transactions.filter(t => t.id !== action.payload);
    },
  },
});

export const {
  fetchTransactionsStart,
  fetchTransactionsSuccess,
  fetchTransactionsFailure,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} = financeSlice.actions;

export default financeSlice.reducer; 