import { v4 as uuid4 } from 'uuid';
export default class Transaction {
  constructor(sum, payer, payee, ticketID, firstName, lastName, email) {
    this.sum = sum;
    this.payer = payer;
    this.payee = payee;
    this.ticketID = ticketID;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.transactionId = uuid4().replaceAll('-', '');
  }
  
  executeTransaction(cryptoCurrency) {
    cryptoCurrency.transferPayment(this.payer, this.payee, this.sum, this.ticketID, this.firstName, this.lastName, this.email);
  }
}