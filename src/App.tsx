import { useState } from 'react';
import ReactModal from 'react-modal';
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { NewTransactionModal } from './components/NewtransactionModal';
import { GlobalStyle } from './styles/global';

ReactModal.setAppElement('#root');

export function App() {
  const [isOpenNewTransactionModal, setIsOpenNewTransactionModal] = useState(false);

  const handleCloseNewTransactionModal = () => {
    setIsOpenNewTransactionModal(false);
  };

  const handleOpenNewTransactionModal = () => {
    setIsOpenNewTransactionModal(true);
  };
  return (
    <>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />
      <NewTransactionModal
        isOpen={isOpenNewTransactionModal}
        onRequestClose={handleCloseNewTransactionModal}
      />
      <GlobalStyle />
    </>
  );
}

export default App;
