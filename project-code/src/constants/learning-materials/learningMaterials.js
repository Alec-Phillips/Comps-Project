
export const contentDescriptions = [
  {
    "label": "Introduction",
    "description": `
    <h1>Introduction</h1>
    <hr></hr>
    <h3>Why should you learn about software testing?</h3>
    <ul>
      <li>Ensures that code it acting as expected</li>
      <li>Makes issues introduced by new features easier to diagnose</li>
      <li>Code becomes more maintainable and easier to extend</li>
      <li>You become more employable - professional engineers are expected to test their code, and there are entire positions that are devoted to testing</li>
    </ul>
    <hr></hr>
    <h3>Challenges of software testing</h3>
    <ul>
      <li>Must deeply understand the goals of the features/code being tested</li>
      <li>It can be difficult to identify all edge cases</li>
      <li>There are many possible inputs to consider, especially when a non-technical user is interacting with the system</li>
    </ul>
    <hr></hr>
    <h3>Content Overview</h3>
    <p>Testing can be broken down into categories based on scope and style</p>
    <p>This material will work through these different types, providing examples of each</p>`
  },
  {
    "label": "Unit Testing",
    "description": `
    <h1>Unit Testing</h1>
    <hr></hr>
    <h3>Scope</h3>
    <ul>
      <li>Unit tests exercise small pieces of code, usually individual functions or modules</li>
      <li>These are usually the first step in testing code, as it is important to ensure that each function is working correctly so that you can
      be confident when other parts of the code are interacting with it</li>
    </ul>
    <hr></hr>
    <h3>Writing Unit Tests</h3>
    <ul>
      <li>Consider a range of possible inputs</li>
      <li>Think about edge cases - this is difficult and takes practice</li>
      <li>Consider whether the function raises errors - test for those</li>
    </ul>
    <hr></hr>
    <h3>Example</h3>
    Say you have the function:
    -codeSegmentStart-
      function getMax(array) {
        let max = array[0];
        for (let i = 1; i < array.length; i ++) {
          if (array[i] > max) {
            max = array[i];
          }
        }
        return max;
      }
    -codeSegmentEnd-
    Unit tests usually involve an <code>assert</code> statement. This is a statement that expects a certain condition to
    be true. This is a way of saying that we expect our function to output a specific result.
    <br></br>
    Unit tests for this may look like:
    -codeSegmentStart-
      assert(getMax([1,2,3,4,5]) === 5);
      assert(getMax([5,4,3,2,1]) === 5);
      assert(getMax([]) === null);
    -codeSegmentEnd-
    These unit tests would expose a bug in the code: the empty array input is not handled. This makes it clear where the
    error is located and the code can be easily adjusted. 

    Note the use of <code>assert</code> statements. These statements check the condition contained within, and if the
    condition evaluates to false, an error will be raised. This means that when the tests are run, the code will error 
    out if a test fails. 
    `
  },
  {
    "label": "Integration Tetsting",
    "description": `
    <h1>Integration Testing</h1>
    <hr></hr>
    <h3>Scope</h3>
    <ul>
      <li>One level more zoomed out than unit tests</li>
      <li>Involves testing how multiple modules of the code are interacting with one another</li>
    </ul>
    <hr></hr>
    <h3>Writing Integration Tests</h3>
    <ul>
      <li>Consider all possible interactions between the pieces of code being integrated</li>
      <li>Think about what inputs may cause unexpected behavior</li>
    </ul>
    <hr></hr>
    <h3>Example</h3>
    Say your application gets weather information for a user-provided location for a past date
    <br></br>
    Possible Modules of Code:
    <ul>
      <li>Mechanism that takes and formats user input (verifies that the input is valid, formats it correctly for the next component)</li>
      <li>Mechanism for retrieving weather information based on the user input</li>
    </ul>
    Say the interface for the input formatter looks like:
    -codeSegmentStart-
      class InputHandler {

        format(input) {
          // takes an input that can be a city name or zip code, along with a date
          // validates input
          // returns an object with the city name, zip code, and date
          //    will retrieve the one that is not provided from a database
        }
      }
      -codeSegmentEnd-
    And the interface for the weather retrieval system looks like:
    -codeSegmentStart-
      class GetWeather {

        retrieve(locationData) {
          // takes an object with a city name, zip code. and date
          // queries database to get weather for input location from target date
          // returns the weather data
        }
      }
      -codeSegmentEnd-
    A possible test case that exercises the integration of these components:
    -codeSegmentStart-
      function TestInputHanderGetWeatherIntegration1() {
        // create instance of input handler
        const inputHandler = new InputHandler();

        // create instance of the weather retriever
        const weatherRetriever = new GetWeather();


        // use the input handler to get the formatted user input
        const formattedInput = inputHandler.format('90041', '10/10/2010');

        // call the weather retriever with the formatted input
        const weatherResult = weatherRetriever.retrieve(formattedInput);


        // check if the result is accurate
        // (this assumes we know what the system should output for this input)
        const expectedResult = '79 degrees';
        assert(weatherResult === expectedResult);
      }
      -codeSegmentEnd-
    It is assumed that each of these components would be thoroughly unit tested first
    <br></br>
    Notice that the test follows an <em>arrange</em>, <em>act</em>, <em>assert</em> pattern
    <ol>
      <li>arrange: first we set up the necessary components that would be used in the test</li>
      <li>act: we performed the operations that we want to test</li>
      <li>assert: we checked if the result of the act stage yielded the expected result</li>
    </ol>
    This is a generally accepted format for writing test cases, and it is best practice to follow this pattern
    `
  },
  {
    "label": "System Testing",
    "description": `
    <h1>System/End-to-end Testing</h1>
    <hr></hr>
    <h3>Scope</h3>
    <ul>
      <li>These are the most zoomed out, in terms of the level that they are exercising the code</li>
      <li>Interacting with the most exterior level of the system/application</li>
      <li>The goal of these tests should be to determine if the system meets all technical specifications (the conditions that the application is supposed to meet)</li>
    </ul>
    <hr></hr>
    <h3>Writing System tests</h3>
    <ul>
      <li>Think about the way the end user (whether this is the client or the consuming piece of software) is going to interact with the system</li>
      <li>If there were technical specifications definted for the system, base the tests around those requirements</li>
    </ul>
    <hr></hr>
    <h3>Example</h3>
    Say our application is a basic image editing software
    <br></br>
    The technical specification may require:
    <ul>
      <li>Ability to crop and filter an image</li>
      <li>Add overlays of shapes or other images</li>
      <li>Compress and export the file</li>
    </ul>
    With this in mind, the exposed API for this system may look something like:
    -codeSegmentStart-
        class ImageEditor {

          constructor(filePath) {
            // assume this retrieves and instantaites a representation of the image at this location
            this.image = new ImageInstance(filePath);
          }

          getImageDimensions() {}

          cropImage(startX, startY, newHeight, newWidth) {}

          filterImage(filterType) {}

          addOverlayShape(targetCoordinate, overlayType, overlayDimensions) {}

          compressImage(compressionFormat) {}
        }
        -codeSegmentEnd-
    Assume that there is some interface through which the user is interacting with the file, and as they make edits,
    these methods are called according to the actions of the user
    <br></br>
    Note that these methods are the most external view of the system, and there would likely be other internal components
    that get called and are relied upon within each of these external functions. However, at the stage of system testing,
    we only care about exercising this outer layer API, as all the internal components should already be thoroughly tested
    by this point.
    <br></br>
    One of our system tests may look something like:
    -codeSegmentStart-
        function testCropImage() {
          // arrange:
          const imagePath = './test-images/test-image-1.jpg';
          const editorInstance = new ImageEditor(imagePath);

          // act:
          const oldDimensions = editorInstance.getDimensions();
          editorInstance.cropImage(oldDimensions.xStart, oldDimensions.yStart + 5, oldDimensions.height * .75, oldDimensions.width * .5);

          // assert:
          const newDimensions = editorInstance.getDimensions();
          const expectedDimensions = {
            xStart: oldDimensions.xStart,
            yStart: oldDimensions.yStart + 5,
            height: oldDimensions.height * .75,
            width: oldDimensions.width * .5,
          }
          assert(newDimensions === expectedDimensions); // cannot actually compare objects like this
                                                        // would need to loop through attributes
        }
        -codeSegmentEnd-
    This process would repeat until we've thoroughly exercised each of the exposed methods
    <br></br>
    Also, a single test per method is likely not enough - it is important to think of edge cases here too
    `
  },
  {
    "label": "Acceptance Testing",
    "description": `
    <h1>Acceptance Testing</h1>
    <hr></hr>
    <h3>Details</h3>
    <ul>
      <li>Determining if a system meets the expectations and approval of
      the end-user</li>
      <li>There may also be predefined functionality requirements that can be checked with acceptance tests</li>
    </ul>
    `
  },
  {
    "label": "Functional vs. Structural",
    "description": `
    <h1>Functional vs. Structural Testing</h1>
    <hr></hr>
    <h3>Overview</h3>
    The testing types in this section specify particular <em>styles</em> of tests that can be applied to any of the
    previously discussed testing scopes. For instance, you can have functional or structural style tests that are unit
    tests, system tests, etc. 
    <hr></hr>
    <h3>Functional Testing (Black Box Testing)</h3>
    <ul>
      <li>Tests that assume <em>no</em> knowledge of the internal implementation of the code</li>
      <li>These are tests that could be written with only knowledge of the ourward facing interface provided by the code
      (focus only on inputs and outputs of a function/module/system)</li>
    </ul>
    <hr></hr>
    <h3>Structural Testing (White/Glass Box Testing)</h3>
    <ul>
      <li>Tests that <em>do</em> assume knowledge of internal implementation (data structures, algorithms, etc. that are
        used in the internal code)</li>
      <li>These tests may be used to check that the state of the structures in the code is correct at a particular point
      in the execution</li>
    </ul>
    `
  },
  {
    "label": "Test-Driven Development",
    "description": `
    <h1>Test-Driven Development (TDD)</h1>
    <hr></hr>
    <h3>Overview</h3>
    <ul>
      <li>A style of software development that prioritizes testing</li>
      <li>Commonly used in industry</li>
      <li>Aligns with the agile development methodology that focuses on iterative development</li>
    </ul>
    <hr></hr>
    <h3>TDD Steps</h3>
    <ol> 
      <li>write test cases (that fail initially, because the code they are testing doesn’t yet exist)</li>
      <li>write the code that satisfies the test cases</li>
      <li>refactor the code</li> 
    </ol> 
    So, any time a new feature needs to be implemented, the process would consist of writing test cases first, and then actually implementing the feature. This puts the emphasis on writing tests, and ensures that tests are not an afterthought.
    It is important to understand that test-driven development does not just mean writing tests for your code, and that instead it is a specific and clearly defined strategy for developing software.
    `
  },
  {
    "label": "Writing Tests",
    "description": `
    <h1>Fundamentals of Writing Tests</h1>
    <hr></hr>
    <h3>General Testing Format</h3>
    Just as normal code should follow certain guidelines in order to be readable and easily maintained, tests should follow this same principle.
    <ul>
      <li>Each test case should be testing for one thing</li>
      <li>Each test case should be held within its own function, with a name that clearly indicates what is being tested
      (this is important because when a test fails, it is clear 
        what went wrong, making it easier to address the underlying issue)</li>
      <li>Each test case should follow the <em>arrange</em>, <em>act</em>, <em>assert</em> format
    </ul>
    <hr></hr>
    <h3>Assertions</h3>
    In most programming language, <code>assert()</code> is a built in function that takes a boolean condition. 
    The assertion statement will raise an error if the boolean expression evaluates to false, otherwise code execution 
    will continue. However, javascript does not have a built in assert function, however one has been provided here for 
    the programming exercises in the practice section. 
    <hr></hr>
    <h3>Coverage</h3>
    Test/code coverage is a measurement of how much of the code is exercised by a given test or series of tests.
    <br></br>
    Types of coverage measurements:
    <ul>
      <li>Line Coverage - the percentage of lines of code that are exercised by the test suite</li>
      <li>Branch Coverage - the percentage of branches executed (each possible result of an if...else statement would be considered its own branch)</li>
      <li>Path Coverage - each path is a possible route or control flow that a single execution of the code can follow</li>
    </ul>
    Test coverage provides a good baseline for determining how comprehensive your test suite is. However, 
    your tests should not be motivated solely by increasing test coverage, and a high test coverage does not indicate that 
    your tests are complete and of high quality. Test coverage is a useful metric that can help guide your testing, but 
    the motivation should be to exercise edge cases and consider how the system will be interacted with by the user or the 
    other components that interface with the system.`
  }
];


