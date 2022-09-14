import { useState, useEffect } from 'react';



function Evaluator(props) {

    const [codeToSend, setCodeToSend] = useState[props.code];
    const [codeResult, setCodeResult] = useState('');

    console.log('code to send', codeToSend);

    useEffect(() => {
        const reqOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ code: codeToSend })
        };
        fetch('http://127.0.0.1:5000/test-code', reqOptions)
        .then(response => response.json())
        .then(data => {
            setCodeResult(data)
            console.log('hello')});
    }, []);

    return (
        <div>
            <p>{codeResult.response}</p>
            <p>{codeResult.stdout}</p>
            <p>{codeResult.stderr}</p>
        </div>
    )
}


export default Evaluator;