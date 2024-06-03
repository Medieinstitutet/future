import PendingTransactionsList from '../components/PendingTransactionsList';
import TransactionForm from '../components/TransactionForm';

const CreateTransaction = () => {
  return (
    <div>
      <h2>Transactions</h2>
      <TransactionForm />
      <PendingTransactionsList/>
    </div>
  );
};

export default CreateTransaction;