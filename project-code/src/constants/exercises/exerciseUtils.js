// define all the test functions/utilities in here

function compareStrings(s1, s2) {
  if (s1 === '' || s2 === '') {
    return true;
  } else {
    return compareStrings(s1.substring(1), s2.substring(1));
  }
}


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
}

function toBinary(n) {
  const bin = ''
}






// add all the test functions to this mapping, keyed by type, label
// so that the proper utility code can be grabbed when evaluating a
//    submission
const exerciseMapping = new Map();

exerciseMapping.add([1, "comapreStrings"], compareStrings);







export { exerciseMapping };