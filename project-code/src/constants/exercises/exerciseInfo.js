export const exerciseInfo = [
  {
    "type": 1,
    "label": "Edge Cases",
    "exercises": [
      {
        "label": "Introduction",
        "id": 1.0,
        "code": "",
        "description": `In this section you will be identifying edge cases in functions. For each exercise, you will be
        given a function, with a description of what it should do, and you will provide an input/set of parameters that
        cause the function to act in an incorrect or unexpected way.`,
        "input-type": "",
        "show-editor": false,
      },
      {
        "label": "Fizzbuzz",
        "id": 1.1,
        "code": `
function fizzbuzz(n) {
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
}`,
        "description": `<h3>Fizzbuzz</h3>
        Fizzbuzz is a well known coding problem where a positive integer n is given as input, and for
        each number from 0 through n, if that number is divisible by 3, 'fizz' is printed, if it is divisible by 5, 'buzz'
        is printed, and if it is divisible by 3 and 5, 'fizzbuzz' is printed. In this case, the values are just being 
        pushed to an array, which is then returned. Provide an input n that causes this code to return an incorrect
        output.
        <h4>Defined Behavior:</h4>
        <ul>
          <li>Any positive integer input</li>
        </ul>
        <h4>Undefined Behavior:</h4>
        <ul>
          <li>Any non-integer or non-positive integer inputs</li>
        </ul>`,
        "input-type": 1,
        "num-inputs": 1,
        "show-editor": false,
        "placeholder-code": "// input n here",
      },
      {
        "label": "Fizzbuzz Counts",
        "id": 1.2,
        "code": `
function fizzbuzzCounts(n) {
  const counts = {
    fizz: 0,
    buzz: 0,
    fizzbuzz: 0,
  };
  for (let i = 0; i < n; i ++) {
    if (i % 3 === 0 && i % 5 === 0) {
      counts.fizzbuzz ++;
    } else if (i % 3 === 0) {
      counts.fizz ++;
    } else if (i % 5 === 0) {
      counts.buzz ++;
    }
  }
  return counts;
}`,
        "description": `This variant of the fizzbuzz problem is simply trying to count the number of times that each
        word would be printed. Provide an input that produces an incorrect output.`,
        "input-type": 1,
        "num-inputs": 1,
        "show-editor": false,
        "placeholder-code": "// input n here",
      },
      {
        "label": "Rainfall",
        "id": 1.3,
        "code": `
function rainfall(measurements) {
  if (measurements.length === 0) {
    return 0;
  }
  const total_rain = 0;
  const total_days = 0;
  for (let measurement of measurements) {
    if (measurement > 0) {
      total_rain += measurement;
      total_days += 1;
    } else {
      total_rain += 0;
      total_days += 0;
    }
  }
  return total_rain / total_days;
}`,
        "description": `The goal of this function is to determine the average rainfall from an array of rainfall measurements.
        Additionally, negative numbers should be ignored. Provide an input array that causes this function to fail.`,
        "input-type": 1,
        "num-inputs": 1,
        "show-editor": false,
        "placeholder-code": "// [...]",
      },
      {
        "label": "Object Keys",
        "id": 1.4,
        "code": `
function multiplyObjects(obj1, obj2) {
  if (obj1 !== obj2) {
    for (const key in obj1) {
      if (typeof obj1[key] === 'number' && typeof obj2[key] === 'number') {
        obj1[key] = obj1[key] * obj2[key];
      } else {
        return obj1;
      }
    }
    return obj1;
  } else {
    return obj1;
  }
}`,
        "description": `This function takes two objects that both have properties a, b, and c, and multiplies the values
        associated with each property together and returns the result. Constraints: 1. the objects should not have the
        same values for each key, or else the original object is returned. 2: The values should only be numbers. The code
        is responsible for checking that these constraints are met.`,
        "input-type": 1,
        "num-inputs": 2,
        "show-editor": false,
        "placeholder-code": "// {a: ..., b: ..., c: ...}",
      }
    ]
  },
  {
    "type": 2,
    "label": "Debugging",
    "exercises": [
      {
        "label": "Introduction",
        "id": 2.0,
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
        "id": 2.1,
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
        "id": 2.2,
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
    "type": 3,
    "label": "Unit Tests",
    "exercises": [
      {
        "label": "Introduction",
        "id": 3.0,
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
        "id": 3.1,
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
        "id": 3.2,
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