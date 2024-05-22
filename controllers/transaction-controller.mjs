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
    req.body.sum,
    req.body.payer,
    req.body.payee
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
  });
};
