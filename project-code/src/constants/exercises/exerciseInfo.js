export const exerciseInfo = [
  {
    "type": 1,
    "label": "Edge Cases",
    "exercises": [
      {
        "label": "Sorting",
        "code": `
        function compareStrings(s1, s2) {
          if (s1 === '' && s2 === '') {
            return true;
          } else {
            return compareStrings(s1.substring(1), s2.substring(1));
          }
        }`
      },
      {
        "label": "Sorting 2",
        "code": `
        function compareStrings2(s1, s2) {
          if (s1 === '' && s2 === '') {
            return true;
          } else {
            return compareStrings(s1.substring(1), s2.substring(1));
          }
        }`
      }
    ],
  }
];