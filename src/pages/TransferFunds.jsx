import { useState } from 'react';
import useAxios from '../hooks/useAxios';

import GetAccounts from '../components/getAccounts';
const TransferFunds = () => {
  const [fromAddress, setFromAddress] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const { response, error, loading, fetchData } = useAxios();

  const handleTransferFunds = async () => {
    await fetchData('http://localhost:5001/api/v1/crypto/transfer', 'POST', {}, { fromAddress, toAddress, amount: Number(amount) });
    setFromAddress('')
    setToAddress('');
    setAmount('');
 
  };

  return (
    <div>
      <h2>Transfer Funds</h2>
      <input
        type="text"
        value={fromAddress}
        onChange={(e) => setFromAddress(e.target.value)}
        placeholder="From address"
      />
      <input
        type="text"
        value={toAddress}
        onChange={(e) => setToAddress(e.target.value)}
        placeholder="To address"
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <button onClick={handleTransferFunds} disabled={loading}>
        {loading ? 'Transferring...' : 'Transfer Funds'}
      </button>
      {error && <p>{error.message || 'An error occurred'}</p>}
      {response && <p>{response.data?.message || 'Transfer successful'}</p>}
   <GetAccounts/>
    </div>
  );
};

export default TransferFunds;
