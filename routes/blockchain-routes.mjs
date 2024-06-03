import express from 'express';
import {
  mineBlock,
  getBlockchain,
  synchronizeChain,
  updateChain,
  getPendingTransactions,
} from '../controllers/blockchain-controller.mjs';

const router = express.Router();

router.route('/').get(getBlockchain);
router.route('/mine').get(mineBlock);
router.route('/concensus').get(synchronizeChain);
router.route('/block/broadcast').post(updateChain);
router.route('/pending-transactions').get(getPendingTransactions);
export default router;
