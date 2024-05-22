import { v4 as uuid4 } from 'uuid';

export default class Transaction {
  constructor(sum, payer, payee) {
    this.sum = sum;
    this.payer = payer;
    this.payee = payee;
    this.transactionId = uuid4().replaceAll('-', '');
  }
}
