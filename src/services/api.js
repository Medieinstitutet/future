import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createAccount = async (data) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/crypto/create-account`,
      data
    );
    return response.data;
  } catch (error) {
    console.error('Error creating account:', error);
    throw error;
  }
};

export const getBalance = async (address) => {
  return await axios.get(`${API_BASE_URL}/crypto/balance/${address}`);
};

export const addFunds = async (address, amount) => {
  return await axios.post(`${API_BASE_URL}/crypto/add-funds`, {
    address,
    amount,
  });
};

export const transferFunds = async (fromAddress, toAddress, amount) => {
  return await axios.post(`${API_BASE_URL}/crypto/transfer`, {
    fromAddress,
    toAddress,
    amount,
  });
};

export const getBlockchain = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/blockchain`);
    return response.data;
  } catch (error) {
    console.error('Error fetching blockchain:', error);
    throw error;
  }
};

export const mineBlock = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/blockchain/mine`);
    return response.data;
  } catch (error) {
    console.error('Error mining block:', error);
    throw error;
  }
};
