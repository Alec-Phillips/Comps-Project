import { useEffect, useState } from 'react';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { xcode } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-xcode';
import styled from 'styled-components';

import Evaluator from './evaluator/evaluator';
import ResultDisplay from './ResultDisplay';
import { ContentArea, StyledOption } from './constants/styledComponents';
import { Fragment } from 'react';

const parse = require('html-react-parser');


function Exercise({ exercise }) {
  const [editorCode, setEditorCode] = useState(exercise['placeholder-code']);
  const [inputArgs, setInputArgs] = useState(['']);
  const [evalResult, setEvalResult] = useState(null);
  const [accepted, setAccepted] = useState(false);
  const ev = exercise['label'] !== 'Introduction' ? new Evaluator(exercise.id) : null;

  const initInputArgs = () => {
    const args = [];
    if (exercise['input-type'] === 1) {
      for (let _ = 0; _ < exercise['num-inputs']; _ ++) {
        args.push('');
      }
    }
    setInputArgs(args);
  }

  useEffect(() => {
    setEditorCode(exercise['placeholder-code']);
    setEvalResult(null);
    setAccepted(false);
  }, [exercise['placeholder-code']]);

  useEffect(() => {
    initInputArgs();
  }, [exercise.id])

  const submitCode = () => {
    let newResult = null;
    try {
      newResult = ev.evaluate(editorCode);
    } catch(e){
      newResult = {
        pass: false,
        error: true,
        type: e.name + ': ',
        message: e.message,
      };
    }
    setEvalResult(newResult);
    if (newResult.pass) {
      setAccepted(true);
    } else {
      setAccepted(false);
    }
  }

  const submitInputArgs = () => {
    const inputInfo = {
      paramTypes: exercise['param-types'],
      inputArgs: inputArgs,
    }
    let newResult = null;
    try {
      newResult = {
        pass: ev.evaluateEdgeCase(inputInfo),
        error: false,
      }
    } catch(e) {
      newResult = {
        pass: false,
        error: true,
        message: e.message,
      };
    }
    setEvalResult(newResult);
    setAccepted(newResult.pass);
  }

  const cs = {
      fontSize: "80%"
    }
    
  const ctp = {
      style: {
        lineHeight: "inherit",
        fontSize: "inherit"
      }
    }

  return (
    <ContentArea>
      {parse(exercise.description)}
      {exercise.label !== 'Introduction' ? (<hr></hr>) : (null)}
      <div className="exampleCodeArea">
        <SyntaxHighlighter 
          className={exercise['input-type'] === 1 ? '' : "codeBlock"}
          language="javascript"
          style={xcode}
          customStyle={cs}
          codeTagProps={ctp}
          >
          {exercise.code}
        </SyntaxHighlighter>
        {
          exercise['input-type'] === 1 ? (
            <Fragment>
              {
                inputArgs.map((currValue, i) => 
                  <input 
                    type="text"
                    key={`argumentInput-${i}`}
                    value={currValue}
                    placeholder={exercise['placeholder-code']}
                    onChange={(evt) => {
                      let tempArgs = inputArgs.slice();
                      tempArgs[i] = evt.target.value;
                      setInputArgs(tempArgs);
                    }}>
                  </input>
                )
              }
              <div className="flexCol">
                <StyledOption
                  accepted={accepted}
                  onClick={submitInputArgs}>
                  Submit
                </StyledOption>
                { evalResult && accepted ? 'Pass' : evalResult && !accepted ? 'Fail' : null}
                { evalResult && evalResult.error ? <p>{evalResult.message}</p> : null}
              </div>
            </Fragment>
          ) : ( null )
        }
      </div>
      {
        exercise['show-editor'] ? (<hr></hr>) : (null)
      }
      {
        exercise['show-editor'] ? (
          <div className="editorArea">
            <AceEditor
              className="editor"
              // placeholder={exercise['placeholder-code']}
              mode='javascript'
              theme='xcode'
              name='basic-code-editor'
              onChange={(currentCode) => {
                  setEditorCode(currentCode);
              }}
              showPrintMargin={true}
              showGutter={true}
              highlightActiveLine={true}
              value={editorCode}
              setOptions={{
                // enableBasicAutocompletion: true,
                // enableLiveAutocompletion: true,
                // enableSnippets: true,
                showLineNumbers: true,
                tabSize: 2,
              }}
            />
            {/* <button className="submitButton"
              onClick={submitCode}>
              Submit
            </button> */}
            <div id="codeFeedbackArea">
              <StyledOption
                accepted={accepted}
                onClick={submitCode}>
                Submit
              </StyledOption>
              <br></br>
              {
                Math.trunc(exercise.id) === 2 ? (
                  <>
                  {
                    evalResult && evalResult.pass ? (
                      <p>
                        PASS!
                      </p>
                    ) : evalResult && (evalResult.pass === false) ? (
                      <p>
                        Failed on input: {evalResult.failedInput}
                      </p>
                    ) : (null)
                  }
                  </>
                ) : Math.trunc(exercise.id) === 3 ? (
                  <Fragment>
                    {
                      evalResult ? (
                        <ResultDisplay 
                          evalResult={evalResult}
                        >
                          
                        </ResultDisplay>
                      ) : ( null )
                    }
                  </Fragment>
                  
                  // <>
                  // {
                  //   evalResult && evalResult.pass ? (
                  //     <p>
                  //       PASS!
                  //       <br></br>
                  //       100% Coverage
                  //       <br></br>
                  //       Assertions Passed
                  //     </p>
                  //   ) : evalResult ? (
                  //     <p>
                  //       Failed:
                  //       <br></br>
                  //       {evalResult.coverageReport.coverage}% Coverage
                  //       <br></br>
                  //       Missing Branches: {evalResult.coverageReport.uncoveredBranches.length}
                  //       <br></br>
                  //       Failed Assertions: {evalResult.assertionReport.length}
                  //     </p>
                  //   ) : (null)
                  // }
                  // </>
                ) : (
                  null
                )
              }
            </div>
            
          </div>
        ) : null
      }
    </ContentArea>
  )
}

export default Exercise;
