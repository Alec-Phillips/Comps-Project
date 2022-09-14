import { useState, useEffect } from 'react';
import OptionButton from './OptionButton';
import ContentOptionButton from './ContentOptionButton';
import Exercise from './Exercise';
import { contentDescriptions } from './constants/learning-materials/learningMaterials';

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

  const [subContent, setSubContent] = useState([]);

  const [activeContentSection, setActiveContentSection] = useState('');

  return (
    <div className="App">
      <h1 style={headerStyle}>
        Testing Tutor
      </h1>
      <OptionArea>
        <OptionButton
          label='Learn'
          setSubContent={() => setSubContent(contentDescriptions.map(item => item.label))}
        />
        <OptionButton
          label='Practice'
        />
      </OptionArea>
      <OptionArea>
        {}
      </OptionArea>
      {
        subContent.length ? (
          subContent.map(
            (label, ind) => <ContentOptionButton
              label={label}
              key={`${ind}-${label}`}
              setContentSection={() => setActiveContentSection(contentDescriptions[ind].description)}
              ></ContentOptionButton>
          )
        ) : null
      }
      {
        activeContentSection.length ? (
          <div>
            <p>{activeContentSection}</p>
          </div>
        ) : null
      }
    </div>
  )
}



export default App;
