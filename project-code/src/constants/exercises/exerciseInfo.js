export const exerciseInfo = [
  {
    "type": 1,
    "label": "Debugging",
    "exercises": [
      {
        "label": "Introduction",
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
        "input-type": "",
        "show-editor": true,
        "placeholder-code": `
function checkParity(n) {
  if (n % 2 === 0) {
    return true;
  } else {
    return false;
  }
}
        `
      },
    ],
  }
];