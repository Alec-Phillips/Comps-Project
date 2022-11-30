
function initCoverageCheck(coverageCheck, numBranches) {
  coverageCheck.length = 0;
  for (let _ = 0; _ < numBranches; _ ++) {
    coverageCheck.push(false);
  }
}

function reportCoverage(coverageCheck) {
  const uncoveredBranches = [];
  for (let i = 0; i < coverageCheck.length; i ++) {
    const line = coverageCheck[i];
    if (! line) {
      uncoveredBranches.push(i);
    }
  }
  const coverage = (coverageCheck.length - uncoveredBranches.length) / coverageCheck.length
  return {
    coverage: Math.trunc(coverage * 100),
    uncoveredBranches: uncoveredBranches,
  }
}

function reportAssertions(assertionResults) {
  return assertionResults[0]
    .map(el => el.assertion)
    .map((bool, ind) => 
    {
      if (! bool) {
        return ind + 1;
      } else {
        return -1;
      }
    })
    .filter(n => n > 0);
}

function buildEvalResult(coverageCheck, assertionResults) {
  const coverageReport = reportCoverage(coverageCheck);
  const assertionReport = reportAssertions(assertionResults);
  return {
    pass: coverageReport.uncoveredBranches.length || assertionReport.length ? false : true,
    error: false,
    coverageReport: coverageReport,
    assertionReport: assertionReport,
  }
}


const coverageCheck = [];

export function runCode(code) {
  const assertionResults = [[]];
  initCoverageCheck(coverageCheck, 22);
  function assert(condition) {
    assertionResults[0].push({assertion: condition});
  }
  eval(code);
  return buildEvalResult(coverageCheck, assertionResults);
}


const mockDb = {
  courses: [
    {
      'course-name': 'CS1',
      'total-seats': 5,
      'total-enrolled': 0,
      'total-waitlisted': 0,
      'prerequisites': [],
    },
    {
      'course-name': 'CS2',
      'total-seats': 5,
      'total-enrolled': 0,
      'total-waitlisted': 0,
      'prerequisites': ['CS1'],
    },
    {
      'course-name': 'CS3',
      'total-seats': 5,
      'total-enrolled': 0,
      'total-waitlisted': 0,
      'prerequisites': ['CS2'],
    },
  ],
  students: [
    {
      'student-name': 'Alice',
      'enrolled-courses': [],
      'courses-taken': [],
    },
    {
      'student-name': 'Bob',
      'enrolled-courses': [],
      'courses-taken': [],
    },
    {
      'student-name': 'Eve',
      'enrolled-courses': [],
      'courses-taken': [],
    }
  ],
}

class Student {

  constructor(studentName, studentData) {
    if (studentData === null) {
      this.studentName = studentName;
      this.enrolledCourses = [];
      this.coursesTaken = [];
    } else if (studentName === null) {
      this.studentName = studentData['student-name'];
      this.enrolledCourses = studentData['enrolled-courses'];
      this.coursesTaken = studentData['courses-taken'];
    }
  }

  // not sure if this is necessary
  // getName() {
  //   return this.studentName;
  // }

}



class CourseScheduler {

  constructor(){
    coverageCheck[0] = true;
    this.mockDb = JSON.parse(JSON.stringify(mockDb));
    this.activeStudentNames = new Set();
    this.activeStudents = new Set();
  }

  getStudent(studentName) {
    if (this.activeStudentNames.has(studentName)) {
      coverageCheck[1] = true;
      return {
        error: true,
        errorMsg: 'student is already active',
        student: null,
      }
    }
    let studentData;
    if (typeof (studentData = this.mockDb.students.find(student => student['student-name'] === studentName)) !== 'undefined') {
      coverageCheck[2] = true;
      const newStudent = new Student(null, studentData);
      this.activeStudents.add(newStudent);
      this.activeStudentNames.add(studentName);
      return {
        error: false,
        errorMsg: '',
        student: newStudent,
      }
    } else {
      coverageCheck[3] = true;
      return {
        error: true,
        errorMsg: 'student does not exist',
        student: null,
      }
    }
  }

  createStudent(studentName) {
    if (this.activeStudentNames.has(studentName)) {
      coverageCheck[4] = true;
      return {
        error: true,
        errorMsg: 'student is already active',
        student: null,
      }
    }
    let studentData;
    if (typeof (studentData = this.mockDb.students.find(student => student['student-name'] === studentName)) !== 'undefined') {
      coverageCheck[5] = true;
      return {
        error: true,
        errorMsg: 'student already exists',
        student: null,
      }
    } else {
      coverageCheck[6] = true;
      const newStudent = new Student(studentName, null);
      this.activeStudents.add(newStudent);
      this.activeStudentNames.add(studentName);
      return {
        error: false,
        errorMsg: '',
        student: newStudent,
      }
    }
  }

  enrollInCourse(student, courseName) {
    let courseData;
    if (typeof (courseData = this.mockDb.courses.find(course => course['course-name'] === courseName)) === 'undefined') {  
      coverageCheck[7] = true;
      return {
        error: true,
        errorMsg: 'course does not exist',
      }
    } 
    if (courseData['total-enrolled'] === courseData['total-seats']) {
      coverageCheck[8] = true;
      return {
        error: true,
        errorMsg: 'course is full',
      }
    }
    if (student.enrolledCourses.includes(courseName)) {
      coverageCheck[9] = true;
      return {
        error: true,
        errorMsg: 'student is already enrolled in this course',
      }
    }
    if (! this.__checkPrerequisites(student.coursesTaken, courseData['prerequisites'])) {
      coverageCheck[10] = true;
      return {
        error: true,
        errorMsg: 'prerequisites not met',
      }
    }
    coverageCheck[11] = true;
    const targetCourse = this.mockDb.courses.find(course => course['course-name'] === courseName);
    targetCourse['total-enrolled'] ++;
    student.enrolledCourses.push(courseName);
    return {
      error: false,
      errorMsg: '',
    }
  }

  incrementSemester() {
    coverageCheck[12] = true;
    for (const student of this.activeStudents) {
      coverageCheck[13] = true;
      const studentToUpdate = this.mockDb.students.find(currStudent => currStudent['student-name'] === student.studentName);
      studentToUpdate['courses-taken'].push(...student.enrolledCourses);
      student.coursesTaken.push(...student.enrolledCourses);
      student.enrolledCourses.length = 0;
    }
    this.mockDb.courses = JSON.parse(JSON.stringify(mockDb.courses));
  }

  __checkPrerequisites(coursesTaken, prerequisites) {
    coverageCheck[14] = true;
    for (const prerequisite of prerequisites) {
      coverageCheck[15] = true;
      if (typeof coursesTaken.find(courseName => courseName === prerequisite) === 'undefined') {
        coverageCheck[16] = true;
        return false;
      }
      coverageCheck[17] = true;
      let courseData = this.mockDb.courses.find(course => course['course-name'] === prerequisite);
      if (courseData['prerequisites'].length) {
        coverageCheck[18] = true;
        if (! this.__checkPrerequisites(coursesTaken, courseData['prerequisites'])) {
          coverageCheck[19] = true;
          return false;
        }
        coverageCheck[20] = true;
      }
    }
    coverageCheck[21] = true;
    return true;
  }
}
