const parse = require('html-react-parser');

const html = `<div>
  <pre><code class="javascript"> def test_array_reverse_duplicate_values(): 
  # arrange: 
  vals = [4, 3, 2, 2, 1] 
  # act: 
  sort(vals) 
  # assert: 
  for i, val in enumerate(vals[1:]): 
  assert(val {'>'}= vals[i-1] </code></pre> 
</div>`;

export const contentDescriptions = [
  {
    "label": "Introduction",
    "description": `Testing is an important part of developing software, and having a good understanding of some of the
    basics can go a long way in making you a well rounded engineer. Often, testing can seem like a burden or become an
    afterthought, because it can seem less enjoyable than implementing new features. However, it is important to verify
    the correctness of your code, and having comprehensive testing will make your projects much easier to maintain in
    the future. By reading through the material here and doing the practice exercises, you should have a better
    understanding of the basics of software testing.`
  },
  {
    "label": "Unit Testing",
    "description": `Unit tests exercise small pieces of code, usually individual functions or modules. These are usually
    the firststep in testing code, as it is important to ensure that each function is working correctly so that you can
    be confident when other parts of the code are interacting with it. When writing unit tests it is important to
    consider a range of possible inputs, especially edge cases, and also potential errors that the function should raise.
    Since there are any inputs that the function may get that should halt execution and raise an error, it is important
    to test for that in your unit tests. Unit tests exercise small pieces of code, usually individual functions or
    modules. These are usually the first step in testing code, as it is important to ensure that each function is
    working correctly so that you can be confident when other parts of the code are interacting with it. When writing
    unit tests it is important to consider a range of possible inputs, especially edge cases, and also potential errors
    that the function should raise. Since there are any inputs that the function may get that should halt execution and
    raise an error, it is important to test for that in your unit tests.`
  },
  {
    "label": "Integration Tetsting",
    "description": `Integration tests are one level more zoomed out than unit tests. They involve testing how multiple
    modules of the code are interacting with one another. For example, your system may be an application that gets
    weather information for a user-provided location. You may have one component that handles retrieving weather data,
    and another that parses and formats the user input. An integration test would check that these two components are
    interacting correctly.`
  },
  {
    "label": "System Testing",
    "description": `End-to-end testing, or system testing, has to do with evaluating the code in its entirety. This
    would involve providing inputs through the interface provided that an end user would be interacting with. The
    motivation behind end-to-end tests should be to ensure that the system meets all technical specifications.`
  },
  {
    "label": "Acceptance Testing",
    "description": `Acceptance testing is the process of determining if a system meets the expectations and approval of
    the end-user. While end-to-end tests are used to verify that the system meets technical specifications, acceptance
    tests verify that the product meets user requirements and expectations. Acceptance tests often take the form of user
    testing. For example, an app may release a beta version to check for user approval.`
  },
  {
    "label": "Functional Testing",
    "description": `Functional testing, or black box testing, involves writing tests that are blind to the internal
    implementation of the code. They do not care about how the code performs the tasks it is doing, only that it
    provides the correct output. For a function, this would look like simply providing some input, and checking that the
    output is as expected.`
  },
  {
    "label": "Structural Testing",
    "description": "Structural testing, also called white box testing, is a category of tests that check internal features of the system implementation. They may check the processes and structures being used internally in the system. "
  },
  {
    "label": "Test-Driven Development",
    "description": "Test-driven development, or TDD, is a style of software development that prioritizes testing. It aligns with the agile style of development that focuses on iterative improvements. TDD is commonly practiced in industry, and can be applied to any project that you do as well. The process of TDD is: <ol> <li>write test cases (that fail initially, because the code they are testing doesn’t yet exist)</li> <li>write the code that satisfies the test cases</li> <li>refactor the code</li> </ol> So, any time a new feature needs to be implemented, the process would consist of writing test cases first, and then actually implementing the feature. This puts the emphasis on writing tests, and ensures that tests are not an afterthought. "
  },
  {
    "label": "Writing Tests",
    "description": `<p>Assertions and Coverage General Testing Format: Just as normal code should follow certain guidelines
    in order to be understandable and easily maintained, tests should follow this same principle. When you have a large 
    suite of tests, it is important to be able to determine what is wrong with the system when tests fail. In general, 
    test cases should be organized based on type and what area of the system they are testing. Each test case should be 
    represented by a function, and, most importantly, each test case should test only one thing. Even if two tests are 
    related, they should be represented in different functions. This is important because when a test fails, it is clear 
    what went wrong, making it easier to address the underlying issue. Each test case function should also be clearly named 
    in a way that indicates what it is doing. Format of a test case: Each test case should follow an arrange, act, assert 
    format. The arrange step encompasses any set up that is needed to get the system into the state that you want to test. 
    The act step involves providing the input or performing the interaction that you want to exercise the system with. 
    Finally the assert step is where you check if the system correctly processed the input. This usually involves an 
    assertion statement to check that the output is as expected. Example: Imagine we are writing a test case for a method 
    that sorts the values in an array, specifically testing the edge case of whether it handles duplicate values correctly. 
    Following the above steps, we would write something like:` 
    + html +
   `Assertions: An assertion test is a boolean expression that should evaluate to true if the code is functioning as 
    expected. For example, if we have a function that should add two numbers, we may use an assertion to test that it is 
    correct that looks like: 
    assert(add_two_numbers(1, 2) == 3). 
    The assertion statement will raise an error if the boolean expression evaluates to false, otherwise code execution 
    will continue. An assertion will be the last step of every test case that you write.  Coverage: Test coverage refers 
    to the percentage of lines of code that are interacted with by your test suite. It can also be broken down by the 
    percentage of functions that are getting called by your tests, as well as the percentage of logical branches that are 
    being interacted with. This provides a good baseline for determining how comprehensive your test suite is. HOWEVER, 
    your tests should not be motivated solely by increasing test coverage, and a high test coverage does not indicate that 
    your tests are complete and of high quality. Test coverage is a useful metric that can help guide your testing, but 
    the motivation should be to exercise edge cases and consider how the system will be interacted with by the user or the 
    other components that interface with the system.<p>`
  }
];


