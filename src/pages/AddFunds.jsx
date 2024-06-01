import { useState } from 'react';
import useAxios from '../hooks/useAxios';
import GetAccounts from '../components/getAccounts';

const AddFunds = () => {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [accounts, setAccounts] = useState([]);

  const { response, error, loading, fetchData } = useAxios();

  const handleAddFunds = async () => {
    await fetchData('http://localhost:5001/api/v1/crypto/add-funds', 'POST', {}, { address, amount: Number(amount) } );
    setAddress('');
    setAmount('');
  };

  return (
    <div>
      <h2>Add Funds</h2>

      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter address"
        list="accounts"
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />
      <button onClick={handleAddFunds} disabled={loading}>
        {loading ? 'Adding...' : 'Add Funds'}
      </button>
      {error && <p>{error}</p>}
      {response && <p>{response.message}</p>}
      <GetAccounts setAccounts={setAccounts} />
      <datalist id="accounts">
        {accounts.map((account) => (
          <option key={account.address} value={account.address}  />
        ))}
      </datalist>
    </div>
  );
};

export default AddFunds;
