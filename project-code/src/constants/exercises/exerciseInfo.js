export const exerciseInfo = [
  {
    "type": 1,
    "label": "Debugging",
    "exercises": [
      {
        "label": "Introduction",
        "id": 1.0,
        "code": "",
        "description": `In this section you will be debugging code and identifying edge cases that are not covered by
        certain functions. Each exercise will provide an example function that has some form of bug or missing edge case
        that you are responsible for identifying. You will either be asked to provide an input that breaks the function,
        or implement the corrected version of the code. Good luck!!`,
        "input-type": "",
        "show-editor": false,
      },
      {
        "label": "String Comp",
        "id": 1.1,
        "code": `
        function compareStrings(s1, s2) {
          if (s1 === '' || s2 === '') {
            return true;
          } else {
            return compareStrings(s1.substring(1), s2.substring(1));
          }
        }`,
        "description": `The following method is intended to take two strings as input and compare their individual
        characters, returning true if the strings are equal, and false otherwise. You must keep the implementation
        recursive, and use no for loops.`,
        "input-type": "",
        "show-editor": true,
        "placeholder-code": `
function compareStrings(s1, s2) {
  if (s1 === '' || s2 === '') {
    return true;
  } else {
    return compareStrings(s1.substring(1), s2.substring(1));
  }
}
        `
      },
      {
        "label": "Base Four",
        "id": 1.2,
        "code": `
function intToBaseFour(n) {
  let baseFour = ''
  while (n > 0) {
    if (n % 4 == 0) {
      baseFour = '0' + baseFour;
    } else if (n % 4 == 1) {
      baseFour = '1' + baseFour;
    } else if (n % 4 == 2) {
      baseFour = '2' + baseFour;
    } else {
      baseFour = '3' + baseFour;
    }
    n = n / 4;
  }
  return baseFour;
}`,
        "description": `This function should convert from an integer in base 10 to a string representing the equivalent
        base 4 number. Identify the bug in the function and write a correct implementation.`,
        "input-type": "",
        "show-editor": true,
        "placeholder-code":`
function intToBaseFour(n) {
  let baseFour = ''
  while (n > 0) {
    if (n % 4 == 0) {
      baseFour = '0' + baseFour;
    } else if (n % 4 == 1) {
      baseFour = '1' + baseFour;
    } else if (n % 4 == 2) {
      baseFour = '2' + baseFour;
    } else {
      baseFour = '3' + baseFour;
    }
    n = n / 4;
  }
  return baseFour;
}`,
      }
    ],
  },
  {
    "type": 2,
    "label": "Unit Tests",
    "exercises": [
      {
        "label": "Introduction",
        "id": 2.0,
        "code": `
// For example, given the following function:

function checkParity(n) {
  if (n % 2 === 0) {
    return true;
  } else {
    return false;
  }
}


// your assertions might be:

assert(checkParity(2) === true);
assert(checkParity(3) === false);`,
        "description": `In this section you will be writing unit level tests on provided functions. You will do this
        through writing a series of assertion tests. Your goal is to write tests that fully cover all branches of the
        provided function. This means you should consider possible inputs and edge cases so that the function is 
        exercised on a comprehensive set of inputs.`,
        "input-type": "",
        "show-editor": false,
      },
      {
        "label": "Even/Odd",
        "id": 2.1,
        "code": `
        function checkParity(n) {
          if (n % 2 === 0) {
            return true;
          } else {
            return false;
          }
        }`,
        "description": `To get a feel for the process of these exercises, the first question is the same as the one from
        the example in the introduction. The method should check if an integer is even or odd, and return true for even
        inputs and false for odd inputs. Write a series of assertion tests that cover all branches of the control flow.`,
        "input-type": "",
        "show-editor": true,
        "placeholder-code": `
assert(...);
assert(...);`
      },
      {
        "label": "Rainfall",
        "id": 2.2,
        "code": `
function rainfal(measurements) {
  // input: array of Numbers
  // output: a Number representing the average rainfall in measurements
}`,
        "description": `Assume that you are given an array of measurements of rainfall, and you must determine the 
        average amount of rainfall. However, any negative measurements should be ignored, and the presence of the value
        99999 indicates that the processing of measurements should stop. This means all values after 99999 should be
        ignored`,
        "input-type": "",
        "show-editor": true,
        "placeholder-code": `
let measurements = [...];

assert(rainfall(measurements) === ...);

let measurements = [...];

...
      `},
    ],
  }
];