import { useState } from 'react';
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
        ) : null
      }
      {
        activeLearnSection.length ? (
          <ContentArea>
            <p>{activeLearnSection}</p>
          </ContentArea>
          // <div>
          //   <p>{activeLearnSection}</p>
          // </div>
        ) : null
      }
      {
        practiceAreaContent.length ? (
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
        ) : null
      }
      {
        currentExerciseType ? (
          <OptionArea>
            {exerciseInfo.filter(obj => obj.type === currentExerciseType).flatMap(obj => {
              return obj.exercises;}).map(
              (obj, ind) => {
                return (
                <ContentOptionButton
                  label={obj.label}
                  active={activeExercise && activeExercise.label === obj.label}
                  key={`${ind}-${obj.label}`}
                  setContentSection={() => {
                    setActiveExercise(obj);
                  }}
                  ></ContentOptionButton>)
                })}
          </OptionArea>
        ) : null
      }
      {
        activeExercise ? (
          <div>
            <Exercise
              exercise={activeExercise}
              // description={activeExercise.description}
              // code={activeExercise.code}
            ></Exercise>
          </div>
        ) : null
      }
    </div>
  )
}

export default App;
