import React, { useState } from 'react';
import useAxios from '../hooks/useAxios';

const Blockchain = () => {
  const { response, error, loading, fetchData } = useAxios();
  const [blocks, setBlocks] = useState([]);

  const handleFetchBlockchain = async () => {
    await fetchData(`${process.env.REACT_APP_API_BASE_URL}/blockchain`, 'GET');
  };

  const handleMineBlock = async () => {
    await fetchData(`${process.env.REACT_APP_API_BASE_URL}/mine-block`, 'POST');
    handleFetchBlockchain();
  };

  // Update the blocks state when response changes
  React.useEffect(() => {
    if (response) {
      setBlocks(response.data.blockchain.chain);
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
        <p>No blocks found</p>
      )}
    </div>
  );
};

export default Blockchain;
