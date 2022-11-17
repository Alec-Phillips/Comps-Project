
function initCoverageCheck(coverageCheck, numBranches) {
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
  function assert(condition) {
    assertionResults[0].push({assertion: condition});
  }
  eval(code);
  console.log(assertionResults);
  console.log(coverageCheck);
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
      return {
        error: true,
        errorMsg: 'student is already active',
        student: null,
      }
    }
    let studentData;
    if (typeof (studentData = this.mockDb.students.find(student => student['student-name'] === studentName)) !== 'undefined') {
      const newStudent = new Student(null, studentData);
      this.activeStudents.add(newStudent);
      this.activeStudentNames.add(studentName);
      return {
        error: false,
        errorMsg: '',
        student: newStudent,
      }
    } else {
      return {
        error: true,
        errorMsg: 'student does not exist',
        student: null,
      }
    }
  }

  createStudent(studentName) {
    if (this.activeStudentNames.has(studentName)) {
      return {
        error: true,
        errorMsg: 'student is already active',
        student: null,
      }
    }
    let studentData;
    if (typeof (studentData = this.mockDb.students.find(student => student['student-name'] === studentName)) !== 'undefined') {
      return {
        error: true,
        errorMsg: 'student already exists',
        student: null,
      }
    } else {
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
    console.log(this.mockDb.courses.find(course => course['course-name'] === courseName));
    console.log('enrolling');
    let courseData;
    if (typeof (courseData = this.mockDb.courses.find(course => course['course-name'] === courseName)) === 'undefined') {
      return {
        error: true,
        errorMsg: 'course does not exist',
      }
    } 
    if (courseData['total-enrolled'] === courseData['total-seats']) {
      return {
        error: true,
        errorMsg: 'course is full',
      }
    }
    if (student.enrolledCourses.includes(courseName)) {
      return {
        error: true,
        errorMsg: 'student is already enrolled in this course',
      }
    }
    if (! this.__checkPrerequisites(student.coursesTaken, courseData['prerequisites'])) {
      return {
        error: true,
        errorMsg: 'prerequisites not met',
      }
    }
    const targetCourse = this.mockDb.courses.find(course => course['course-name'] === courseName);
    targetCourse['total-enrolled'] ++;
    student.enrolledCourses.push(courseName);
    return {
      error: false,
      errorMsg: '',
    }
  }

  incrementSemester() {
    for (const student of this.activeStudents) {
      const studentToUpdate = this.mockDb.students.find(student => student['student-name'] === student.name);
      studentToUpdate['courses-taken'].push(...student.enrolledCourses);
      student.coursesTaken.push(...student.enrolledCourses);
      student.enrolledCourses.length = 0;
    }
    this.mockDb.courses = JSON.parse(JSON.stringify(mockDb.courses));
  }

  __checkPrerequisites(coursesTaken, prerequisites) {
    for (const prerequisite of prerequisites) {
      if (coursesTaken.find(courseName => courseName === prerequisite) === null) {
        return false;
      }
      let courseData = this.mockDb.courses.find(course => course['course-name'] === prerequisite);
      if (courseData['prerequisites'].length) {
        if (! this.__checkPrerequisites(coursesTaken, courseData['prerequisites'])) {
          return false;
        }
      }
    }
    return true;
  }
}
