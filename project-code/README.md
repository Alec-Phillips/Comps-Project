# Code Documentation

## Overview:

This project is a serverless, single-page application written in React.js and javascript

___
## 1. Replication Instructions

Follow these instructions if you wish to view and run the project locally on your machine.

#### Prerequisites:
- Install node.js and npm [here](https://nodejs.org/en/download/)
   - Note: npm (the package manager) is automatically included with the node.js download
   - Check that both are installed with:
      ```
      node -v
      npm -v
      ```
   - I am using node v16.13.1 and npm version 8.1.2

#### Setup and Run:
- Clone this repository:
  ```
  git clone https://github.com/Alec-Phillips/Comps-Project.git
  ```

- Navigate into the ./project-code directory
  ```
  cd project-code
  ```
- Install dependencies through npm (this looks at the dependencies in the package.lock file and installs them as well as installing node_modules, which are the files needed for React.js to run correctly)
  ```
  npm install
  ```
- Run the project on your localhost
  ```
  npm start
  ```

You should now be able to access the site on your localhost at port 3000!

___
## 2. Code Architecture Overview

This section will detail the general React component organization and then go into detail on the mechanisms that evaluate user code submissions for the hands-on exercises, as well as other technical details.

### Working with the UI

This first section will discuss the main components of the user interface.

#### Component Organization:
- App Component
  - This is the main component that houses the entire web application. It holds all the logic for rendering the areas of the page. Aspects like the currently active area (Learn vs Practice), as well as the specific exercise or content section are recognized within the state variables of this component. This follows the React design principle of "pulling state up" in order to avoid bugs related to updating the overall state of the application.
- Exercise Component
  - This component represents the template followed for all the practice problems.
  - It takes in three props:
  
    | Prop | Data Type | Purpose |
    | ---- | --------- | ------- |
    | exercise | Object | hold all information relevant to the current exercise (direction, starter code, exercise id) |
    | updateCompletedExercises | Function | a callback to update the variable that tracks user progress if the current exercise is completed |
    | completed | Boolean | indicates whether the exercise has been completed - this is used for styling purposes to indicate the user has completed the problem |
  - This component also uses two external dependencies:
    - [React Ace Editor](https://www.npmjs.com/package/react-ace) is the code editor library
    - [React Syntax Highlighter](https://www.npmjs.com/package/react-syntax-highlighter) for rendering code snippets and examples

### Storing Data Without a Database

This section discusses how I represented and stored data without a traditional database, which was necessary because of the serverless nature of the application. 

#### Storing User Progress:
In order to track user progress, the browser localStorage is leveraged. This is an object containing key-value pairs that the browser stores and can be accessed through javascript. Since each exercise has a unique ID, I store a stringified array in the localStorage that contains the ID's of all the exercises that a user has completed. Upon loading the page, I query the localStorage and create a state variable in the App component that represents these completed exercises. Each time a new exercise is completed, the updateCompletedExercises callback is used to update this state variable, which also triggers an update of the data stored in localStorage.

This logic is then extended to represent the idea of unlocking exercises - there is a graph of dependencies between exercises representing which exercises must be completed before subsequent ones. Each time a user completes an exercise, or when the page is initially loaded, all completed exercises are unlocked, as well as the exercises directly adjacent to any of the completed exercises in this graph structure. Although it may seem unnecessary to represent this with a graph, I thought it would be helpful incase there was the need to ever have one unlock multiple other ones, or if a single exercise depends on completion of multiple other exercises. Although this does not exist currently, it would be easy to extend the functionality to support it. 

#### Representing Exercises and Learning Material Content

If this were a traditional application with a database, the exercise and testing type descriptions would likely also be stored in a database. Instead, I store this content in lists of javascript objects, where each object represents a single exercise or learn content. These objects store all the content that gets rendered as well as any metadata necessary for the application to render the material properly. The data for exercises can be found in ./src/constants/exercises/exerciseInfo.js and data for learn content is in ./src/constants/learning-materials/learningMaterials.js. If any of the content of the application needs to be altered, the changes are made to either of these files. 

Learn sections are represented by objects with the following structure:

| Attribute | Data Type | Purpose |
| --------- | --------- | ------- |
| label     | String | the name of the section |
| description | String | the content of the section that gets rendered when a user opens the section |

\* the description attirbute is a normal string, but it contains HTML syntax, which gets run through this [html parser](https://www.npmjs.com/package/html-react-parser) so that it is formatted correctly when rendered

Exercise objects have the following structure:

| Attribute | Data Type | Purpose |
| --------- | --------- | ------- |
| label | String | The name of the exercise |
| id | Float | a unique identifier for the exercise|
| code | String | the example code that accompanies the exercise as snippets |
| placeholder-code | String | the code that the editor/input area will start out with |
| description | String | the directions for the exercise |
| hint | String | the hint for the exercise |
| input-type | Integer | indicates if a problem should have an input box (for edge case exercises) |
| param-types | Array[Float] | identifies the expected data type of input (only relevant for edge case id exercises) |
| show-editor | Boolean | indicates of the text editor is rendered for the exercise |

These objects then get passed around the components, for instance the object representing the current exercise is passed into the Exercise component as a prop, and the above attributes are used to dictate the render of that particular exercise.

### Handling Exercise Submissions

This section will go into detail on the most technical aspect of the project, which is the verification/evaluation of a user's exercise submissions. There are four main types of exercises, which are each evaluated differently. Any utilities described below that are involved with the evaluation of exercise submissions can be found in ./src/constants/exercises/exerciseUtils.js, unless otherwise specified.

#### Exercise Type 1: Edge Case Identification

These are the most basic exercises, which are intended to be a warm up for the user and are intended to get users to begin thinking about code in terms of correctness and reasoning about edge cases. In these exercises, a user is given a function and their goal is to determine an input that exposes a bug in the function. For these problems the user simply provides a single input that matches the type that the function takes in.

Input Verification:

For these problems, it needs to be checked that the input provided matches the type that the function takes in. There are functions included that expect integer, string, and array inputs. To verify the type of the input, i use regular expressions to match the integer and string formats. For arrays, there is a regular expression that matches the overall array format, and then for the individual array elements, the regular expression verifier for either integer or string is used, depending on the expected type of the array elements. 

Input Evaluation:

These problems are trivial to evaluate - there is a working version of the function, as well as the version that the user is given, and their input is run through both of these implementations. If the outputs differ, that means that the user's input successfully identified the bug in the implementation that they were given. 

#### Exercise Type 2: Debugging

These exercises are paired with the edge case exercises. After identifying an input that causes the function to break in the edge case exercise, the user is prompted to fix the broken implementation that they were given. This means they are actually writing code in the editor and creating a working version of the code.

Input Verification:

These exercises do not need particular verification, because any errors in their code (syntax or logic) will be exposed by the evaluation process. The only check that is made is that there are no infinite loops in the code. This is done naively, by injecting loop counters into their code if there are any loops. Loop syntax is identified with regular expressions, and for each loop, a variable is initialized outside of the loop that is incremented with each loop iteration. If at any point this variable reaches 10,000, the code terminates and an error is thrown. This works off of the assumption that none of the problems require a user to write a loop with this many iterations.

Input Evaluation:

In essence these problems are easy to evaluate, because it should just involve taking the user's function and running it against a series of test cases. The difficulty comes from taking the user's code, which is a String, and making it runnable. This is done using the javascript Function initializer, which takes a string and creates a Function object. The issue with these is that the contents of each of these generated Function objects do not have access to the global scope. Additionally, each function wraps the user's code, so it is creating a function whose body is the entirety of the user's function. To get around this, each of these functions is defined to have an argument matching the name of the input that the inner function expects, and then a return statement is appended to the end of the function body that calls the inner function with the given input. This looks like:

```
outerFunction(n) {
   userDefinedFunction(n) {
      ...
      return something;
   }
   return userDefinedFunction(n);
}
```

Now, the outer function can be interacted with just as the inner function would be, and can then be passed test case inputs and evaluated.

#### Exercise Type 3: Unit Tests

These exercises involve the user writing unit tests for a provided function description.

Input Verification:

These problems have the most involved input verification. This is because it is critical that the user is not only calling the function under test, but also asserting that the result is as expected. The evaluation step checks that their calls to the function under test reaches full code coverage, but it is more difficult to verify that the user actually has assertions for each call that they make to the function under test. To enforce this, the user's input is required to follow a specific format in which, for each test case, they write an arrange block, an act block, and an assert block. Each of these blocks is denoted by a comment (// arrange, // act, // assert). The overall format is verified with regular expression, and then each block is parsed and verified as well. It is checked that the variable used to store the result of the function call is never changed (assigned to const), and that it is actually used in an assertion test in the assert block. This verification logic can be found in ./src/evaluator/checkFormat.js. For example, the user inptu should look like:

```
// TEST <#>:

// arrange
const testInput = <something>;

// act
const res = functionUnderTest(testInput);

// assert
assert(res === <expected output>);
```

Although this is a fairly strict input format, it forces the user to follow the standard style of writing test cases, and allows them to still write test cases by hand in a realistic way. 

Input Evaluation:

The evaluation of these problems follows a similar pattern to the evaluation of the debugging problems. The javascript Function initializer is again used to wrap the user's test cases. Again the problem of the function's scope arises, this time in that the function needs to be given access to the function under test. Additionally, the code coverage that the user achieves needs to be stored, as well as an indication of whether their assertion statements actually evaluate to true.

To evaluate branch coverage, an array of flags is used. Each flag corresponds to a particular branch of the function's execution, and when the branch is executed, the flag is set to true. Upon termination of the user's tests, the percentage of these flags that are set to true represents the branch coverage. This looks like:

```
coverageReport = [false, false, false];
functionUnderTest() {
   if (condition1) {
      coverageReport[0] = true;
   } else if (condition2) {
      coverageReport[1] = true;
   } else {
      coverageReport[2] = true;
   }
}
```
To evaluate whether the user's assertions pass, a custom implementation of ```assert``` is used. An assertionResults array is initialized that stores each assertion result. This looks like:

```
assertionResults = [[]];
assert(condition) {
  assertionResults[0].push({assertion: condition});
}
```
Thus, each time assert is called, instead of immediately raising an error, the result is stored so that the total number of passing assertions can be processed after the user code finishes running. The reason for the nested array and the pushing of objects was for ease of extending the code in the future, so that more detailed information about the passing/failing assertions could be stored and reported to the user. Currently the user is just given a report of how many of their assertions failed, but I think it would be beneficial for them to eventaully be able to see which assertions failed as well. 

Now the context is present to look at how the user's test cases are actually evaluated. All the utilities needed to evaluate the code are stored in an object, which then gets access to the Function object generated from the user code. Pseudocode for this looks like:

```
// the function dynamically generated from the user's test cases
outerFunction(functionUnderTest, coverageCheck, assertionResults) {
   userGeneratedTestCases ...
   // the assert function is appended as a string before the user code is passed to the Function constructor
   customAssertionFunction 
}


// the test utility
{
 testCase: (outerFunction) => {
   define coverageCheck, assertionResult arrays
   const functionUnderTest = (n) => {
     // function body
   }
   // outerFunction is the wrapper around the user's code
   // this call gives it access to all the test utilities
   outerFunction(functionUnderTest, coverageCheck, assertionResults);
   // since the coverage and assertion arrays were declared in this scope, they can be returned
   return coverageCheck, assertionResults;
 },
 // notice that the templateArgs attribute is used to seed the params for outerFunction above
 templateArgs: 'checkParity, coverageCheck, assertionResults',
 templateSuffix: assert,
}


// the testCase attribute from the utility is called to get the evaluation results
return testCase(outerFunction);
```
This process is one of the most complex parts of the implementation, because it heavily relies on passing function references around in order to work around the scoping constraints of javascripts dynamically generated function objects.

#### Exercise Type 4: System Tests

These tests involve a user testing an entire series of methods, meant to simulate the experience of testing an entire API or system. At this point the application only includes one exercise of this type, because they are time consuming to create and difficult to evaluate. The problem is also the most difficult and is probably too challenging for an introductory student, or anyone who is not somewhat well versed in more general javascript. Additionally, this area of the project is one that has the most room for improvement in both the verification and evaluation. 

Input Verification:

At this point, there is no input verification for this type of exercise. Ideally this would follow some form of constraints as the unit test exercises, but because the user is writing test cases against an entire API, the function they are testing in each case will be different, which makes it more difficult to check that they are making assertions on the correct function. I think that to extend this I would probably break the problem apart and have them write tests for each individual function so that these constraints can be applied, but that might defeat the purpose of having the user test the system as a whole. 

Input Evaluation:

The evaluation of this exercise category also uses the same coverage and assertion checking method, but does not follow the same format as the other exercises in terms of using the javascript Function constructor. Instead, it takes the entire block of user code and uses the ```eval``` method to run it. This is generally ill-advised, because it simply runs the user's code as-is, but in this case it is only running the code on the client, so none of the typical concerns of malicious user-generated code running on a server are relevant. 
