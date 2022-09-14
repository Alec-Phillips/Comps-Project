import { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { xcode } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-xcode';



function Exercise() {

  const [editorCode, setEditorCode] = useState('');

  return (
    <>
      <SyntaxHighlighter language="python" style={xcode}>
        {"def hello_there()"}
      </SyntaxHighlighter>

      <AceEditor
        // placeholder='Start Coding'
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
    </>
  )
}

export default Exercise;