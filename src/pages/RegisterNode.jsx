//RegisterNode.jsx//
import { useState } from 'react';
import axios from 'axios';

const RegisterNode = () => {
  const [nodeUrl, setNodeUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = () => {
    axios.post('http://localhost:5001/api/members/register-node', { nodeUrl })
      .then(response => {
        setMessage(response.data.data.message);
      })
      .catch(error => {
        setMessage(error.response.data.data.message);
      });
  };

  return (
    <div>
      <h2>Register Node</h2>
      <input
        type="text"
        value={nodeUrl}
        onChange={(e) => setNodeUrl(e.target.value)}
        placeholder="Node URL"
      />
      <button onClick={handleRegister}>Register</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RegisterNode;
