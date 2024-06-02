// import { useState, useEffect } from 'react';
// import useAxios from '../hooks/useAxios';

// const TransactionForm = () => {
//   const { response, error, loading, fetchData } = useAxios();
//   const [formData, setFormData] = useState({
//     amount: '',
//     sender: '',
//     recipient: '',
//     ticketID: '',
//     firstName: '',
//     lastName: '',
//     email: '',
//   });
//   const [accounts, setAccounts] = useState([]);

//   useEffect(() => {
//     const fetchAccounts = async () => {
//       await fetchData('/crypto/accounts', 'GET');
//     };

//     fetchAccounts();
//   }, [fetchData]);

//   useEffect(() => {
//     if (response && response.data) {
//       setAccounts(response.data);
//     }
//   }, [response]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleCreateTransaction = async () => {
//     await fetchData('http://localhost:5001/api/v1/transactions/transaction', 'POST', {}, formData);
//   };

//   const handleBroadcastTransaction = async () => {
//     await fetchData('http://localhost:5001/api/v1/transactions/transaction/broadcast', 'POST', {}, formData);
//   };

//   return (
//     <div>
//       <h2>Create Transaction</h2>
//       <input
//         type="text"
//         name="amount"
//         value={formData.amount}
//         onChange={handleChange}
//         placeholder="Enter amount"
//       />
//       <input
//         type="text"
//         name="sender"
//         value={formData.sender}
//         onChange={handleChange}
//         placeholder="Enter sender"
//         list="accounts"
//       />
//       <input
//         type="text"
//         name="recipient"
//         value={formData.recipient}
//         onChange={handleChange}
//         placeholder="Enter recipient"
//         list="accounts"
//       />
//       <input
//         type="text"
//         name="ticketID"
//         value={formData.ticketID}
//         onChange={handleChange}
//         placeholder="Enter ticket ID"
//       />
//       <input
//         type="text"
//         name="firstName"
//         value={formData.firstName}
//         onChange={handleChange}
//         placeholder="Enter first name"
//       />
//       <input
//         type="text"
//         name="lastName"
//         value={formData.lastName}
//         onChange={handleChange}
//         placeholder="Enter last name"
//       />
//       <input
//         type="email"
//         name="email"
//         value={formData.email}
//         onChange={handleChange}
//         placeholder="Enter email"
//       />
//       <button onClick={handleCreateTransaction} disabled={loading}>
//         {loading ? 'Creating...' : 'Create Transaction'}
//       </button>
//       <button onClick={handleBroadcastTransaction} disabled={loading}>
//         {loading ? 'Broadcasting...' : 'Broadcast Transaction'}
//       </button>
//       {error && <p>{error}</p>}
//       {response && <p>{response.message}</p>}
//       <datalist id="accounts">
//         {accounts.map(([account, balance]) => (
//           <option key={account} value={account}>
//             {account} - {balance}
//           </option>
//         ))}
//       </datalist>
//     </div>
//   );
// };

// export default TransactionForm;


import { useState, useEffect } from 'react';
import useAxios from '../hooks/useAxios';

const TransactionForm = () => {
 

  // const [formData, setFormData] = useState(
  //   amount: '',
  //   sender: '',
  //   recipient: '',
  //   ticketID: '',
  //   firstName: '',
  //   lastName: '',
  //   email: '',
  // });

  const [amount,setAmount]= useState('')
  const [sender,setSender]= useState('')
  const [recipient,setRecipient]= useState('')
  const [ticketID,setTicketID]= useState('')
  const [firstName,setFirstName]= useState('')
  const [lastName,setLastName]= useState('')
  const [email, setEmail] = useState('');

  const[accounts, setAccounts]=useState([])

  const { response, error, loading, fetchData,enableFetching, disableFetching  } = useAxios();
  
  useEffect(() => {
    const fetchAccounts = async () => {
      enableFetching();
      await fetchData('http://localhost:5001/api/v1/crypto/accounts', 'GET');
    };

    fetchAccounts();
    disableFetching();
  }, [fetchData,disableFetching, enableFetching]);

  useEffect(() => {
    if (response && response.data) {
      setAccounts(response.data);
    }
  }, [response]);
  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const validateForm = () => {
    return amount && sender && recipient && ticketID && firstName && lastName && email;
  };
  const handleCreateTransaction = async () => {
    if (!validateForm()) {
      alert('All fields are required');
      return;
    }
    enableFetching();
    await fetchData('http://localhost:5001/api/v1/transactions/transaction', 'POST', {}, { amount: Number(amount),sender,recipient,ticketID,firstName, lastName,email});
  };

  const handleBroadcastTransaction = async () => {
    if (!validateForm()) {
      alert('All fields are required');
      return;
    }
    enableFetching();
    await fetchData('http://localhost:5001/api/v1/transactions/transaction/broadcast', 'POST', {}, { amount: Number(amount),sender,recipient,ticketID,firstName, lastName,email});
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
        required
      />
      <input
        type="text"
        name="recipient"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        placeholder="Enter recipient"
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
          <option key={account.address} value={account.address}  />
        ))}
      </datalist>
    </div>
  );
};

export default TransactionForm;
