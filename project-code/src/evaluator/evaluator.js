
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
}

export default Evaluator;
