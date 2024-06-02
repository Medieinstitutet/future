import { v4 as uuid4 } from 'uuid';
export default class Transaction {
  constructor(amount, sender, recipient, ticketID, firstName, lastName, email) {
    this.amount = amount;
    this.sender = sender;
    this.recipient = recipient;
    this.ticketID = ticketID;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.transactionId = uuid4().replaceAll('-', '');
  }
  
  executeTransaction(cryptoCurrency) {
    cryptoCurrency.transferPayment(this.sender, this.recipient, this.amount, this.ticketID, this.firstName, this.lastName, this.email);
  }
}