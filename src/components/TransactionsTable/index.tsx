import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Container } from './styles';

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: 'deposit' | 'withdraw';
  category: string;
  created_at: string;
}

export function TransactionsTable() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api.get('/transactions').then((response) => setTransactions(response.data));
  }, []);

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {
           transactions.map((transaction) => (
             <tr>
               <td>{transaction.title}</td>
               <td className="withdraw">{transaction.amount}</td>
               <td>{transaction.category}</td>
               <td>{transaction.created_at}</td>
             </tr>
           ))
         }
        </tbody>
      </table>
    </Container>
  );
}
