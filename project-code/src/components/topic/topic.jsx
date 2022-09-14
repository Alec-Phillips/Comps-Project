import React from 'react';
import { useEffect, useState } from 'react';
import Exercise from '../exercise/exercise';
import './topic.css';



function Topic(props) {

    const topic = props.topic;
    const [toggleChosen, setToggleChosen] = useState('material');
    const [topicMaterial, setTopicMaterial] = useState('');
    const [exerciseList, setExerciseList] = useState('');
    const [currExercise, setCurrExercise] = useState('');

    // use an effect to get the correct material info based on props
    useEffect(() => {
        fetch('/topic', {
            method: 'POST',
            body: topic,
        })
        .then((res) => res.json())
        .then((res) => {
            setTopicMaterial(res.content_description);
            setExerciseList(res.exercise_list);
            document.getElementById('materialToggle').style.backgroundColor = 'aquamarine';
            if (toggleChosen === 'exercises') {
                setToggleChosen('material');
                document.getElementById('exerciseToggle').style.backgroundColor = 'white';
            }
        })
        setCurrExercise('');
    }, [props.topic]);

    useEffect(() => {
        if (currExercise !== '' && toggleChosen === 'exercises') {
            document.getElementById(currExercise).style.backgroundColor = 'aquamarine';
        }
    }, [currExercise, toggleChosen]);

    return (
        <div className='topic'>
            <h1 id='topicTitle'> {topic} </h1>
            <div id='toggle'>
                <div className='toggleOption hoverable' id='materialToggle' onClick={() => {
                        setToggleChosen('material');
                        document.getElementById('materialToggle').style.backgroundColor = 'aquamarine';
                        document.getElementById('exerciseToggle').style.backgroundColor = 'white';
                    }}>
                    Material
                </div>
                <div className='toggleOption hoverable' id='exerciseToggle' onClick={() => {
                        setToggleChosen('exercises');
                        document.getElementById('exerciseToggle').style.backgroundColor = 'aquamarine';
                        document.getElementById('materialToggle').style.backgroundColor = 'white';
                    }}>
                    Exercises
                </div>
            </div>
            <div id='topicContentArea'>
                {
                    toggleChosen === 'material' ? (
                        <p> {topicMaterial} </p>
                    ) : (
                        <div id='exerciseArea'>
                            <div id='exerciseOptions'>
                                {exerciseList.map(
                                    (x, i) => <div 
                                                className='exerciseBubble hoverable' 
                                                id={x} 
                                                key={i}
                                                onClick={(evt) => {
                                                    if (currExercise !== '') {
                                                        document.getElementById(currExercise).style.backgroundColor = 'white';
                                                    }
                                                    setCurrExercise(evt.target.id);
                                                }}>
                                                    {x}
                                                </div>)
                                }
                            </div>
                            <div id='editor'>
                            {
                                currExercise !== '' ? (
                                    <Exercise topic={props.topic} exercise={currExercise}/>
                                ) : (
                                    <></>
                                )
                            }
                                {/* <Exercise topic={props.topic} exercise={currExercise}/> */}
                            </div>
                        </div>
                    )
                }
            </div>
            
            
        </div>
    )
}

export default Topic;