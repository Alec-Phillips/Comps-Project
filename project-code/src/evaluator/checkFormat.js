
// tasks:
// - match the larger pattern of:
//     - // TEST #:
// - match the individual patters of:
//     - // arrange
//     - // act
//     - // assert
// - within each test, check that:
//     - the variable assigned to store the return from the function call is a const
//     - it is used within an assert statement
//     - there are no extra calls to the function within the test case


export function checkFormat(code, testFunc) {
  if (! matchesGeneralFormat(code)) {
    throw new Error('code does not match general format (// TEST1: ... // TEST2:)')
  }
  const tests = code.split('// TEST ');
  for (const test of tests) {
    if (test.trim(''|'\n') === "") {
      continue;
    }
    checkTest(test, testFunc);
  }
}

function matchesGeneralFormat(code) {
  const re = /^(\/\/ *TEST *[0-9]+.*)+/gmi;
  const singleLineCode = code.replaceAll('\n', '');
  if (singleLineCode.match(re) === null) {
    return false;
  }
  return true;
}

function checkTest(test, testFunc) {
  if (! matchesTestFormat(test)) {
    throw new Error('a test case does not match the format: // arrange...// act...// assert');
  }
  let blocks;
  try {
    blocks = getBlocks(test);
  } catch {
    throw new Error('a test case does not match the format: // arrange...// act...// assert');
  }
  const inputVar = getInputVar(blocks[0]);
  const testFuncCall = `${testFunc}(${inputVar})`;
  const outputVar = getOutputVar(blocks[1], testFuncCall);
  checkAssertBlock(blocks[2], outputVar);
  const funcCallInds = getInds(test, testFunc);
  if (funcCallInds.length > 1) {
    throw new Error('a test case cannot have more than one call to the function under test')
  }
}

function matchesTestFormat(test) {
  const re = /^[0-9]+ *:?\/\/ ?arrange.*\/\/ ?act.*\/\/ ?assert/gmi;
  const singleLineTest = test.replaceAll('\n', '');
  if (singleLineTest.match(re) === null) {
    return false;
  }
  return true;
}

function getBlocks(test) {
  let arrangeBlock = test.split(/\/\/ ?arrange/i)[1];
  let splitArrange = arrangeBlock.split(/\/\/ ?act/i);
  arrangeBlock = splitArrange[0].trim('\n');
  let actBlock = splitArrange[1];
  let splitAct = actBlock.split(/\/\/ ?assert/i);
  actBlock = splitAct[0].trim('\n');
  let assertBlock = splitAct[1].trim('\n');
  return [arrangeBlock, actBlock, assertBlock];
}

function getInputVar(arrangeBlock) {
  const arrangeTokens = arrangeBlock.replaceAll('\n', ' ').split(' ');
  const inputVarInd = arrangeTokens.findIndex(token => token.match(/testInput[0-9]*/) !== null);
  if (inputVarInd === -1) {
    throw new Error('a test does not include a correctly formatted testInput');
  }
  if (arrangeTokens[inputVarInd - 1] !== 'const') {
    throw new Error('testInput variable must be defined as const');
  }
  return arrangeTokens[inputVarInd];
}

function getOutputVar(actBlock, testFuncCall) {
  const actTokens = actBlock.replaceAll('\n', ' ').split(' ');
  const testCallInd = actTokens.findIndex(token => token.length >= testFuncCall.length && token.substring(0, testFuncCall.length) === testFuncCall);
  if (testCallInd === -1) {
    throw new Error('no valid call to the function under test found in act block');
  }
  if (actTokens[testCallInd - 3] !== 'const') {
    throw new Error('the variable holding the result of your function call must be declared as const');
  }
  return actTokens[testCallInd - 2];
}

function checkAssertBlock(assertBlock, outputVar) {
  const reString = `^assert\\(${outputVar} (==|===)[ a-zA-Z''""0-9]+\\)`;
  const re = new RegExp(reString, 'gmi');
  if (assertBlock.match(re) === null) {
    throw new Error('a test contains an invalid assertion, or fails to assert the appropriate variable');
  }
}

function getInds(test, testFunc) {
  const inds = [];
  let i = -1;
  const re = 0;
  while (test.indexOf(testFunc, i+1) !== -1) {
    i = test.indexOf(testFunc, i+1);
    inds.push(i);
  }
  return inds;
}
