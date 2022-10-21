// define all the test functions/utilities in here


const exerciseTestCases = new Map();

// add test cases for 1.1
exerciseTestCases.set(2.1,
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
exerciseTestCases.set(2.2, 
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
exerciseTestCases.set(3.3, 
  {
    testCase: (fn) => {
      const coverageCheck = [];
      const assertionResults = [[]];
      initCoverageCheck(coverageCheck, 3);
      const sort = (vals) => {
        for (let i = 0; i < vals.length; i ++) {
          coverageCheck[0] = true;
          let min_val_ind = i;
          for (let j = i + 1; j < vals.length; j ++) {
            coverageCheck[1] = true;
            if (vals[j] < vals[min_val_ind]) {
              coverageCheck[2] = true;
              min_val_ind = j;
            }
          }
          let saved = vals[i];
          vals[i] = vals[min_val_ind];
          vals[min_val_ind] = saved;
        }
      }
      fn(sort, coverageCheck, assertionResults);
      return buildEvalResult(coverageCheck, assertionResults);
    },
    templateArgs: 'sort, coverageCheck, assertionResults',
    templateSuffix: assert,
  }
);

export { exerciseTestCases };
