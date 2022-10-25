
import { exerciseTestCases } from '../constants/exercises/exerciseUtils';


class Evaluator {
  constructor(exerciseId) {
    this.runTests = exerciseTestCases.get(exerciseId).testCase;
    this.templateArgs = exerciseTestCases.get(exerciseId).templateArgs;
    this.templateSuffix = exerciseTestCases.get(exerciseId).templateSuffix;
  }

  evaluate(code) {
    const fn = Function(this.templateArgs, code + this.templateSuffix);
    const evalResult = this.runTests(fn);
    return evalResult;
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

  // convert to array
  const arr = arg.substring(1, arg.length - 1).split(',');
  const parsedArr = arr.map(item => inputParseFuncs.get(elementType)(item));
  return {
    arg: parsedArr.map(item => item.arg),
    error: parsedArr.filter(item => item.error).length ? true : false,
  }
});



// these will be functions that check the format of a user input
const inputValidators = new Map();

inputValidators.set(1, arg => {
  const re = new RegExp('^-*[0-9]+$');
  return arg.match(re) !== null;
});
