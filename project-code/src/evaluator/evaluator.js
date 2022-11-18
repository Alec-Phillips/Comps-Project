
import { exerciseTestCases } from '../constants/exercises/exerciseUtils';
import { runCode } from '../constants/exercises/system-testing/courseScheduler';


class Evaluator {
  constructor(exerciseId) {
    if (exerciseId < 4) {
      this.runTests = exerciseTestCases.get(exerciseId).testCase;
      this.templateArgs = exerciseTestCases.get(exerciseId).templateArgs;
      this.templateSuffix = exerciseTestCases.get(exerciseId).templateSuffix;
    } else {
      // TODO
    }
    this.exerciseId = exerciseId;
  }

  evaluate(code) {
    code = escapeLoops(code);
    if (this.exerciseId >= 4) {
      return this.evaluateSystemTest(code);
    } else {
      const fn = Function(this.templateArgs, code + this.templateSuffix);
      const evalResult = this.runTests(fn);
      return evalResult;
    }
    
  }

  evaluateSystemTest(code) {
    return runCode(code);
  }

  // evaluate the non-code submissions for edge case exercises
  evaluateEdgeCase(inputInfo) {
    const args = this.parseInputArgs(inputInfo);
    return this.runTests(args[0].arg);
  }

  // convert the string input into correct type
  parseInputArgs(inputInfo) {
    return inputInfo.inputArgs.map(
      (arg, i) => {
        const paramType = inputInfo.paramTypes[i];
        const parsed = inputParseFuncs.get(Math.floor(paramType))(arg, Number((paramType - Math.floor(paramType)).toFixed(1)) * 10);
        if (parsed.error) {
          throw new Error(`invalid input: ${arg}`)
        }
        return parsed;
      }
    )
  }
}

export default Evaluator;


// handle infinite loops in user code:
function escapeLoops(code) {
  code = 'let infiniteLoopCounter = 0;\n' + code;
  const ESCAPE_PREFIX = 'infiniteLoopCounter = 0;\n';
  const ESCAPE_BODY = '\ninfiniteLoopCounter ++;\nif (infiniteLoopCounter > 10000) {\nthrow new Error("timeout - infinite loop detected");\n}\n';
  const re = /(for *\(.*;.*;.*\) *{|while *\(.*\) *{)/gm;
  let codePtr = 0;
  const codeSegments = [];
  let currMatch;
  while ((currMatch = re.exec(code)) !== null) {
    let matchStr = currMatch[0];
    codeSegments.push(code.substring(codePtr, currMatch.index)
    + ESCAPE_PREFIX
    + code.substring(currMatch.index, currMatch.index + matchStr.length)
    + ESCAPE_BODY);
    codePtr = currMatch.index + matchStr.length;
  }
  return codeSegments.join('') + code.substring(codePtr);
}


const inputParseFuncs = new Map();

inputParseFuncs.set(1, (arg) => {
  if (inputValidators.get(1)(arg)) {
    return {
      arg: Number(arg),
      error: false,
    };
  };
  return {
    arg: 0,
    error: true,
  }
});
inputParseFuncs.set(2, (arg, elementType) => {
  // validate arg first
  if (inputValidators.get(2)(arg)) {
    // convert to array
    const arr = arg.substring(1, arg.length - 1).split(',');
    const parsedArr = arr.map(item => inputParseFuncs.get(elementType)(item));
    return {
      arg: parsedArr.map(item => item.arg),
      error: parsedArr.filter(item => item.error).length ? true : false,
    }
  }
  return {
    arg: 0,
    error: true,
  }
});
inputParseFuncs.set(3, (arg) => {
  if (inputValidators.get(3)(arg)) {
    return {
      arg: arg.substring(1, arg.length - 1),
      error: false,
    };
  };
  return {
    arg: 0,
    error: true,
  }
})



// these will be functions that check the format of a user input
const inputValidators = new Map();

inputValidators.set(1, arg => {
  const re = new RegExp('^ ?-*[0-9]+$');
  return arg.match(re) !== null;
});
inputValidators.set(2, arg => {
  const re = /^\[.*]$/gm;
  return arg.match(re) !== null;
});
inputValidators.set(3, arg => {
  const re = /(^'.*'$|^".*"$)/gm;
  return arg.match(re) !== null;
});
