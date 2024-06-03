import { useState, useEffect } from 'react';
import useAxios from '../hooks/useAxios';

const PendingTransactionsList = () => {
  const [pendingTransactions, setPendingTransactions] = useState([]);
  const { response, error, loading, fetchData } = useAxios();

  useEffect(() => {
    const fetchPendingTransactions = async () => {
      await fetchData('http://localhost:5001/api/v1/blockchain/pending-transactions', 'GET');
    };

    fetchPendingTransactions();
  }, [fetchData]);

  useEffect(() => {
    if (response && response.data) {
      setPendingTransactions(response.data.pendingTransactions || []);
    }
  }, [response]);

  return (
    <div>
      <h2>Pending Transactions</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {pendingTransactions.map((transaction, index) => (
          <li key={index}>
            <p>Amount: {transaction.amount}</p>
            <p>Sender: {transaction.sender}</p>
            <p>Recipient: {transaction.recipient}</p>
            <p>Ticket ID: {transaction.ticketID}</p>
            <p>First Name: {transaction.firstName}</p>
            <p>Last Name: {transaction.lastName}</p>
            <p>Email: {transaction.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PendingTransactionsList;
