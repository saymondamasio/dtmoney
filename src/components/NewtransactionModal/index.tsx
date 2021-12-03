import ReactModal from 'react-modal';
import { FormEvent, useState } from 'react';
import { Container, RadioBox, TransactionTypeContainer } from './styles';
import close from '../../assets/close.svg';
import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import { api } from '../../services/api';

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }:Props) {
  const [type, setType] = useState('deposit');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');

  const handleCreateNewTransaction = (event: FormEvent) => {
    event.preventDefault();

    const transaction = {
      title,
      amount,
      category,
      type,
    };

    api.post('transactions', transaction);

    onRequestClose();
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal"
    >
      <button type="button" onClick={onRequestClose} className="react-modal-close">
        <img src={close} alt="Fechar modal" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>

        <h2>Cadastrar transação</h2>

        <input type="text" placeholder="Titulo" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="number" placeholder="Valor" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
        <input type="text" placeholder="Categoria" value={category} onChange={(e) => setCategory(e.target.value)} />

        <TransactionTypeContainer>
          <RadioBox type="button" isActive={type === 'deposit'} activeColor="green" onClick={() => setType('deposit')}>
            <img src={income} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox type="button" isActive={type === 'withdraw'} activeColor="red" onClick={() => setType('withdraw')}>
            <img src={outcome} alt="Saida" />
            <span>Saida</span>
          </RadioBox>
        </TransactionTypeContainer>

        <button type="submit">Cadastrar</button>
      </Container>
    </ReactModal>
  );
}
