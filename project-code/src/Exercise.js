import { useEffect, useState } from 'react';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { xcode } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-xcode';

import Evaluator from './evaluator/evaluator';



function Exercise({ exercise }) {

  const [editorCode, setEditorCode] = useState(exercise['placeholder-code']);
  const ev = new Evaluator();

  useEffect(() => {
    setEditorCode(exercise['placeholder-code']);
  }, [exercise['placeholder-code']]);

  const submitCode = () => {
    // build this out, abstract into the evaluator and make specific to each exercise
    const args = 'n';
    const suffix = 'return intToBaseFour(n)'
    const newFunction = Function(args, editorCode + suffix);
    console.log(newFunction(500));
    // console.log(submitCode);
    // console.log(editorCode);
    // const out = eval(editorCode);
    // console.log(out);
    // ev.setCode(editorCode);
    // ev.evaluate();
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
                  // console.log(currentCode);
              }}
              // fontSize={18}
              showPrintMargin={true}
              showGutter={true}
              highlightActiveLine={true}
              value={editorCode}
              setOptions={{
                // enableBasicAutocompletion: true,
                // enableLiveAutocompletion: true,
                // enableSnippets: true,
                showLineNumbers: true,
                tabSize: 4,
              }}
            />
            <button
              onClick={submitCode}>
              Submit
            </button>
          </>
        ) : null
      }
    </>
  )
}

export default Exercise;