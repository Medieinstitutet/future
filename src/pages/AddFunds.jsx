import { useState, useRef } from 'react';
import useAxios from '../hooks/useAxios';
import GetAccounts from '../components/getAccounts';

const AddFunds = () => {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [accounts, setAccounts] = useState([]);
  const getAccountsRef = useRef();

  const { response, error, loading, fetchData, enableFetching, disableFetching } = useAxios();

  const handleAddFunds = async () => {

    enableFetching(); // Enable fetching before calling fetchData
    await fetchData('http://localhost:5001/api/v1/crypto/add-funds', 'POST', {}, { address, amount: Number(amount) });
    disableFetching(); // Disable further fetching after the operation
    setAddress('');
    setAmount('');
    // Trigger a refresh of the accounts
    if (getAccountsRef.current) {
      getAccountsRef.current.fetchAccounts();
    }
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
        required
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
        required
      />
      <button onClick={handleAddFunds} disabled={loading}>
        {loading ? 'Adding...' : 'Add Funds'}
      </button>
      {error && <p>{error}</p>}
      {response && <p>{response.message}</p>}
      <GetAccounts setAccounts={setAccounts} ref={getAccountsRef} />
      <datalist id="accounts">
        {accounts.map((account, index) => (
          <option key={`${account.address}-${index}`} value={account.address} />
        ))}
      </datalist>
    </div>
  );
};

export default AddFunds;


// import { useState } from 'react';
// import useAxios from '../hooks/useAxios';
// import GetAccounts from '../components/getAccounts';

// const AddFunds = () => {
//   const [address, setAddress] = useState('');
//   const [amount, setAmount] = useState('');
//   const [accounts, setAccounts] = useState([]);

//   const { response, error, loading, fetchData,enableFetching} = useAxios();

//   const handleAddFunds = async () => {
//     // enableFetching();
//     await fetchData('http://localhost:5001/api/v1/crypto/add-funds', 'POST', {}, { address, amount: Number(amount) } );
//     // disableFetching();
//     enableFetching();
//     setAddress('');
//     setAmount('');
//   };

//   return (
//     <div>
//       <h2>Add Funds</h2>

//       <input
//         type="text"
//         value={address}
//         onChange={(e) => setAddress(e.target.value)}
//         placeholder="Enter address"
//         list="accounts"
//         required
//       />
//       <input
//         type="number"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//         placeholder="Enter amount"
//         required
//       />
//       <button onClick={handleAddFunds} disabled={loading}>
//         {loading ? 'Adding...' : 'Add Funds'}
//       </button>
//       {error && <p>{error}</p>}
//       {response && <p>{response.message}</p>}
//       <GetAccounts setAccounts={setAccounts} />
//       <datalist id="accounts">
//         {accounts.map((account) => (
//           <option key={account.address} value={account.address}  />
//         ))}
//       </datalist>
//     </div>
//   );
// };

// export default AddFunds;
