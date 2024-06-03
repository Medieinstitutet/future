import FileHandler from '../utilities/filehandler.mjs';

export default class CryptoCurrency {
  constructor(folder, filename) {
    this.fileHandler = new FileHandler(folder, filename);
    const data = this.fileHandler.read(true);
    console.log('Loaded Accounts Data:', data);
    this.accounts = new Map(data.accounts || []);
  }

  saveAccounts() {
    const data = { accounts: Array.from(this.accounts.entries()) };
    this.fileHandler.write(data);
  }

  createAccount(address) {
    if (this.accounts.has(address)) {
      throw new Error('Account already exists.');
    }
    this.accounts.set(address, 0); // Initial balance is zero
    this.saveAccounts();
  }

  getBalance(address) {
    if (!this.accounts.has(address)) {
      throw new Error('Account does not exist.');
    }
    return this.accounts.get(address);
  }

  addFunds(address, amount) {
    if (!this.accounts.has(address)) {
      throw new Error('Account does not exist.');
    }
    if (typeof amount !== 'number') {
      throw new Error('Amount must be a number.');
    }
    this.accounts.set(address, this.accounts.get(address) + amount);
    this.saveAccounts();
  }

  transferFunds(fromAddress, toAddress, amount) {
    if (!this.accounts.has(fromAddress) || !this.accounts.has(toAddress)) {
      throw new Error('One or both accounts do not exist.');
    }
    if (this.accounts.get(fromAddress) < amount) {
      throw new Error('Insufficient funds.');
    }
    if (typeof amount !== 'number') {
      throw new Error('Amount must be a number.');
    }
    this.accounts.set(fromAddress, this.accounts.get(fromAddress) - amount);
    this.accounts.set(toAddress, this.accounts.get(toAddress) + amount);
    this.saveAccounts();
  }
}
