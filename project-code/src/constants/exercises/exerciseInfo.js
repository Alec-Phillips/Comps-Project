
// informal enumeration:
//    - 1: Number
//    - 2: Array
//    - 3: String
//    - 4: Object

export const exerciseGraph = new Map();
exerciseGraph.set(1.1, [2.1]);
exerciseGraph.set(1.2, [2.2]);
exerciseGraph.set(1.3, [2.3]);
exerciseGraph.set(1.4, [2.4]);
exerciseGraph.set(2.1, [1.2]);
exerciseGraph.set(2.2, [1.3]);
exerciseGraph.set(2.3, [1.4]);
exerciseGraph.set(3.1, [3.2]);
exerciseGraph.set(3.2, [3.3]);

export const exerciseInfo = [
  {
    "type": 1,
    "label": "Edge Cases & Debugging",
    "exercises": [
      {
        "label": "Introduction",
        "id": 1.0,
        "code": "",
        "description": `
        <h1>Introduction</h1>
        <hr></hr>
        <h3>Overview</h3>
        In this section you will be identifying errors or edge cases in functions and then fixing these errors
        <br></br>
        This will provide good practice with reasoning about code correctness, and will also give you practice familiarizing
        yourself with the javascript language
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
        `,
        "input-type": "",
        "show-editor": false,
        "next-exercises": null,
      },
      {
        "label": "Example: Fizzbuzz",
        "id": 1.1,
        "code": `
// this implementation fails on all inputs
function fizzbuzz(n) {
  const output = [];
  for (let i = 0; i <= n; i ++) {
    if (i % 3 === 0 && i % 5 === 0) {
      output.push('fizzbuzz');
    } else if (i % 3 === 0) {
      output.push('fizz');
    } else {
      // this is the error
      // this should be an else if
      // that is only entered when i
      // is divisible by 5
      output.push('buzz');
    }
  }
  return output;
}`,
        "description": `
        <h1>Example Problem: Fizzbuzz</h1>
        <hr></hr>
        Fizzbuzz is a well known coding problem that asks for a function that takes a positive integer n, and loops through
        each number from 0 through n. For each of these values, if it is divisible by 3 and 5, 'fizzbuzz' should be printed,
        if it is divisible by only 3, then 'fizz' should be printed, and if it is divisible by only 5, then 'buzz' should be
        printed. 
        <br></br>
        In this variation, instead of printing the strings, they are pushed to the array <code>output</code> which is then returned.
        <br></br>
        Examine the code and identify the error. Then provide an input that exposes this error
        <h4>Defined Behavior:</h4>
        <ul>
          <li>Any positive integer input</li>
        </ul>
        <h4>Undefined Behavior:</h4>
        <ul>
          <li>Any non-integer or non-positive integer inputs</li>
        </ul>
        Since this is an example, the comments in the code snipped explain the error`,
        "input-type": 1,
        "param-types": [1],
        "num-inputs": 1,
        "show-editor": false,
        "placeholder-code": "// input n here",
        "next-exercises": [1.2, 2.1],
        "acceptance-description": "This code fails for all inputs, because the else block always appends 'buzz'",
      },
      {
        "label": "Fizzbuzz Debug",
        "id": 2.1,
        "next-exercises": [],
        "code": `
        function fizzbuzz(n) {
          const output = [];
          for (let i = 0; i <= n; i ++) {
            if (i % 3 === 0 && i % 5 === 0) {
              output.push('fizzbuzz');
            } else if (i % 3 === 0) {
              output.push('fizz');
            } else {
              // hint:
              // this should be an else if block
              output.push('buzz');
            }
          }
          return output;
        }`,
        "description": `
        <h1>Example Problem: Fizzbuzz</h1>
        <hr></hr>
        Fizzbuzz is a well known coding problem that asks for a function that takes a positive integer n, and loops through
        each number from 0 through n. For each of these values, if it is divisible by 3 and 5, 'fizzbuzz' should be printed,
        if it is divisible by only 3, then 'fizz' should be printed, and if it is divisible by only 5, then 'buzz' should be
        printed. 
        <br></br>
        In this variation, instead of printing the strings, they are pushed to the array <code>output</code> which is then returned.
        <br></br>
        Examine the code and identify the error, and then implement a correct version in the editor below
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
        <h1>Fizzbuzz Counts</h1>
        <hr></hr>
        This is a variation of the popular fizzbuzz problem. This function also takes a positive integer input and loops
        through all values from 0 up to and including n. This time, the function should return a <code>counts</code> object
        that counts how many times the strings 'fizz', 'buzz', and 'fizzbuzz' would be encountered. This means that for 
        each value from 0 through n, if the value
        is divisible by 3 and 5, the count for 'fizzbuzz' should be incremented, if it is divisible by just 3
        then 'fizz' is incremented, and if the value is only divisible by 5 then the count for 'buzz' is incremented.
        <br></br>
        Examine the code and identify the error. Then provide an input that exposes this error
        <br></br>
        If you are unfamiliar with javascript objects, see <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects" target="_blank">this documentation</a>
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
        "next-exercises": [1.3, 2.2],
      },
      {
        "label": "Fizzbuzz Counts Debug",
        "id": 2.2,
        "next-exercises": [],
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
        <h1>Fizzbuzz Counts</h1>
        <hr></hr>
        This is a variation of the popular fizzbuzz problem. This function also takes a positive integer input and loops
        through all values from 0 up to and including n. This time, the function should return a <code>counts</code> object
        that counts how many times the strings 'fizz', 'buzz', and 'fizzbuzz' would be encountered. This means that for 
        each value from 0 through n, if the value
        is divisible by 3 and 5, the count for 'fizzbuzz' should be incremented, if it is divisible by just 3
        then 'fizz' is incremented, and if the value is only divisible by 5 then the count for 'buzz' is incremented.
        <br></br>
        Examine the code and identify the error, then implement a correct version in the editor below
        <br></br>
        If you are unfamiliar with javascript objects, see <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects" target="_blank">this documentation</a>
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
        "id": 1.3,
        "code": `
function rainfall(measurements) {
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
        <h1>Rainfall</h1>
        <hr></hr>
        Rainfall is a function that takes an array of integers representing measurements of rainfall amounts across days. The goal
        of the function is to determine the average amount of rainfall, while ignoring negative values. This means
        days where a negative rainfall was measured should be completely ignored in the result. 
        <br></br>
        Examine the code and identify the error. Then provide an input that exposes this error
        <br></br>
        Note that this function takes an array, so your input should be formatted as an array
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
        "placeholder-code": "[1,2,3,4,5]",
        "next-exercises": [2.3],
      },
      {
        "label": "Rainfall Debug",
        "id": 2.3,
        "next-exercises": [3.1],
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
        <h1>Rainfall</h1>
        <hr></hr>
        Rainfall is a function that takes an array of integers representing measurements of rainfall amounts across days. The goal
        of the function is to determine the average amount of rainfall, while ignoring negative values. This means
        days where a negative rainfall was measured should be completely ignored in the result. 
        <br></br>
        In this version, if a measurement of 99999 is encountered, all subsequent measurements should be ignored
        <br></br>
        Examine the code and identify the error. Then implement a correct version in the editor below
        <h4>Defined Behavior:</h4>
        <ul>
          <li>Any non-empty array containing any integer values</li>
        </ul>
        <h4>Undefined Behavior:</h4>
        <ul>
          <li>Any non-array inputs</li>
          <li>An input array of length 0</li>
          <li>Any array containing non-integer values</li>
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
      },
      {
        "label": "Letter Groups",
        "id": 1.4,
        "input-type": 1,
        "param-types": [3],
        "num-inputs": 1,
        "show-editor": false,
        "placeholder-code": '"abcd"',
        "description": `
        <h1>Letter Groups</h1>
        <hr></hr>
        The <code>letterGroups</code> function takes a String and identifies the longest substring of the same character
        <br></br>
        Additional requirements are:
        <ul>
          <li>If there is a tie for longest substring, return the one that comes first <a href='https://en.wikipedia.org/wiki/Lexicographic_order' target="_blank">lexicographically</a></li>
        </ul>
        Examples:
        <ul>
          <li><code>letterGroups('aabbbc')</code> returns <code>'bbb'</code></li>
          <li><code>letterGroups('zyxwvu')</code> returns <code>'z'</code></li>
          <li><code>letterGroups('123555bcaaa')</code> returns <code>'555'</code></li>
        </ul>
        Defined Behavior:
        <ul>
          <li>Any string of length >= 0</li>
        </ul>
        `,
        "code": `
function letterGroups(letters) {
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
    }
    i = j;
  }
  return returnGroup;
}
        `,
      },
      {
        "label": "Letter Groups Debug",
        "id": 2.4,
        "code": `
        function letterGroups(letters) {
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
            }
            i = j;
          }
          return returnGroup;
        }`,
        "description": `
        <h1>Letter Groups</h1>
        <hr></hr>
        The <code>letterGroups</code> function takes a String and identifies the longest substring of the same character
        <br></br>
        Additional requirements are:
        <ul>
          <li>If there is a tie for longest substring, return the one that comes first <a href='https://en.wikipedia.org/wiki/Lexicographic_order' target="_blank">lexicographically</a></li>
        </ul>
        Examples:
        <ul>
          <li><code>letterGroups('aabbbc')</code> returns <code>'bbb'</code></li>
          <li><code>letterGroups('zyxwvu')</code> returns <code>'z'</code></li>
          <li><code>letterGroups('123555bcaaa')</code> returns <code>'555'</code></li>
        </ul>
        Defined Behavior:
        <ul>
          <li>Any string of length >= 0</li>
        </ul>
        `,
        "input-type": "",
        "show-editor": true,
        "placeholder-code": `
function letterGroups(letters) {
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
    }
    i = j;
  }
  return returnGroup;
}`,
      }
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
// {
//   "label": "Introduction",
//   "id": 2.0,
//   "code": "",
//   "description": `
//   <h1>Introduction</h1>
//   <hr></hr>
//   <h3>Overview</h3>
//   In this section you will be debugging the functions from the previous section. The motivation behind this section 
//   is to allow you to practice reasoning about some common bugs so that you can avoid them in your own implementations.
//   <br></br>
//   Each exercise will include:
//   <ul>
//     <li>A description of the function that you will be dubugging</li>
//     <li>Defined behavior that you implementation should take into account</li>
//     <li>The incorrect code</li>
//     <li>An editor where you will implement a correct version of the function</li>
//   </ul>
//   Your job will be to identify the error in the function provided and implement a correct version in the editor provided
//   <br></br>
//   Your implementation should handle all inputs within the scope of the <em>defined behaviors</em>
//   `,
//   "input-type": "",
//   "show-editor": false,
// },



    ]
  },
  {
    "type": 2,
  },
//   {
//     "type": 2,
//     "label": "Debugging",
//     "exercises": [
//       {
//         "label": "Introduction",
//         "id": 2.0,
//         "code": "",
//         "description": `
//         <h1>Introduction</h1>
//         <hr></hr>
//         <h3>Overview</h3>
//         In this section you will be debugging the functions from the previous section. The motivation behind this section 
//         is to allow you to practice reasoning about some common bugs so that you can avoid them in your own implementations.
//         <br></br>
//         Each exercise will include:
//         <ul>
//           <li>A description of the function that you will be dubugging</li>
//           <li>Defined behavior that you implementation should take into account</li>
//           <li>The incorrect code</li>
//           <li>An editor where you will implement a correct version of the function</li>
//         </ul>
//         Your job will be to identify the error in the function provided and implement a correct version in the editor provided
//         <br></br>
//         Your implementation should handle all inputs within the scope of the <em>defined behaviors</em>
//         `,
//         "input-type": "",
//         "show-editor": false,
//       },
//       {
//         "label": "Example: Fizzbuzz",
//         "id": 2.1,
//         "next-exercises": [],
//         "code": `
//         function fizzbuzz(n) {
//           const output = [];
//           for (let i = 0; i <= n; i ++) {
//             if (i % 3 === 0 && i % 5 === 0) {
//               output.push('fizzbuzz');
//             } else if (i % 3 === 0) {
//               output.push('fizz');
//             } else {
//               // hint:
//               // this should be an else if block
//               output.push('buzz');
//             }
//           }
//           return output;
//         }`,
//         "description": `
//         <h1>Example Problem: Fizzbuzz</h1>
//         <hr></hr>
//         Fizzbuzz is a well known coding problem that asks for a function that takes a positive integer n, and loops through
//         each number from 0 through n. For each of these values, if it is divisible by 3 and 5, 'fizzbuzz' should be printed,
//         if it is divisible by only 3, then 'fizz' should be printed, and if it is divisible by only 5, then 'buzz' should be
//         printed. 
//         <br></br>
//         In this variation, instead of printing the strings, they are pushed to the array <code>output</code> which is then returned.
//         <br></br>
//         Examine the code and identify the error, and then implement a correct version in the editor below
//         <h4>Defined Behavior:</h4>
//         <ul>
//           <li>Any positive integer input</li>
//         </ul>
//         <h4>Undefined Behavior:</h4>
//         <ul>
//           <li>Any non-integer or non-positive integer inputs</li>
//         </ul>
//         `,
//         "input-type": "",
//         "show-editor": true,
//         "placeholder-code": `
// function fizzbuzz(n) {
//   const output = [];
//   for (let i = 0; i <= n; i ++) {
//     if (i % 3 === 0 && i % 5 === 0) {
//       output.push('fizzbuzz');
//     } else if (i % 3 === 0) {
//       output.push('fizz');
//     } else {
//       output.push('buzz');
//     }
//   }
//   return output;
// }
//         `
//       },
//       {
//         "label": "Fizzbuzz Counts",
//         "id": 2.2,
//         "next-exercises": [],
//         "code": `
//         function fizzbuzzCounts(n) {
//           const counts = {
//             fizz: 0,
//             buzz: 0,
//             fizzbuzz: 0,
//           };
//           for (let i = 0; i < n; i ++) {
//             if (i % 3 === 0 && i % 5 === 0) {
//               counts.fizzbuzz ++;
//             } else if (i % 3 === 0) {
//               counts.fizz ++;
//             } else if (i % 5 === 0) {
//               counts.buzz ++;
//             }
//           }
//           return counts;
//         }`,
//         "description": `
//         <h1>Fizzbuzz Counts</h1>
//         <hr></hr>
//         This is a variation of the popular fizzbuzz problem. This function also takes a positive integer input and loops
//         through all values from 0 up to and including n. This time, the function should return a <code>counts</code> object
//         that counts how many times the strings 'fizz', 'buzz', and 'fizzbuzz' would be encountered. This means that for 
//         each value from 0 through n, if the value
//         is divisible by 3 and 5, the count for 'fizzbuzz' should be incremented, if it is divisible by just 3
//         then 'fizz' is incremented, and if the value is only divisible by 5 then the count for 'buzz' is incremented.
//         <br></br>
//         Examine the code and identify the error, then implement a correct version in the editor below
//         <br></br>
//         If you are unfamiliar with javascript objects, see <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects" target="_blank">this documentation</a>
//         <h4>Defined Behavior:</h4>
//         <ul>
//           <li>Any positive integer input</li>
//         </ul>
//         <h4>Undefined Behavior:</h4>
//         <ul>
//           <li>Any non-integer or non-positive integer inputs</li>
//         </ul>
//         `,
//         "input-type": "",
//         "show-editor": true,
//         "placeholder-code":`
// function fizzbuzzCounts(n) {
//   const counts = {
//     fizz: 0,
//     buzz: 0,
//     fizzbuzz: 0,
//   };
//   for (let i = 0; i < n; i ++) {
//     if (i % 3 === 0 && i % 5 === 0) {
//       counts.fizzbuzz ++;
//     } else if (i % 3 === 0) {
//       counts.fizz ++;
//     } else if (i % 5 === 0) {
//       counts.buzz ++;
//     }
//   }
//   return counts;
// }`,
//       },
//       {
//         "label": "Rainfall",
//         "id": 2.3,
//         "next-exercises": [3.1],
//         "code": `
//         function rainfall(measurements) {
//           if (measurements.length === 0) {
//             return 0;
//           }
//           let total_rain = 0;
//           let total_days = 0;
//           for (let measurement of measurements) {
//             if (measurement >= 0) {
//               total_rain += measurement;
//               total_days += 1;
//             }
//           }
//           return total_rain / total_days;
//         }`,
//         "description": `
//         <h1>Rainfall</h1>
//         <hr></hr>
//         Rainfall is a function that takes an array of integers representing measurements of rainfall amounts across days. The goal
//         of the function is to determine the average amount of rainfall, while ignoring negative values. This means
//         days where a negative rainfall was measured should be completely ignored in the result. 
//         <br></br>
//         In this version, if a measurement of 99999 is encountered, all subsequent measurements should be ignored
//         <br></br>
//         Examine the code and identify the error. Then implement a correct version in the editor below
//         <h4>Defined Behavior:</h4>
//         <ul>
//           <li>Any non-empty array containing any integer values</li>
//         </ul>
//         <h4>Undefined Behavior:</h4>
//         <ul>
//           <li>Any non-array inputs</li>
//           <li>An input array of length 0</li>
//           <li>Any array containing non-integer values</li>
//         </ul>
//         `,
//         "input-type": "",
//         "show-editor": true,
//         "placeholder-code":`
// function rainfall(measurements) {
//   if (measurements.length === 0) {
//     return 0;
//   }
//   let total_rain = 0;
//   let total_days = 0;
//   for (let measurement of measurements) {
//     if (measurement >= 0) {
//       total_rain += measurement;
//       total_days += 1;
//     }
//   }
//   return total_rain / total_days;
// }`,
//       },
//       {
//         "label": "Letter Groups",
//         "id": 2.4,
//         "code": `
//         function letterGroups(letters) {
//           let returnGroup = '';
//           let i = 0;
//           while (i < letters.length) {
//             const currLetter = letters.charAt(i);
//             let j = i + 1;
//             while (j < letters.length &&
//                    letters.charAt(j) === currLetter) {
//               j += 1;
//             }
//             const newSequence = letters.substring(i, j);
//             if (newSequence.length > returnGroup.length) {
//               returnGroup = newSequence;
//             }
//             i = j;
//           }
//           return returnGroup;
//         }`,
//         "description": `
//         <h1>Letter Groups</h1>
//         <hr></hr>
//         The <code>letterGroups</code> function takes a String and identifies the longest substring of the same character
//         <br></br>
//         Additional requirements are:
//         <ul>
//           <li>If there is a tie for longest substring, return the one that comes first <a href='https://en.wikipedia.org/wiki/Lexicographic_order' target="_blank">lexicographically</a></li>
//         </ul>
//         Examples:
//         <ul>
//           <li><code>letterGroups('aabbbc')</code> returns <code>'bbb'</code></li>
//           <li><code>letterGroups('zyxwvu')</code> returns <code>'z'</code></li>
//           <li><code>letterGroups('123555bcaaa')</code> returns <code>'555'</code></li>
//         </ul>
//         Defined Behavior:
//         <ul>
//           <li>Any string of length >= 0</li>
//         </ul>
//         `,
//         "input-type": "",
//         "show-editor": true,
//         "placeholder-code": `
// function letterGroups(letters) {
//   let returnGroup = '';
//   let i = 0;
//   while (i < letters.length) {
//     const currLetter = letters.charAt(i);
//     let j = i + 1;
//     while (j < letters.length &&
//            letters.charAt(j) === currLetter) {
//       j += 1;
//     }
//     const newSequence = letters.substring(i, j);
//     if (newSequence.length > returnGroup.length) {
//       returnGroup = newSequence;
//     }
//     i = j;
//   }
//   return returnGroup;
// }`,
//       }
//     ],
//   },
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
assert(checkParity(3) === false);

// the two logical branches of the
// function are the if and else clauses
// so at least two test cases are needed
// to reach full branch coverage`,
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
        If you need to review either assertions or branch coverage, see the Writing Tests section in the Learn module
        <br></br>
        You will be given:
        <ul>
          <li>A description of the function you are testing</li>
          <li>Either the code of the function itself, or a stub for the function along
          with a description of defined and undefined behaviors</li>
        </ul>
        Your test cases are responsible for covering anything within the scope of the <em>defined behaviors</em>
        <h4>Example</h4>
        `,
        "input-type": "",
        "show-editor": false,
      },
      {
        "label": "Example: Even/Odd",
        "id": 3.1,
        "next-exercises": [3.2],
        "code": `
        function checkParity(n) {
          if (n % 2 === 0) {
            return true;
          } else {
            return false;
          }
        }`,
        "description": `
        <h1>Example Problem: Check Parity</h1>
        <hr></hr>
        The <code>checkParity</code> function should check if an integer <code>n</code> is even or odd,
        and return true for even
        inputs and false for odd inputs. Write a series of assertion tests that cover all branches of the control flow.
        <br></br>
        Defined Behaviors:
        <ul>
          <li>Any integer input</li>
        </ul>
        Complete the starter code in the editor
        `,
        "input-type": "",
        "show-editor": true,
        "placeholder-code": `
assert(checkParity() === );
`
      },
      {
        "label": "Rainfall",
        "id": 3.2,
        "code": `
// function stub:
// in  -> Array[Number] measurements
// out -> Number
function rainfall(measurements) {}`,
        "description": `
        <h1>Rainfall</h1>
        <hr></hr>
        This version of the rainfall problem should:
        <ul>
          <li>Return the average of the measurements in the input array</li>
          <li>Negative values should be ignored</li>
          <li>When 99999 is encountered, any remaining measurements should be ignored</li>
          <li>If the empty array is inputted, 0 should be returned</li>
        </ul>
        Based on these requirements, write more assertions that fully cover the control flow of the function
        <br></br>
        For this problem you are not given the implementation, so you are responsible for reasoning about what test cases
        are necessary
        `,
        "input-type": "",
        "show-editor": true,
        "placeholder-code": `

assert(rainfall([5,5,5,5,5]) === 5);

`     },
      {
        "label": "Letter Groups",
        "id": 3.3,
        "input-type": "",
        "show-editor": true,
        "placeholder-code": `
assert(letterGroups() === );
`,
        "code": `
// function stub:
// in  -> String letters
// out -> String
function letterGroups(letters) {}`,
        "description": `
        <h1>Letter Groups</h1>
        <hr></hr>
        The <code>letterGroups</code> function takes a String and identifies the longest substring of the same character
        <br></br>
        Additional requirements are:
        <ul>
          <li>If there is a tie for longest substring, return the one that comes first <a href='https://en.wikipedia.org/wiki/Lexicographic_order' target="_blank">lexicographically</a></li>
        </ul>
        Examples:
        <ul>
          <li><code>letterGroups('aabbbc')</code> returns <code>'bbb'</code></li>
          <li><code>letterGroups('zyxwvu')</code> returns <code>'z'</code></li>
          <li><code>letterGroups('123555bcaaa')</code> returns <code>'555'</code></li>
        </ul>
        Defined Behavior:
        <ul>
          <li>Any string of length >= 0</li>
        </ul>
        `,
      },
    ],
  }
];