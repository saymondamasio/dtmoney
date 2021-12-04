import {
  createContext, ReactNode, useContext, useEffect, useState,
} from 'react';
import { api } from '../services/api';

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: 'deposit' | 'withdraw';
  category: string;
  created_at: string;
}

type CreateTransaction = Omit<Transaction, 'id' | 'created_at'>

interface Props {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: CreateTransaction) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

function TransactionsProvider({ children }: Props) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api.get('/transactions').then((response) => setTransactions(response.data.transactions));
  }, []);

  async function createTransaction(transactionInput: CreateTransaction) {
    const response = await api.post('transactions', {
      ...transactionInput,
      created_at: new Date(),
    });

    const { transaction } = response.data;

    setTransactions([...transactions, transaction]);
  }

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}

function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}

export {
  useTransactions,
  TransactionsProvider,
};
