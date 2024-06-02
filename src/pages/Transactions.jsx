import { useNavigate, Outlet } from 'react-router-dom';

const Transactions = () => {
  const navigate = useNavigate();

  return (
    <div className="transactions">
      <div className="transactions-container">
        <h2>Transactions</h2>
        <button onClick={() => navigate('create-transaction')}>Create Transaction</button>
        <button onClick={() => navigate('broadcast-transaction')}>Broadcast Transaction</button>
        <Outlet /> 
      </div>
    </div>
  );
};

export default Transactions;

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
