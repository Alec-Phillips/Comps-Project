
// informal enumeration:
//    - 1: Number
//    - 2: Array
//    - 3: String
//    - 4: Object

export const exerciseInfo = [
  {
    "type": 1,
    "label": "Edge Cases",
    "exercises": [
      {
        "label": "Introduction",
        "id": 1.0,
        "code": 
        `
        // your goal is to identify the error in this code

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
          return output;
        }
        
        // the issue here is that 'buzz' should only be pushed to the array
        // when i is divisible by 5`,
        "description": `
        <h1>Introduction</h1>
        <hr></hr>
        <h3>Overview</h3>
        In this section you will be identifying errors or edge cases
        <br></br>
        Each exercise will include:
        <ul>
          <li>A function that is incorrect in some way</li>
          <li>A description of what that function is supposed to do</li>
          <li>A description of defined behaviors; inputs that the function <em>should</em> be able to handle</li>
          <li>A description of undefined behaviors; inputs that are outside of the scope of the problem and don't need to be tested</li>
        </ul>
        Your job is to provide an input within the scope of the <em>defined behaviors</em> of the function that exposes the error in the code.
        So to pass each exercise, the input that you provide should create an incorrect output.
        <hr></hr>
        <h3>Example Problem: Fizzbuzz</h3>
        <h4>Function Description:</h4>
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
        </ul>
        `,
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
  return output;
}`,
        "description": `
        <h3>Fizzbuzz</h3>
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
        "param-types": [1],
        "num-inputs": 1,
        "show-editor": false,
        "placeholder-code": "// input n here",
        "acceptance-description": "This code fails for all inputs, because the else block always appends 'buzz'",
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
        "description": `
        <h3>Fizzbuzz Counts</h3>
        This variant of the fizzbuzz problem is simply trying to count the number of times that each
        word would be printed. This means that for each value from 0 up to and including n, if the value
        is divisible by 3 and 5, the count for 'fizzbuzz' should be incremented, if it is divisible by just 3
        then 'fizz' is incremented, and if the value is only divisible by 5 then the count for 'buzz' is incremented.
        <h4>Defined Behavior:</h4>
        <ul>
          <li>Any positive integer input</li>
        </ul>
        <h4>Undefined Behavior:</h4>
        <ul>
          <li>Any non-integer or non-positive integer inputs</li>
        </ul>`,
        "input-type": 1,
        "param-types": [1],
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
  let total_rain = 0;
  let total_days = 0;
  for (let measurement of measurements) {
    if (measurement >= 0) {
      total_rain += measurement;
      total_days += 1;
    }
  }
  return total_rain / total_days;
}`,
        "description": `
        <h3>Rainfall</h3>
        The goal of this function is to determine the average rainfall from an array of rainfall measurements.
        Additionally, negative numbers should be ignored. Provide an input array that causes this function to fail.
        <h4>Defined Behavior:</h4>
        <ul>
          <li>Any non-empty array containing any integer values</li>
        </ul>
        <h4>Undefined Behavior:</h4>
        <ul>
          <li>Any non-array inputs</li>
          <li>An input array of length 0</li>
          <li>Any array containing non-integer values</li>
        </ul>`,
        "input-type": 1,
        "param-types": [2.1],
        "num-inputs": 1,
        "show-editor": false,
        "placeholder-code": "// [...]",
      },
//       {
//         "label": "Object Keys",
//         "id": 1.4,
//         "code": `
// function multiplyObjects(obj1, obj2) {
//   if (obj1 !== obj2) {
//     for (const key in obj1) {
//       if (typeof obj1[key] === 'number' && typeof obj2[key] === 'number') {
//         obj1[key] = obj1[key] * obj2[key];
//       } else {
//         return obj1;
//       }
//     }
//     return obj1;
//   } else {
//     return obj1;
//   }
// }`,
//         "description": `This function takes two objects that both have properties a, b, and c, and multiplies the values
//         associated with each property together and returns the result. Constraints: 1. the objects should not have the
//         same values for each key, or else the original object is returned. 2: The values should only be numbers. The code
//         is responsible for checking that these constraints are met.`,
//         "input-type": 1,
//         "num-inputs": 2,
//         "show-editor": false,
//         "placeholder-code": "// {a: ..., b: ..., c: ...}",
//       }
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
        "description": `
        <h1>Introduction</h1>
        <hr></hr>
        <h3>Overview</h3>
        In this section you will be debugging the functions from the previous section. The motivation behind this section 
        is to allow you to practice reasoning about some common bugs so that you can avoid them in your own implementations.
        <br></br>
        Each exercise will include:
        <ul>
          <li>A description of the function that you will be dubugging</li>
          <li>Defined behavior that you implementation should take into account</li>
          <li>The incorrect code</li>
          <li>An editor where you will implement a correct version of the function</li>
        </ul>
        `,
        "input-type": "",
        "show-editor": false,
      },
      {
        "label": "Fizzbuzz",
        "id": 2.1,
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
          return output;
        }`,
        "description": `
        <h3>Fizzbuzz</h3>
        To review, this function takes a positive integer n and for each value from 0 up to and including n, pushes 
        'fizzbuzz' to the array if the value is divisible by 3 and 5, pushes 'fizz' if the value is only divisible by 3,
        and pushes 'buzz' if the value is only divisible by 5.
        <h4>Defined Behavior</h4>
        <ul>
          <li>Any positive integer input</li>
        </ul>
        `,
        "input-type": "",
        "show-editor": true,
        "placeholder-code": `
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
  return output;
}
        `
      },
      {
        "label": "Fizzbuzz Counts",
        "id": 2.2,
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
        "description": `
        <h3>Fizzbuzz Counts</h3>
        To review, this function should check all values 0 up to and including n, incrementing the count associated with
        each value - for each value divisible by 5 and 3, increment the <code>fizzbuzz</code> attribute, for each value
        only divisible by 3 increment the <code>fizz</code> attribute, and for each value only divisible by 5 increment
        the <code>buzz</code> attribute.
        <h4>Defined Behavior</h4>
        <ul>
          <li>Any positive integer value</li>
        </ul>
        `,
        "input-type": "",
        "show-editor": true,
        "placeholder-code":`
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
      },
      {
        "label": "Rainfall",
        "id": 2.3,
        "code": `
        function rainfall(measurements) {
          if (measurements.length === 0) {
            return 0;
          }
          let total_rain = 0;
          let total_days = 0;
          for (let measurement of measurements) {
            if (measurement >= 0) {
              total_rain += measurement;
              total_days += 1;
            }
          }
          return total_rain / total_days;
        }`,
        "description": `
        <h3>Rainfall</h3>
        This version of the rainfall problem should still calculate the average rainfall in the array, ignoring negative
        measurements. Additionally, this version should terminate if the value <code>99999</code> is encountered.
        <h4>Defined Behavior</h4>
        <ul>
          <li>Any non-empty array containing any integer values</li>
        </ul>
        `,
        "input-type": "",
        "show-editor": true,
        "placeholder-code":`
function rainfall(measurements) {
  if (measurements.length === 0) {
    return 0;
  }
  let total_rain = 0;
  let total_days = 0;
  for (let measurement of measurements) {
    if (measurement >= 0) {
      total_rain += measurement;
      total_days += 1;
    }
  }
  return total_rain / total_days;
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
// given the following function:

function checkParity(n) {
  if (n % 2 === 0) {
    return true;
  } else {
    return false;
  }
}


// passing assertions might be:

assert(checkParity(2) === true);
assert(checkParity(3) === false);`,
        "description": `
        <h1>Introduction</h1>
        <hr></hr>
        In this section you will be writing unit level tests on provided functions
        <br></br>
        Directions:
        <ul>
          <li>For each function, write a series of assertion statements</li>
          <li>Try to reach 100% branch coverage on the function</li>
        </ul>
        You will be given:
        <ul>
          <li>A description of the function you are testing</li>
          <li>Either the code of the function itself, or a stub for the function along
          with a description of defined and undefined behaviors</li>
        </ul>
        <h4>Example</h4>
        `,
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
        "description": `
        <h3>Check Parity</h3>
        To get a feel for the process of these exercises, the first question is the same as the one from
        the example in the introduction. The <code>checkParity</code> function should check if an integer is even or odd,
        and return true for even
        inputs and false for odd inputs. Write a series of assertion tests that cover all branches of the control flow.`,
        "input-type": "",
        "show-editor": true,
        "placeholder-code": `
assert(checkParity() === );
assert(...);
`
      },
      {
        "label": "Rainfall",
        "id": 3.2,
        "code": `
// function stub:

function rainfal(measurements) {}`,
        "description": `
        <h3>Rainfall</h3>
        Once again you will be working with an altered version of rainfall
        <br></br>
        Function requirements:
        <ul>
          <li>Return the average of the measurements in the input array</li>
          <li>Negative values should be ignored</li>
          <li>When 99999 is encountered, any remaining measurements should be ignored</li>
          <li>If the empty array is inputted, 0 should be returned</li>
        </ul>
        `,
        "input-type": "",
        "show-editor": true,
        "placeholder-code": `

assert(rainfall([...]) === ...);

`},
    ],
  }
];