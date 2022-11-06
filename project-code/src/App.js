import { Fragment, useEffect, useState } from 'react';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { xcode } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import OptionButton from './OptionButton';
import ContentOptionButton from './ContentOptionButton';
import Exercise from './Exercise';
import { contentDescriptions } from './constants/learning-materials/learningMaterials';
import { exerciseGraph, exerciseInfo } from './constants/exercises/exerciseInfo';

import './App.css';
import {
  StyledHeader,
  OptionArea,
  ContentArea,
} from './constants/styledComponents';

const parse = require('html-react-parser');

function App() {

  const [learnAreaContent, setLearnAreaContent] = useState([]);
  const [activeLearnSection, setActiveLearnSection] = useState('');
  const [practiceAreaContent, setPracticeAreaContent] = useState([]);
  const [currentExerciseType, setCurrentExerciseType] = useState(0);
  const [activeExercise, setActiveExercise] = useState(null);
  const [completedExercises, setCompletedExercises] = useState(new Set());
  const [unlockedExercises, setUnlockedExercises] = useState(new Set());
  const [unlockedExerciseTypes, setUnlockedExerciseTypes] = useState(new Set());

  // setting up the completedExercises state aspect
  // query localStorage to get saved completedExercises
  useEffect(() => {
    const lsCompletedExercises = localStorage.getItem('completedExercises');
    if (lsCompletedExercises !== null) {
      setCompletedExercises(new Set(JSON.parse(lsCompletedExercises)));
    }
    buildUnlockedExercises(JSON.parse(lsCompletedExercises));
  }, []);

  // function to initialize the unlocked exercises set
  const buildUnlockedExercises = (lsCompletedExercises) => {
    let tempUnlockedExercises = [1.0, 1.1, 2.0, 3.0, 3.1];
    if (lsCompletedExercises) {
      for (const completedExercise of lsCompletedExercises) {
        tempUnlockedExercises.push(completedExercise);
        tempUnlockedExercises = tempUnlockedExercises.concat(exerciseGraph.get(completedExercise));
      }
    }
    setUnlockedExercises(new Set(tempUnlockedExercises));
    buildUnlockedExerciseTypes(tempUnlockedExercises);
  }

  const buildUnlockedExerciseTypes = (tempUnlockedExercises) => {
    const tempUnlockedExerciseTypes = [1];
    for (const unlockedExercise of tempUnlockedExercises) {
      if (unlockedExercise - Math.floor(unlockedExercise) != 0) {
        tempUnlockedExerciseTypes.push(Math.trunc(unlockedExercise));
      }
    }
    setUnlockedExerciseTypes(new Set(tempUnlockedExerciseTypes));
  }

  // a callback to update the set of completed exercises as well as the localStorage
  const updateCompletedExercises = (exerciseId) => {
    const tempCompletedExercises = new Set(completedExercises);
    tempCompletedExercises.add(exerciseId);
    setCompletedExercises(tempCompletedExercises);
    localStorage.setItem('completedExercises', JSON.stringify([...tempCompletedExercises]));

    // update the unlocked exercises as well
    let tempUnlockedExercises = [...new Set(unlockedExercises)];
    tempUnlockedExercises = tempUnlockedExercises.concat(exerciseGraph.get(exerciseId));
    setUnlockedExercises(new Set(tempUnlockedExercises));

    buildUnlockedExerciseTypes(tempUnlockedExercises);
  }

  // format the learn section content around the examples
  const formatSection = (content) => {
    const re = /-codeSegmentStart-/gm;
    const segments = [];
    let currMatch;
    let matchStr;
    let matchInd;
    let contentPtr = 0;
    let explorePtr;
    const cs = {
      fontSize: "80%"
    }
    
    const ctp = {
      style: {
        lineHeight: "inherit",
        fontSize: "inherit"
      }
    }
    while ((currMatch = re.exec(content)) !== null) {
      matchStr = currMatch[0];
      matchInd = currMatch.index;
      segments.push(parse(content.substring(contentPtr, matchInd)));
      explorePtr = matchInd + matchStr.length;
      while (content.substring(explorePtr, explorePtr + 16) !== '-codeSegmentEnd-') {
        explorePtr ++;
        if (explorePtr >= content.length) {
          throw new Error('section formatter broken');
        }
      }
      segments.push(
        <SyntaxHighlighter 
          className={'codeBlock'}
          language="javascript"
          style={xcode}
          customStyle={cs}
          codeTagProps={ctp}
          >
          {content.substring(matchInd + matchStr.length, explorePtr)}
        </SyntaxHighlighter>
      );
      contentPtr = explorePtr + 18;
    }
    segments.push(parse(content.substring(contentPtr)));
    return segments;
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
            {formatSection(activeLearnSection)}
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
                    locked={! unlockedExerciseTypes.has(ind + 1)}
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
                    locked={! unlockedExercises.has(obj.id)}
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
