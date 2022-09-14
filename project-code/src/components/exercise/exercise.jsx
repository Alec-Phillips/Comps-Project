import { useState, useEffect } from 'react';
import TestResults from './testResults';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-xcode';


function Exercise(props) {
    // props will contain the topic and exercise number

    const [exerciseDescription, setExerciseDescription] = useState('');

    // make an api call to the server to retrieve the info for this
    //  exercise
    useEffect(() => {
        fetch('/exercise', {
            method: 'POST',
            body: JSON.stringify(props),
        })
        .then((res) => res.json())
        .then((res) => {
            setExerciseDescription(res.exercise_description);
        })
    }, [props])

    const [editorCode, setEditorCode] = useState('');
    const [testResults, setTestResults] = useState([]);

    useEffect(() => {
        if (testResults !== []) {
            console.log(testResults);
        }
    }, [testResults])

    let handleSubmit = async (e) => {
        try {
            fetch('http://127.0.0.1:5000/test-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    code: editorCode,
                    topic: props.topic,
                    exercise: props.exercise,
                }),
            })
            .then((res) => res.json())
            .then((res) => {
                setTestResults([res.eval]);
                console.log(res);
            })
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <p>{exerciseDescription}</p>
            <AceEditor
                // placeholder='Start Coding'
                mode='python'
                theme='xcode'
                name='basic-code-editor'
                onChange={(currentCode) => {
                    setEditorCode(currentCode);
                    console.log(currentCode);
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
            <div id='testResults'>
            {
                <TestResults resultsList={testResults} />
            }
                
            </div>
            <button 
                className='hoverable'
                onClick={handleSubmit}
            >Submit</button>
        </div>
        
  );
    
}

export default Exercise;