import { useState, Fragment, useEffect } from 'react';

import styled from 'styled-components';


const HintButton = styled.div`
${
  props => props.isActive ? `
  background: transparent;
  background-color: #d4509d;` : 
  `background: linear-gradient(
    to bottom,
    white,
    rgba(192, 228, 240, 1)
  );`
}
// background: linear-gradient(
//   to bottom,
//   white,
//   rgba(192, 228, 240, 1)
// );
// background-color: ${props => props.isActive ? 'red' : 'rgb(192, 228, 240)'};
// transform: ${props => props.isActive ? 'scale(1.1)' : 'scale(1)'};
border-radius: 5px;
border: 2px solid lightblue;
color: black;
margin: 0.5em 1em;
padding: 0.25em 1em;
width: 70px;
height: 20px;
flex-direction: row;
text-align: center;
font-size: 12pt;
&:hover {
  cursor: pointer;
  transform: scale(1.1);
}
`

const HintContent = styled.div`
background: linear-gradient(
  to bottom,
  white,
  lightgreen
);
background-color: ${props => props.active ? 'rgb(192, 228, 240)' : 'rgb(192, 228, 240)'};
transform: ${props => props.active ? 'scale(1.1)' : 'scale(1)'};
border-radius: 5px;
border: 2px solid lightblue;
color: black;
margin: 0.5em 1em;
padding: 0.25em 1em;
// width: 100px;
// height: 50px;
flex-direction: row;
text-align: center;
font-size: 12pt;
// &:hover {
//   cursor: pointer;
//   transform: scale(1.1);
// }
`


function Hint({ hintText }) {
  const [showHint, setShowHint] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setShowHint(false);
    setIsActive(false);
  }, [hintText]);

  return (
    <div id="hint">
      {
        showHint ? (
          <HintContent>
            {hintText}
          </HintContent>
        ) : (
          <HintButton
            isActive={isActive}
            onClick={() => {
              setShowHint(true);
              setIsActive(true);
            }}>
            Hint
          </HintButton>
        )
      }
    </div>
  )
}


export default Hint;