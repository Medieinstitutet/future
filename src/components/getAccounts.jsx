import { useState, useEffect } from 'react';
import useAxios from '../hooks/useAxios';

const GetAccounts = ({ setAccounts }) => {
  const [localAccounts, setLocalAccounts] = useState([]);
  // // // const { response, error, loading, fetchData, } = useAxios();
  const { response, error, loading, fetchData,enableFetching,disableFetching } = useAxios();

  useEffect(() => {
    const fetchAccounts = async () => {
      enableFetching();
      await fetchData('http://localhost:5001/api/v1/crypto/accounts', 'GET' );
    };
    
    disableFetching();
 fetchAccounts();

  }, [fetchData, enableFetching,disableFetching]);
  // // }, [fetchData,disableFetching,enableFetching]);

  useEffect(() => {
    if (response && response.data) {
      setLocalAccounts(response.data);
      if (setAccounts) { 
        setAccounts(response.data); 
      }
    }
  }, [response, setAccounts]);

  return (
    <div>
      <h3>Accounts:</h3>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {localAccounts.map((account) => (
          <li key={account.address}>
            {account.address}: {account.balance}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetAccounts;
