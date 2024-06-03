import { blockchain } from '../startup.mjs';

export const createTransaction = (req, res) => {
  const transaction = req.body;

  const blockIndex = blockchain.addTransaction(transaction);

  res.status(201).json({
    success: true,
    statusCode: 201,
    data: { message: 'Transaktion skapad', transaction, blockIndex },
  });
};

export const broadcastTransaction = (req, res) => {
  const transaction = blockchain.createTransaction(
    req.body.amount,
    req.body.sender,
    req.body.recipient,
    req.body.ticketID,
    req.body.firstName,
    req.body.lastName,
    req.body.email
  );

  const blockIndex = blockchain.addTransaction(transaction);

  blockchain.memberNodes.forEach(async (url) => {
    await fetch(`${url}/api/v1/transactions/transaction`, {
      method: 'POST',
      body: JSON.stringify(transaction),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });

  res.status(201).json({
    success: true,
    statusCode: 201,
    data: {
      message: 'Transaktion skapad och distribuerad',
      transaction,
      blockIndex,
    },
  });}
// export const broadcastTransaction = (req, res) => {
//   try {
//     const { amount, sender, recipient, ticketID, firstName, lastName, email } = req.body;

//     // Log the account names being used
//     console.log("sender:", sender);
//     console.log("recipient:", recipient);

//     // Log the existing accounts
//     console.log("Existing Accounts:", Array.from(blockchain.cryptoCurrency.accounts.keys()));

//     // Check if both accounts exist
//     if (!blockchain.cryptoCurrency.accountExists(sender) || !blockchain.cryptoCurrency.accountExists(recipient)) {
//       res.status(400).json({ success: false, error: "One or both accounts do not exist." });
//       return;
//     }

//     const transaction = blockchain.createTransaction(amount, sender, recipient, ticketID, firstName, lastName, email);
//     const blockIndex = blockchain.addTransaction(transaction);

//     blockchain.memberNodes.forEach(async (url) => {
//       await fetch(`${url}/api/v1/transactions/transaction`, {
//         method: 'POST',
//         body: JSON.stringify(transaction),
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//     });

//     res.status(201).json({
//       success: true,
//       statusCode: 201,
//       data: {
//         message: 'Transaktion skapad och distribuerad',
//         transaction,
//         blockIndex,
//       },
//     });
//   } catch (error) {
//     res.status(400).json({ success: false, error: error.message });
//   }
// };

