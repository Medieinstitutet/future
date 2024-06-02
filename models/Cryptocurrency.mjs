import FileHandler from "../utilities/filehandler.mjs";

export default class CryptoCurrency {
  constructor(folder, filename) {
    this.fileHandler = new FileHandler(folder, filename);
    this.accounts = new Map(this.fileHandler.read(true));
  }

  saveAccounts() {
    // Convert map to array and then to JSON to save
    this.fileHandler.write(Array.from(this.accounts.entries()));
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
