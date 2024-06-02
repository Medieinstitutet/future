import { useState, useEffect } from 'react';
import useAxios from '../hooks/useAxios';
// import { useBaseUrl } from '../contexts/BaseUrlContext';

const Transactions = () => {
//   const { baseUrl } = useBaseUrl();
//   const { response, error, loading, fetchData } = useAxios(baseUrl);
  const { response, error, loading, fetchData } = useAxios();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      await fetchData('/transactions');
    };

    fetchTransactions();
  }, [fetchData]);

  useEffect(() => {
    if (response && response.data) {
      setTransactions(response.data);
    }
  }, [response]);

  return (
    <div>
      <h3>Transactions:</h3>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index}>
            {transaction.timestamp} - {transaction.type} - {transaction.fromAddress} to {transaction.toAddress} - {transaction.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transactions;
