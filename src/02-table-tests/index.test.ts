// Uncomment the code below and write your tests
import {  simpleCalculator, Action } from './index';

const testCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 2, b: 2, action: Action.Add, expected: 4 },
    { a: 3, b: 2, action: Action.Add, expected: 5 },
    { a: 4, b: 2, action: Action.Subtract, expected: 2 },
    { a: 5, b: 2, action: Action.Multiply, expected: 10 },
    { a: 6, b: 2, action: Action.Divide, expected: 3 },
    { a: 2, b: 3, action: Action.Exponentiate, expected: 8 }
]; 

describe('simpleCalculator', () => {
  testCases.forEach((testCase) => {
    const { a, b, action, expected } = testCase;

    test(`should return ${expected} for ${a} ${action} ${b}`, () => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toEqual(expected);
    });
  });

  test('should return null for invalid input', () => {
    const result = simpleCalculator({ a: 'invalid', b: 2, action: Action.Add });
    expect(result).toBeNull();
  });
});