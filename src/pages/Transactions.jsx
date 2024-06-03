import PendingTransactionsList from "../components/PendingTransactionsList";
import TransactionForm from "../components/TransactionForm";
import '../styles/layout.scss'

const Transactions = () => {
  return (
    <div className="transactions-page">
      <div className="pending-transactions">
      <div className="form-container">
        <TransactionForm />
      </div>
        <PendingTransactionsList />
      </div>
    </div>
  );
};

export default Transactions;
//   const navigate = useNavigate();

//   return (
//     <div className="main-container">
//         <h2>Transactions</h2>
//         <button onClick={() => navigate('create-transaction')}>Create Transaction</button>
//         <button onClick={() => navigate('broadcast-transaction')}>Broadcast Transaction</button>
//         <Outlet /> 
//       </div>
  
//   );
// };

// export default Transactions;


// import Transactions from '../components/Transaction';

// const TransactionsPage = () => {
//   return (
//     <div>
//       <h2>Transactions</h2>
//       <Transactions />
//     </div>
//   );
// };

// export default TransactionsPage;
