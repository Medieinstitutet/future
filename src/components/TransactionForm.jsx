import { useState, useEffect } from 'react';
import useAxios from '../hooks/useAxios';

const TransactionForm = () => {
  const [amount, setAmount] = useState('');
  const [sender, setSender] = useState('');
  const [recipient, setRecipient] = useState('');
  const [ticketID, setTicketID] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [accounts, setAccounts] = useState([]);

  const { response, error, loading, fetchData } = useAxios();

  useEffect(() => {
    const fetchAccounts = async () => {
      await fetchData('http://localhost:5001/api/v1/crypto/accounts', 'GET');
    };

    fetchAccounts();
  }, [fetchData]);

  useEffect(() => {
  if (response && response.data) {
    console.log('Response data:', response.data); // Debugging line to check response
    if (Array.isArray(response.data)) {
      setAccounts(response.data);
    } else {
      console.error('Unexpected response format:', response.data);
    }
  }
}, [response]);

  const validateForm = () => {
    return amount && sender && recipient && ticketID && firstName && lastName && email;
  };

  const handleCreateTransaction = async () => {
    if (!validateForm()) {
      alert('All fields are required');
      return;
    }
    await fetchData('http://localhost:5001/api/v1/transactions/transaction', 'POST', {}, {
      amount: Number(amount),
      sender,
      recipient,
      ticketID,
      firstName,
      lastName,
      email
    });
    alert('Transaction created successfully!');
  };

  const handleBroadcastTransaction = async () => {
    if (!validateForm()) {
      alert('All fields are required');
      return;
    }
    await fetchData('http://localhost:5001/api/v1/transactions/transaction/broadcast', 'POST', {}, {
      amount: Number(amount),
      sender,
      recipient,
      ticketID,
      firstName,
      lastName,
      email
    });
    alert('Transaction broadcasted successfully!');
  };

  return (
    <div>
      <h2>Create Transaction</h2>
      <input
        type="text"
        name="amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
        required
      />
      <input
        type="text"
        name="sender"
        value={sender}
        onChange={(e) => setSender(e.target.value)}
        placeholder="Enter sender"
        list="accounts"
        required
      />
      <input
        type="text"
        name="recipient"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        placeholder="Enter recipient"
        list="accounts"
        required
      />
      <input
        type="text"
        name="ticketID"
        value={ticketID}
        onChange={(e) => setTicketID(e.target.value)}
        placeholder="Enter ticket ID"
        required
      />
      <input
        type="text"
        name="firstName"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="Enter first name"
        required
      />
      <input
        type="text"
        name="lastName"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Enter last name"
        required
      />
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email"
        required
      />
      <button onClick={handleCreateTransaction} disabled={loading}>
        {loading ? 'Creating...' : 'Create Transaction'}
      </button>
      <button onClick={handleBroadcastTransaction} disabled={loading}>
        {loading ? 'Broadcasting...' : 'Broadcast Transaction'}
      </button>
      {error && <p>{error}</p>}
      {response && <p>{response.message}</p>}
      <datalist id="accounts">
        {accounts.map((account) => (
          <option key={account.address} value={account.address}>
            {account.address}
          </option>
        ))}
      </datalist>
    </div>
  );
};

export default TransactionForm;
