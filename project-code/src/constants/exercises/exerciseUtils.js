// define all the test functions/utilities in here


const exerciseTestCases = new Map();

// add test cases for 1.1
exerciseTestCases.set(1.1,
  {
    testCase: (fn) => {
      const testInputs = [
        ['', '', true],
        ['a', 'a', true],
        ['abc', 'abc', true],
        ['123456790abcdefghijklmnopqrstuvwxyz', '123456790abcdefghijklmnopqrstuvwxyz', true],
        ['', 'abc', false],
        ['abc', '', false],
        ['a', 'abc', false],
        ['abc', 'a', false],
      ];
      for (const input of testInputs) {
        if (fn(input[0], input[1]) !== input[2]) {
          return {
            pass: false,
            failedInput: `'${input[0]}', '${input[1]}'`,
          }
        }
      }
      return {
        pass: true,
        failedInput: null,
      }
    },
    templateArgs: 's1, s2',
    templateSuffix: 'return compareStrings(s1, s2);'
  }
)

// add test cases for 1.2
exerciseTestCases.set(1.2, 
  {
    testCase: (fn) => {
      for (let i = 1; i < 10000; i ++) {
        if (fn(i) !== i.toString(4)) {
          return {
            pass: false,
            failedInput: `${i}`,
          }
        }
      }
      return {
        pass: true,
        failedInput: null,
      };
    },
    templateArgs: 'n',
    templateSuffix: 'return intToBaseFour(n);',
  }
);

export { exerciseTestCases };
