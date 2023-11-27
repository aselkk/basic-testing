// Uncomment the code below and write your tests
import { getBankAccount, InsufficientFundsError, SynchronizationFailedError } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(getBankAccount(10).getBalance()).toBe(10)
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => getBankAccount(10).withdraw(20)).toThrowError(InsufficientFundsError)
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => getBankAccount(10).transfer(20, getBankAccount(5))).toThrowError()
  });

  test('should throw error when transferring to the same account', () => {
    const someAcc = getBankAccount(10)
    expect(() => someAcc.transfer(20, someAcc)).toThrowError()
  });

  test('should deposit money', () => {
    const someAcc = getBankAccount(10)
    someAcc.deposit(5)
    expect(someAcc.getBalance()).toBe(15)
  });

  test('should withdraw money', () => {
    const someAcc = getBankAccount(10)
    someAcc.withdraw(5)
    expect(someAcc.getBalance()).toBe(5)
  });

  test('should transfer money', () => {
    const someAcc = getBankAccount(10)
    getBankAccount(20).transfer(5, someAcc)
    expect(someAcc.getBalance()).toBe(15)
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const someAcc = getBankAccount(10);
    jest.spyOn(someAcc, 'fetchBalance').mockResolvedValue(5);
    const result = await someAcc.fetchBalance()

    expect(typeof result).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const someAcc = getBankAccount(10);
    jest.spyOn(someAcc, 'fetchBalance').mockResolvedValue(5);

    await someAcc.synchronizeBalance();
    expect(someAcc.getBalance()).toBe(5);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const someAcc = getBankAccount(10);
    jest.spyOn(someAcc, 'fetchBalance').mockResolvedValue(null);

    await expect(someAcc.synchronizeBalance()).rejects.toThrowError(SynchronizationFailedError)
  });
});
