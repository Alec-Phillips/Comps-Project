import { useEffect, useState } from 'react';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { xcode } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-xcode';

import Evaluator from './evaluator/evaluator';



function Exercise({ exercise }) {
  const [editorCode, setEditorCode] = useState(exercise['placeholder-code']);
  const [evalResult, setEvalResult] = useState(null);
  const ev = new Evaluator(exercise.id);

  useEffect(() => {
    setEditorCode(exercise['placeholder-code']);
    setEvalResult(null);
  }, [exercise['placeholder-code']]);

  const submitCode = () => {
    const newResult = ev.evaluate(editorCode);
    setEvalResult(newResult);
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
    <>
      <p>
        {exercise.description}
      </p>
      <SyntaxHighlighter 
        language="javascript"
        style={xcode}
        customStyle={cs}
        codeTagProps={ctp}
        >
        {exercise.code}
      </SyntaxHighlighter>

      {
        exercise['show-editor'] ? (
          <>
            <AceEditor
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
            <button
              onClick={submitCode}>
              Submit
            </button>
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
        ) : null
      }
    </>
  )
}

export default Exercise;