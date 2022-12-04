import { useEffect, useState, Fragment } from 'react';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { xcode } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-xcode';
// import 'ace-builds/src-noconflict/theme-vibrant_ink';
import styled from 'styled-components';

import Evaluator from './evaluator/evaluator';
import ResultDisplay from './ResultDisplay';
import { ContentArea, StyledOption } from './constants/styledComponents';
import Hint from './Hint';

const parse = require('html-react-parser');


function Exercise({ exercise, updateCompletedExercises, completed }) {
  const [editorCode, setEditorCode] = useState(exercise['placeholder-code']);
  const [inputArgs, setInputArgs] = useState(['']);
  const [evalResult, setEvalResult] = useState(null);
  const [accepted, setAccepted] = useState(completed);

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
    setAccepted(completed);
  }, [exercise['placeholder-code']]);

  useEffect(() => {
    initInputArgs();
    setEvalResult(null);
    setAccepted(completed);
  }, [exercise.id]);

  useEffect(() => {
    if (accepted) {
      updateCompletedExercises(exercise.id);
    }
  }, [accepted]);

  const submitCode = () => {
    let newResult = null;
    try {
      newResult = ev.evaluate(editorCode, exercise['test-func']);
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

  const customStyle = {
      fontSize: "80%"
    }
    
  const codeTagProps = {
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
        {
          exercise['code'] ? (
            <SyntaxHighlighter 
              className={exercise['input-type'] === 1 ? 'codeBlock typeOneCodeBlock' : 'codeBlock typeOneCodeBlock'}
              language="javascript"
              style={xcode}
              customStyle={customStyle}
              codeTagProps={codeTagProps}
              >
              {exercise.code}
            </SyntaxHighlighter>
          ) : ( null )
        }
        {/* <SyntaxHighlighter 
          className={exercise['input-type'] === 1 ? 'codeBlock' : 'codeBlock typeOneCodeBlock'}
          language="javascript"
          style={xcode}
          customStyle={cs}
          codeTagProps={ctp}
          >
          {exercise.code}
        </SyntaxHighlighter> */}
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
                  <a href="#hint">Submit</a>
                </StyledOption>
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
              width='100%'
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
                onClick={submitCode}
                >
                <a href="#hint">Submit</a>
                
              </StyledOption>
            </div>
            
          </div>
        ) : null
      }
      {
        exercise['label'] !== 'Introduction' ? (
          <Fragment>
            {
              evalResult ? (
              <Fragment>
                <hr></hr>
                <ResultDisplay 
                  evalResult={evalResult}
                  exerciseId={Math.trunc(exercise.id)}
                >
                </ResultDisplay>
              </Fragment>
              ) : ( null )
            }
          </Fragment>
        ) : ( null )
      }
      {
        exercise.label !== 'Introduction' && exercise.hint ? (
          <Fragment>
            <hr></hr>
            <Hint
              hintText={exercise.hint}>

            </Hint>
          </Fragment>
        ) : (null)
      }
    </ContentArea>
  )
}

export default Exercise;
