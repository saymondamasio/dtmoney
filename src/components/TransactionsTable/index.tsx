import { useContext } from 'react';
import { TransactionsContext } from '../../contexts/TransactionsContext';
import { Container } from './styles';

export function TransactionsTable() {
  const { transactions } = useContext(TransactionsContext);

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
             <tr key={transaction.id}>
               <td>{transaction.title}</td>
               <td className={transaction.type}>
                 {
                  Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(transaction.amount)
                 }
               </td>
               <td>{transaction.category}</td>
               <td>
                 {
                  Intl.DateTimeFormat('pt-BR').format(new Date(transaction.created_at))
                 }
               </td>
             </tr>
           ))
         }
        </tbody>
      </table>
    </Container>
  );
}
