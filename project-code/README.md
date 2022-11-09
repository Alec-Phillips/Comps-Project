# Code Documentation

## Overview:

This project is a serverless, single-page application written in React.js and javascript. The most interesting technical aspect is the evaluation of user submitted code in coding exercises, which is discussed below. 

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

This section will detail the general React component organization and then go into detail on the mechanisms that evaluate user code submissions for the hands-on exercises.

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

#### Saving User Progress & Unlocking Exercises:
In order to track user progress, the browser localStorage is leveraged. This is an object containing key-value pairs that the browser stores and can be accessed through javascript. Since each exercise has a unique ID, I store a stringified array in the localStorage that contains the ID's of all the exercises that a user has completed. Upon loading the page, I query the localStorage and create a state variable in the App component that represents these completed exercises. Each time a new exercise is completed, the updateCompletedExercises callback is used to update this state variable, which also triggers an update of the data stored in localStorage.

#### Evaluating Code Submissions:
To run the code that a user inputs in response to a coding exercise, the following process occurs upon a user clicking the submit button:
1. The String representing the current code in the text editor is passed to the Evaluator class (this is a standard javascript class, not a React class)
2. The Evaluator uses the javascript Function initializer to create a Function object that wraps the user's code
   - It is important to note that the functions created in this manner do not have access to the global scope
   - Thus, for test writing exercises where the user is writing assert statements, this function does not have access to the code that is actually being tested, because that is out of scope
   - To get around this, I initialize this wrapper function to take a parameter that matches the name of the function being tested, and the function under test gets passed in to the wrapper function to give the user's assert statements access to it
   - Additionally, the wrapper takes an array that is initialized to track code coverage (each index represents a branch of execution, and as the control flow is followed, this array is updated), and an additional array to track the results of the user's assertion statements (I use a custom implementation of assert that pushes the results of the user's assertions to this array)
3. This wrapper around the user's code is then run in accordance with the needs of the specific type of exercise
   - For debugging exercises, it will be run against test cases, and for test-writing exercises it will be run as described above to extract coverage and assertion results
4. These results then get returned to the Exercise component, which can be processed and rendered to the user
