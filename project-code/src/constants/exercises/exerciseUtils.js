// define all the test functions/utilities in here

function compareStrings(s1, s2) {
  if (s1 === '' && s2 === '') {
    return true;
  } else {
    return compareStrings(s1.substring(1), s2.substring(1));
  }
}






// add all the test functions to this mapping, keyed by type, label
// so that the proper utility code can be grabbed when evaluating a
//    submission
const exerciseMapping = new Map();

exerciseMapping.add([1, "comapreStrings"], compareStrings);







export { exerciseMapping };