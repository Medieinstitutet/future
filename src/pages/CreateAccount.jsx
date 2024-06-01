import { useState, useEffect } from 'react';
import useAxios from '../hooks/useAxios';

const CreateAccount = () => {
  console.log("CreateAccount Component Rendered");

  const [address, setAddress] = useState('');
  const { response, error, loading, fetchData } = useAxios();

  const handleCreateAccount = async () => {
    await fetchData('http://localhost:5001/api/v1/crypto/create-account', 'POST', {}, { address });
  setAddress('')
  };

  useEffect(() => {
    if (response) {
      console.log("Response Received: ", response);
      alert(response.message || 'Account created successfully!');
    }
  }, [response]);

  return (
    <div>
      <h2>Create Account</h2>
      <input
        type="text"
        value={address}
        onChange={(e) => {
          console.log("Address Changed: ", e.target.value);
          setAddress(e.target.value);
        }}
        placeholder="Enter address"
      />
      <button onClick={handleCreateAccount} disabled={loading}>
        {loading ? 'Creating...' : 'Create Account'}
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default CreateAccount;
