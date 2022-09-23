import { useState } from 'react';
import OptionButton from './OptionButton';
import ContentOptionButton from './ContentOptionButton';
import Exercise from './Exercise';
import { contentDescriptions } from './constants/learning-materials/learningMaterials';
import { exerciseInfo } from './constants/exercises/exerciseInfo';

import './App.css';
import styled from 'styled-components';

const headerStyle = {
  textAlign: 'center',
  background: 'transparent',
  color: 'palevioletred',
}

const OptionArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

function App() {

  const [learnAreaContent, setLearnAreaContent] = useState([]);
  const [activeLearnSection, setActiveLearnSection] = useState('');
  const [practiceAreaContent, setPracticeAreaContent] = useState([]);
  const [currentExerciseType, setCurrentExerciseType] = useState(0);
  const [activeExercise, setActiveExercise] = useState(null);

  return (
    <div className="App">
      <h1 style={headerStyle}>
        Testing Tutor
      </h1>
      <OptionArea>
        <OptionButton
          label='Learn'
          setSubContent={() => {
            setPracticeAreaContent([]);
            setCurrentExerciseType(0);
            setActiveExercise(null);
            setLearnAreaContent(contentDescriptions.map(item => item.label));
          }}
        />
        <OptionButton
          label='Practice'
          setSubContent={() => {
            setLearnAreaContent([]);
            setActiveLearnSection('');
            setPracticeAreaContent(exerciseInfo.map(item => item.label));
          }}
        />
      </OptionArea>
      {
        learnAreaContent.length ? (
          learnAreaContent.map(
            (label, ind) => <ContentOptionButton
              label={label}
              key={`${ind}-${label}`}
              setContentSection={() => setActiveLearnSection(contentDescriptions[ind].description)}
              ></ContentOptionButton>
          )
        ) : null
      }
      {
        activeLearnSection.length ? (
          <div>
            <p>{activeLearnSection}</p>
          </div>
        ) : null
      }
      {
        practiceAreaContent.length ? (
          practiceAreaContent.map(
            (label, ind) => 
              <ContentOptionButton
                label={label}
                key={`${ind}-${label}`}
                setContentSection={() => {
                  setActiveExercise(null);
                  setCurrentExerciseType(ind + 1);
                }}
              ></ContentOptionButton>
          )
        ) : null
      }
      {
        currentExerciseType ? (
          exerciseInfo.filter(obj => obj.type === currentExerciseType).flatMap(obj => {
            return obj.exercises;}).map(
            (obj, ind) => {
              return (
              <ContentOptionButton
                label={obj.label}
                key={`${ind}-${obj.label}`}
                setContentSection={() => {
                  setActiveExercise(obj);
                }}
                ></ContentOptionButton>)
              })
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
