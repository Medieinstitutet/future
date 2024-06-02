import React, { useState } from 'react';
import useAxios from '../hooks/useAxios';

const Blockchain = () => {
  const { response, error, loading, fetchData } = useAxios();
  const [blocks, setBlocks] = useState([]);

  const handleFetchBlockchain = async () => {
    await fetchData('http://localhost:5001/api/v1/blockchain', 'GET');
  };

  const handleMineBlock = async () => {
    await fetchData('http://localhost:5001/api/v1/blockchain/mine', 'POST', {});
  };

  React.useEffect(() => {
    if (response) {
      console.log('Response Received: ', response);
      setBlocks(response.blockchain || []);
    }
  }, [response]);

  return (
    <div>
      <h1>Blockchain</h1>
      <button onClick={handleFetchBlockchain}>Fetch Blockchain</button>
      <button onClick={handleMineBlock}>Mine Block</button>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {blocks.length > 0 ? (
        <ul>
          {blocks.map((block, index) => (
            <li key={index}>
              <h3>Block {block.blockIndex}</h3>
              <p>Timestamp: {block.timestamp}</p>
              <p>Previous Hash: {block.previousBlockHash}</p>
              <p>Current Hash: {block.currentBlockHash}</p>
              <p>Nonce: {block.nonce}</p>
              <p>Difficulty: {block.difficulty}</p>
              <p>Transactions: {JSON.stringify(block.transactions)}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>blocks</p>
      )}
    </div>
  );
};

export default Blockchain;
