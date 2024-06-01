import {blockchain} from '../startup.mjs';


export const createAccount = (req, res) => {
  try {
    const { address } = req.body;
    blockchain.cryptoCurrency.createAccount(address);
    res.status(201).json({ success: true, message: 'Account created successfully.' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getBalance = (req, res) => {
  try {
    const balance = blockchain.cryptoCurrency.getBalance(req.params.address);
    res.status(200).json({ success: true, data: { balance } });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const addFunds = (req, res) => {
  try {
    blockchain.cryptoCurrency.addFunds(req.body.address, req.body.amount);
    res.status(200).json({ success: true, data: { message: 'Funds added.' } });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const transferFunds = (req, res) => {
  try {
    blockchain.cryptoCurrency.transferFunds(req.body.fromAddress, req.body.toAddress, req.body.amount);
    res.status(200).json({ success: true, data: { message: 'Funds transferred.' } });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
export const getAccounts = (req, res) => {
  try {
    const accounts = Array.from(blockchain.cryptoCurrency.accounts.entries()).map(([address, balance]) => ({
      address,
      balance,
    }));
    res.status(200).json({ success: true, data: accounts });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
