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

// export const transferFunds = (req, res) => {
//   try {
//     blockchain.cryptoCurrency.transferFunds(req.body.fromAddress, req.body.toAddress, req.body.amount);
//     res.status(200).json({ success: true, data: { message: 'Funds transferred.' } });
//   } catch (error) {
//     res.status(400).json({ success: false, error: error.message });
//   }
// };
// export const transferPayment = (req, res) => {
//   try {
//     const { fromAddress, toAddress, amount, ticketID, firstName, lastName, email } = req.body;
//     const transaction = blockchain.createTransaction(amount, fromAddress, toAddress, ticketID, firstName, lastName, email);
//     blockchain.addTransaction(transaction);
//     res.status(200).json({ success: true, data: { message: 'Funds transferred.' } });
//   } catch (error) {
//     res.status(400).json({ success: false, error: error.message });
//   }
// };
export const transferPayment = (req, res) => {
  try {
    const { fromAddress, toAddress, amount, ticketID, firstName, lastName, email } = req.body;

    // Log the account names being used
    console.log("From Address:", fromAddress);
    console.log("To Address:", toAddress);

    // Log the existing accounts
    console.log("Existing Accounts:", Array.from(blockchain.cryptoCurrency.accounts.keys()));

    // Check if both accounts exist
    if (!blockchain.cryptoCurrency.accountExists(fromAddress) || !blockchain.cryptoCurrency.accountExists(toAddress)) {
      res.status(400).json({ success: false, error: "One or both accounts do not exist." });
      return;
    }

    const transaction = blockchain.createTransaction(amount, fromAddress, toAddress, ticketID, firstName, lastName, email);
    blockchain.addTransaction(transaction);
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
