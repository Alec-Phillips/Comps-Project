import { useEffect, useState } from 'react';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { xcode } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-xcode';
import styled from 'styled-components';

import Evaluator from './evaluator/evaluator';

import { ContentArea } from './constants/styledComponents';

const StyledOption = styled.div`
  background: transparent;
  background-color: ${props => props.accepted ? 'lightgreen' : 'white'};
  border-radius: 5px;
  border: 2px solid lightblue;
  color: palevioletred;
  margin: 0.5em 1em;
  padding: 0.25em 1em;
  width: 110px;
  height: 50px;
  text-align: center;
  flex-direction: row;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
    background-color: yellow;
  }
  `


function Exercise({ exercise }) {
  const [editorCode, setEditorCode] = useState(exercise['placeholder-code']);
  const [evalResult, setEvalResult] = useState(null);
  const [accepted, setAccepted] = useState(false);
  const ev = exercise['show-editor'] ? new Evaluator(exercise.id) : null;

  useEffect(() => {
    setEditorCode(exercise['placeholder-code']);
    setEvalResult(null);
    setAccepted(false);
  }, [exercise['placeholder-code']]);

  const submitCode = () => {
    const newResult = ev.evaluate(editorCode);
    console.log(newResult);
    setEvalResult(newResult);
    if (newResult.pass) {
      setAccepted(true);
    } else {
      setAccepted(false);
    }
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
      <p>
        {exercise.description}
      </p>
      <hr></hr>
      <SyntaxHighlighter 
        className="codeBlock"
        language="javascript"
        style={xcode}
        customStyle={cs}
        codeTagProps={ctp}
        >
        {exercise.code}
      </SyntaxHighlighter>
      <hr></hr>
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
            <StyledOption
              accepted={accepted}
              onClick={submitCode}>
              Submit
            </StyledOption>
            <br></br>
            {
              Math.trunc(exercise.id) === 1 ? (
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
              ) : Math.trunc(exercise.id) === 2 ? (
                <>
                {
                  evalResult && evalResult.pass ? (
                    <p>
                      PASS!
                      <br></br>
                      100% Coverage
                      <br></br>
                      Assertions Passed
                    </p>
                  ) : evalResult ? (
                    <p>
                      Failed:
                      <br></br>
                      {evalResult.coverageReport.coverage}% Coverage
                      <br></br>
                      Missing Branches: {evalResult.coverageReport.uncoveredBranches.length}
                      <br></br>
                      Failed Assertions: {evalResult.assertionReport.length}
                    </p>
                  ) : (null)
                }
                </>
              ) : (
                null
              )
            }
          </div>
        ) : null
      }
    </ContentArea>
  )
}

export default Exercise;