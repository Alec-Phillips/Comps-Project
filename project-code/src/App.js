import { Fragment, useEffect, useState } from 'react';
import OptionButton from './OptionButton';
import ContentOptionButton from './ContentOptionButton';
import Exercise from './Exercise';
import { contentDescriptions } from './constants/learning-materials/learningMaterials';
import { exerciseInfo } from './constants/exercises/exerciseInfo';

import './App.css';
import {
  StyledHeader,
  OptionArea,
  ContentArea,
} from './constants/styledComponents';
import styled from 'styled-components';

const parse = require('html-react-parser');


// const StyledHeader = styled.h1`
//   text-align: center;
//   background: transparent;
//   color: palevioletred;
//   &:hover {
//     cursor: pointer;
//     transform: scale(1.1);
//   }
// `

// const OptionArea = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: center;
//   align-items: center;
// `

// const ContentArea = styled.div`
//   border: 2px solid yellow;
//   background-color: white;
//   margin: auto;
//   margin-top: 10px;
//   width: 75%;
//   padding: 0px;
// `

function App() {

  const [learnAreaContent, setLearnAreaContent] = useState([]);
  const [activeLearnSection, setActiveLearnSection] = useState('');
  const [practiceAreaContent, setPracticeAreaContent] = useState([]);
  const [currentExerciseType, setCurrentExerciseType] = useState(0);
  const [activeExercise, setActiveExercise] = useState(null);
  const [completedExercises, setCompletedExercises] = useState(new Set());

  // setting up the completedExercises state aspect
  // query localStorage to get saved completedExercises
  useEffect(() => {
    const lsCompletedExercises = localStorage.getItem('completedExercises');
    if (lsCompletedExercises !== null) {
      setCompletedExercises(new Set(JSON.parse(lsCompletedExercises)));
    }
  }, []);

  // a callback to update the set of completed exercises as well as the localStorage
  const updateCompletedExercises = (exerciseId) => {
    const tempCompletedExercises = new Set(completedExercises);
    tempCompletedExercises.add(exerciseId);
    setCompletedExercises(tempCompletedExercises);
    localStorage.setItem('completedExercises', JSON.stringify([...tempCompletedExercises]));
  }

  return (
    <div className="App">
      <StyledHeader
        onClick={() => {
          setLearnAreaContent([]);
          setActiveLearnSection('');
          setPracticeAreaContent([]);
          setCurrentExerciseType(0);
          setActiveExercise(null);
        }}
        >
        Testing Tutor
      </StyledHeader>
      <OptionArea>
        <OptionButton
          label='Learn'
          active={learnAreaContent.length ? true : false}
          setSubContent={() => {
            setPracticeAreaContent([]);
            setCurrentExerciseType(0);
            setActiveExercise(null);
            setLearnAreaContent(contentDescriptions.map(item => item.label));
          }}
        />
        <OptionButton
          label='Practice'
          active={practiceAreaContent.length ? true : false}
          setSubContent={() => {
            setLearnAreaContent([]);
            setActiveLearnSection('');
            setPracticeAreaContent(exerciseInfo.map(item => item.label));
          }}
        />
      </OptionArea>
      {
        learnAreaContent.length ? (
          <Fragment>
            <hr className="mainHr"></hr>
            <OptionArea>
              {learnAreaContent.map(
                (label, ind) => <ContentOptionButton
                  label={label}
                  key={`${ind}-${label}`}
                  active={activeLearnSection === contentDescriptions[ind].description}
                  setContentSection={() => setActiveLearnSection(contentDescriptions[ind].description)}
                  ></ContentOptionButton>
              )}
            </OptionArea>
          </Fragment>
        ) : null
      }
      {
        activeLearnSection.length ? (
          <ContentArea>
            {parse(activeLearnSection)}
          </ContentArea>
        ) : null
      }
      {
        practiceAreaContent.length ? (
          <Fragment>
            <hr className="mainHr"></hr>
            <OptionArea>
              {practiceAreaContent.map(
                (label, ind) => 
                  <ContentOptionButton
                    label={label}
                    active={currentExerciseType === ind + 1}
                    key={`${ind}-${label}`}
                    setContentSection={() => {
                      setActiveExercise(null);
                      setCurrentExerciseType(ind + 1);
                    }}
                  ></ContentOptionButton>
              )}
            </OptionArea>
          </Fragment>
        ) : null
      }
      {
        currentExerciseType ? (
          <Fragment>
            <hr className="mainHr"></hr>
            <OptionArea>
              {exerciseInfo.filter(obj => obj.type === currentExerciseType).flatMap(obj => {
                return obj.exercises;}).map(
                (obj, ind) => {
                  return (
                  <ContentOptionButton
                    label={obj.label}
                    active={activeExercise && activeExercise.label === obj.label}
                    completed={completedExercises.has(obj.id)}
                    key={`${ind}-${obj.label}`}
                    setContentSection={() => {
                      setActiveExercise(obj);
                    }}
                    ></ContentOptionButton>)
                  })}
            </OptionArea>
          </Fragment>
        ) : null
      }
      {
        activeExercise ? (
          <div>
            <Exercise
              exercise={activeExercise}
              updateCompletedExercises={updateCompletedExercises}
              completed={completedExercises.has(activeExercise.id)}
            ></Exercise>
          </div>
        ) : null
      }
    </div>
  )
}

export default App;
