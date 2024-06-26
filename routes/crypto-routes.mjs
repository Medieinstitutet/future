import express from 'express';
// import { createAccount, getBalance, addFunds, transferFunds,getAccounts,transferPayment } from '../controllers/crypto-controller.mjs';
import { createAccount, getBalance, addFunds,getAccounts,transferPayment } from '../controllers/crypto-controller.mjs';

const router = express.Router();


router.route('/create-account').post(createAccount)
router.route('/balance/:address').get(getBalance)
router.route('/accounts').get(getAccounts)
router.route('/add-funds').post(addFunds)
// router.route('/transfer').post(transferFunds)
router.route('/transfer').post(transferPayment)

// router.post('/create-account', createAccount);
// router.get('/balance/:address', getBalance);
// router.post('/add-funds', addFunds);
// router.post('/transfer', transferFunds);

export default router;
