import { useState, useEffect } from 'react';



function ServerTest() {
    
    const examplePython = `
        def test1():
            in1 = 1
            in2 = 2

            res = func1(in1, in2)

            assert(res == 3)

            print('pass')
        `;

    // const [codeToSend, setCodeToSend] = useState[examplePython];
    const [codeResult, setCodeResult] = useState('');

    useEffect(() => {
        const reqOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ code: examplePython})
        };
        fetch('http://127.0.0.1:5000/test-code', reqOptions)
        .then(response => response.json())
        .then(data => {
            setCodeResult(data)
            console.log('hello')});
    }, []);

    return (
        <div>
            hi
            <p>{codeResult.response}</p>
            <p>{codeResult.stdout}</p>
            <p>{codeResult.stderr}</p>
        </div>
    )
}


export default ServerTest;