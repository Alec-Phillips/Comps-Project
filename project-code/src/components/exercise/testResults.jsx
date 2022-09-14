import { useState } from 'react';



function TestResults(props) {
    return (
        <div>
            <ul>
                {props.resultsList.map((x, i) => 
                    <li key={i} >{x}</li>
                )}
            </ul>
            <p>props</p>
        </div>
    );
}

export default TestResults;