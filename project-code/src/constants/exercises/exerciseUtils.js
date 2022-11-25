// define all the test functions/utilities in here


const exerciseTestCases = new Map();

exerciseTestCases.set(1.1,
  {
    testCase: (n) => {
      const correct = (n) => {
        const output = [];
        for (let i = 0; i <= n; i ++) {
          if (i % 3 === 0 && i % 5 === 0) {
            output.push('fizzbuzz');
          } else if (i % 3 === 0) {
            output.push('fizz');
          } else if (i % 5 === 0) {
            output.push('buzz');
          }
        }
        return output;
      }
      const incorrect = (n) => {
        const output = [];
        for (let i = 0; i <= n; i ++) {
          if (i % 3 === 0 && i % 5 === 0) {
            output.push('fizzbuzz');
          } else if (i % 3 === 0) {
            output.push('fizz');
          } else {
            output.push('buzz');
          }
        }
        return output;
      }
      return JSON.stringify(correct(n)) !== JSON.stringify(incorrect(n));
    },
    templateArgs: '',
    templateSuffix: '',
  }
);

exerciseTestCases.set(1.2,
  {
    testCase: (n) => {
      return n > 0 && (n % 5 === 0 || n % 3 === 0);
    },
    templateArgs: '',
    templateSuffix: '',
  }
);


exerciseTestCases.set(1.3,
  {
    testCase: (measurements) => {
      const check = measurements.filter(item => item >= 0);
      return check.length === 0;
    },
    templateArgs: '',
    templateSuffix: '',
  }
);


exerciseTestCases.set(1.4,
  {
    testCase: (letters) => {
      const correct = (letters) => {
        let returnGroup = '';
        let i = 0;
        while (i < letters.length) {
          const currLetter = letters.charAt(i);
          let j = i + 1;
          while (j < letters.length &&
                 letters.charAt(j) === currLetter) {
            j += 1;
          }
          const newSequence = letters.substring(i, j);
          if (newSequence.length > returnGroup.length) {
            returnGroup = newSequence;
          } else if (newSequence.length === returnGroup.length) {
            if (newSequence < returnGroup) {
              returnGroup = newSequence;
            }
          }
          i = j;
        }
        return returnGroup;
      }
      const incorrect = (letters) => {
        let returnGroup = '';
        let i = 0;
        while (i < letters.length) {
          const currLetter = letters.charAt(i);
          let j = i + 1;
          while (j < letters.length && letters.charAt(j) === currLetter) {
            j += 1;
          }
          const newSequence = letters.substring(i, j);
          if (newSequence.length > returnGroup.length) {
            returnGroup = newSequence;
          }
          i = j;
        }
        return returnGroup;
      }
      return correct(letters) !== incorrect(letters);
    },
    templateArgs: '',
    templateSuffix: '',
  }
);

exerciseTestCases.set(1.5,
  {
    testCase: (letters) => {
      if (letters.length === 0) {
        return false;
      }
      if (! letters.includes('a'||'b'||'c'||'d')) {
        return false;
      }
      const targetSet = new Set(['a', 'b', 'c', 'd']);
      return !targetSet.has(letters.charAt(0));
    },
    templateArgs: '',
    templateSuffix: '',
  }
);


exerciseTestCases.set(2.1,
  {
    testCase: (fn) => {
      const testInputs = [
        [1, ['fizzbuzz']],
        [3, ['fizzbuzz', 'fizz']],
        [5, ['fizzbuzz', 'fizz', 'buzz']],
        [15, ['fizzbuzz', 'fizz', 'buzz', 'fizz', 'fizz', 'buzz', 'fizz', 'fizzbuzz']],
      ];
      for (const input of testInputs) {
        if (JSON.stringify(fn(input[0])) !== JSON.stringify(input[1])) {
          return {
            pass: false,
            failedInput: `'${input[0]}'`,
          }
        }
      }
      return {
        pass: true,
        failedInput: null,
      }
    },
    templateArgs: 'n',
    templateSuffix: 'return fizzbuzz(n);'
  }
)

// add test cases for 1.2
exerciseTestCases.set(2.2, 
  {
    testCase: (fn) => {
      const testInputs = [
        [1, {fizz: 0, buzz: 0, fizzbuzz: 1}],
        [3, {fizz: 1, buzz: 0, fizzbuzz: 1}],
        [5, {fizz: 1, buzz: 1, fizzbuzz: 1}],
        [15, {fizz: 4, buzz: 2, fizzbuzz: 2}],
      ];
      for (const input of testInputs) {
        if (JSON.stringify(fn(input[0])) !== JSON.stringify(input[1])) {
          return {
            pass: false,
            failedInput: `'${input[0]}'`,
          }
        }
      }
      return {
        pass: true,
        failedInput: null,
      }
    },
    templateArgs: 'n',
    templateSuffix: 'return fizzbuzzCounts(n);',
  }
);

exerciseTestCases.set(2.3, 
  {
    testCase: (fn) => {
      const testInputs = [
        [[5,5,5,5,5], 5],
        [[1,2,3,4,5], 3],
        [[0,0,0,0,0], 0],
        [[0,-1,0,-1], 0],
        [[5,-1,5,-1,5], 5],
        [[-1,-1], 0],
        [[5,5,5,5,99999,100], 5],
        [[5,-1,99999,5,-1], 5],
        [[99999], 0],
      ];
      for (const input of testInputs) {
        if (fn(input[0]) !== input[1]) {
          return {
            pass: false,
            failedInput: `'${input[0]}'`,
          }
        }
      }
      return {
        pass: true,
        failedInput: null,
      }
    },
    templateArgs: 'measurements',
    templateSuffix: 'return rainfall(measurements);',
  }
);

exerciseTestCases.set(2.4, 
  {
    testCase: (fn) => {
      const testInputs = [
        ['abc', 'a'],
        ['cba', 'a'],
        ['abbc', 'bb'],
        ['abbccc', 'ccc'],
        ['cccbbaaa', 'aaa'],
        ['aaabbb111', '111'],
      ];
      for (const input of testInputs) {
        if (fn(input[0]) !== input[1]) {
          return {
            pass: false,
            failedInput: `'${input[0]}'`,
          }
        }
      }
      return {
        pass: true,
        failedInput: null,
      }
    },
    templateArgs: 'letters',
    templateSuffix: 'return letterGroups(letters);',
  }
);

exerciseTestCases.set(2.5, 
  {
    testCase: (fn) => {
      const testInputs = [
        ['abc', new Set(['a', 'b', 'c'])],
        ['aabc', new Set(['a'])],
        ['abbccc', new Set(['c'])],
        ['zzabc', new Set(['a', 'b', 'c'])],
        ['zxy', new Error('no valid input letters')],
      ];
      for (const input of testInputs) {
        try {
          let res = fn(input[0]);
          if (!(res.size === input[1].size &&
                [...res].every(val => input[1].has(val)))) {
            return {
              pass: false,
              failedInput: `'${input[0]}'`,
            }
          }
        } catch (e) {
          if (JSON.stringify(e) !== JSON.stringify(input[1])) {
            return {
              pass: false,
              failedInput: `'${input[0]}'`,
            }
          }
        }
      }
      return {
        pass: true,
        failedInput: null,
      }
    },
    templateArgs: 'letters',
    templateSuffix: 'return frequentTargets(letters);',
  }
);

function initCoverageCheck(coverageCheck, numBranches) {
  for (let _ = 0; _ < numBranches; _ ++) {
    coverageCheck.push(false);
  }
}

function reportCoverage(coverageCheck) {
  const uncoveredBranches = [];
  for (let i = 0; i < coverageCheck.length; i ++) {
    const line = coverageCheck[i];
    if (! line) {
      uncoveredBranches.push(i);
    }
  }
  const coverage = (coverageCheck.length - uncoveredBranches.length) / coverageCheck.length
  return {
    coverage: Math.trunc(coverage * 100),
    uncoveredBranches: uncoveredBranches,
  }
}

function reportAssertions(assertionResults) {
  return assertionResults[0]
    .map(el => el.assertion)
    .map((bool, ind) => 
    {
      if (! bool) {
        return ind + 1;
      } else {
        return -1;
      }
    })
    .filter(n => n > 0);
}

function buildEvalResult(coverageCheck, assertionResults) {
  const coverageReport = reportCoverage(coverageCheck);
  const assertionReport = reportAssertions(assertionResults);
  return {
    pass: coverageReport.uncoveredBranches.length || assertionReport.length ? false : true,
    error: false,
    coverageReport: coverageReport,
    assertionReport: assertionReport,
  }
}

const assert = `
function assert(condition) {
  assertionResults[0].push({assertion: condition});
}
`

// add test cases for 2.1
exerciseTestCases.set(3.1, 
  {
    testCase: (fn) => {
      const coverageCheck = [];
      const assertionResults = [[]];
      initCoverageCheck(coverageCheck, 2);
      const checkParity = (n) => {
        if (n % 2 === 0) {
          coverageCheck[0] = true;
          return true;
        } else {
          coverageCheck[1] = true;
          return false;
        }
      }
      fn(checkParity, coverageCheck, assertionResults);
      return buildEvalResult(coverageCheck, assertionResults);
    },
    templateArgs: 'checkParity, coverageCheck, assertionResults',
    templateSuffix: assert,
  }
);
  


// add test cases for 2.2
exerciseTestCases.set(3.2, 
  {
    testCase: (fn) => {
      const coverageCheck = [];
      const assertionResults = [[]];
      initCoverageCheck(coverageCheck, 6);
      const rainfall = (measurements) => {
        let total_rain = 0;
        let total_days = 0;
        for (let measurement of measurements) {
          if (measurement === 99999) {
            coverageCheck[0] = true;
            break;
          } else {
            coverageCheck[1] = true;
            if (measurement > 0) {
              coverageCheck[2] = true;
              total_rain += measurement;
              total_days += 1;
            } else {
              coverageCheck[3] = true;
              total_rain += 0;
              total_days += 0;
            }
          }
        }
        if (total_rain > 0) {
          coverageCheck[4] = true;
          return total_rain / total_days;
        } else {
          coverageCheck[5] = true;
          return 0;
        }
      }
      fn(rainfall, coverageCheck, assertionResults);
      return buildEvalResult(coverageCheck, assertionResults);
    },
    templateArgs: 'rainfall, coverageCheck, assertionResults',
    templateSuffix: assert,
  }
);

// add test cases for 2.2
// exerciseTestCases.set(3.3, 
//   {
//     testCase: (fn) => {
//       const coverageCheck = [];
//       const assertionResults = [[]];
//       initCoverageCheck(coverageCheck, 3);
//       const sort = (vals) => {
//         for (let i = 0; i < vals.length; i ++) {
//           coverageCheck[0] = true;
//           let min_val_ind = i;
//           for (let j = i + 1; j < vals.length; j ++) {
//             coverageCheck[1] = true;
//             if (vals[j] < vals[min_val_ind]) {
//               coverageCheck[2] = true;
//               min_val_ind = j;
//             }
//           }
//           let saved = vals[i];
//           vals[i] = vals[min_val_ind];
//           vals[min_val_ind] = saved;
//         }
//       }
//       fn(sort, coverageCheck, assertionResults);
//       return buildEvalResult(coverageCheck, assertionResults);
//     },
//     templateArgs: 'sort, coverageCheck, assertionResults',
//     templateSuffix: assert,
//   }
// );

exerciseTestCases.set(3.3, 
  {
    testCase: (fn) => {
      const coverageCheck = [];
      const assertionResults = [[]];
      initCoverageCheck(coverageCheck, 9);
      const letterGroups = (letters) => {
        let returnGroup = '';
        let i = 0;
        if (i < letters.length) {
          coverageCheck[0] = true;
          while (i < letters.length) {
            const currLetter = letters.charAt(i);
            let j = i + 1;
            if (j < letters.length && letters.charAt(j) === currLetter) {
              coverageCheck[2] = true;
              while (j < letters.length && letters.charAt(j) === currLetter) {
                j += 1;
              }
            } else {
              coverageCheck[3] = true;
            }
            const newSequence = letters.substring(i, j);
            if (newSequence.length > returnGroup.length) {
              coverageCheck[4] = true
              returnGroup = newSequence;
            } else if (newSequence.length === returnGroup.length) {
              coverageCheck[5] = true;
              if (newSequence < returnGroup) {
                coverageCheck[7] = true;
                returnGroup = newSequence;
              } else {
                coverageCheck[8] = true;
              }
            } else {
              coverageCheck[6] = true;
            }
            i = j;
          }
        } else {
          coverageCheck[1] = true; 
        }
        return returnGroup;
      }
      fn(letterGroups, coverageCheck, assertionResults);
      return buildEvalResult(coverageCheck, assertionResults);
    },
    templateArgs: 'letterGroups, coverageCheck, assertionResults',
    templateSuffix: assert,
  }
);

exerciseTestCases.set(3.4,
  {
    testCase: (fn) => {
      const coverageCheck = [];
      const assertionResults = [[]];
      initCoverageCheck(coverageCheck, 7);
      const frequentTargets = (letters) => {
        const targets = new Map([['a', 0], ['b', 0], ['c', 0], ['d', 0]]);
        let seenTargets = 0;
        let currLetter;
        for (let i = 0; i < letters.length; i ++) {
          currLetter = letters.charAt(i);
          if (targets.has(currLetter)) {
            coverageCheck[0] = true;
            seenTargets ++;
            targets.set(currLetter, targets.get(currLetter) + 1);
          } else {
            coverageCheck[1] = true;
          }
        }
        if (seenTargets === 0) {
          coverageCheck[2] = true;
          throw new Error('no valid input letters');
        } else {
          coverageCheck[3] = true;
        }
        let mostFrequent = new Set();
        let largestCount = 0;
        for (let i = 0; i < letters.length; i ++) {
          currLetter = letters.charAt(i);
          if (targets.get(currLetter) > largestCount) {
            coverageCheck[4] = true;
            mostFrequent.clear();
            mostFrequent.add(currLetter);
            largestCount = targets.get(currLetter);
          } else if (targets.get(currLetter) === largestCount) {
            coverageCheck[5] = true;
            mostFrequent.add(currLetter);
          } else {
            coverageCheck[6] = true;
          }
        }
        return mostFrequent;
      }
      fn(frequentTargets, coverageCheck, assertionResults);
      return buildEvalResult(coverageCheck, assertionResults);
    },
    templateArgs: 'frequentTargets, coverageCheck, assertionResults',
    templateSuffix: assert,
  }
);

export { exerciseTestCases };
