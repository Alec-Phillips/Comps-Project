import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Exercise from '../Exercise';
import Hint from '../Hint';


// coverage command:
// npm test -- --coverage


const MOCK_EDGE_CASE_EX = {
  "label": "Fizzbuzz Counts",
  "id": 1.2,
  "hint": `Pay close attention to the requirements of the function, and think about when the execution is
    terminating.`,
  "code":
`function fizzbuzzCounts(n) {
const counts = {
fizz: 0,
buzz: 0,
fizzbuzz: 0,
};
return counts;
}`,
  "description": `
    <h1>Fizzbuzz Counts</h1>
    <hr></hr>
    </ul>`,
  "input-type": 1,
  "param-types": [1],
  "num-inputs": 1,
  "show-editor": false,
  "placeholder-code": "// input n here",
};

describe('Edge Case Exercises', () => {
  it('renders an exercise', () => {
    render(
      <Exercise
        exercise={MOCK_EDGE_CASE_EX}
        updateCompletedExercises={() => {}}
        completed={false}
      ></Exercise>
    );
    const input = screen.getByPlaceholderText(/input n here/);
    expect(input).toBeTruthy();
  });
  
  it ('evaluates an exercise that passes', async () => {
    render(
      <Exercise
        exercise={MOCK_EDGE_CASE_EX}
        updateCompletedExercises={() => {}}
        completed={false}
      ></Exercise>
    );
    const input = screen.getByPlaceholderText(/input n here/);
    userEvent.type(input, '5');
    userEvent.click(screen.getByText('Submit'));
    expect(screen.getByText('Pass')).toBeInTheDocument();
  });
  
  it ('evaluates an exercise that fails', async () => {
    render(
      <Exercise
        exercise={MOCK_EDGE_CASE_EX}
        updateCompletedExercises={() => {}}
        completed={false}
      ></Exercise>
    );
    const input = screen.getByPlaceholderText(/input n here/);
    userEvent.type(input, '4');
    userEvent.click(screen.getByText('Submit'));
    expect(screen.getByText('Fail')).toBeInTheDocument();
  });
  
  it ('reports invalid input for Number type input', async () => {
    render(
      <Exercise
        exercise={MOCK_EDGE_CASE_EX}
        updateCompletedExercises={() => {}}
        completed={false}
      ></Exercise>
    );
    const input = screen.getByPlaceholderText(/input n here/);
    userEvent.type(input, 'a');
    userEvent.click(screen.getByText('Submit'));
    expect(screen.getByText(/invalid input/)).toBeInTheDocument();
  });
});


const MOCK_DEBUG_EX = {
  "label": "Fizzbuzz Counts Debug",
  "id": 2.2,
  "next-exercises": [],
  "hint": `Use your answer to the previous problem to consider why the function is incorrect on that input.`,
  "code": ``,
  "description": `
  <h1>Fizzbuzz Counts</h1>
  <hr></hr>
  `,
  "input-type": "",
  "show-editor": true,
  "placeholder-code":`
function fizzbuzzCounts(n) {
const counts = {
fizz: 0,
buzz: 0,
fizzbuzz: 0,
};
for (let i = 0; i < n; i ++) {
if (i % 3 === 0 && i % 5 === 0) {
counts.fizzbuzz ++;
} else if (i % 3 === 0) {
counts.fizz ++;
} else if (i % 5 === 0) {
counts.buzz ++;
}
}
return counts;
}`,
};

describe('Debug Exercises', () => {
  it('submits failed input', () => {
    render(
      <Exercise
        exercise={MOCK_DEBUG_EX}
        updateCompletedExercises={() => {}}
        completed={false}
      ></Exercise>
    );
    userEvent.click(screen.getByText('Submit'));
    expect(screen.getByText(/Failed on input:/)).toBeInTheDocument();
  });

  it('opens hint', () => {
    render(
      <Exercise
        exercise={MOCK_DEBUG_EX}
        updateCompletedExercises={() => {}}
        completed={false}
      ></Exercise>
    );
    userEvent.click(screen.getByText('Show Hint'));
    expect(screen.getByText(/Use your answer to the previous problem/)).toBeInTheDocument();
  });
});
