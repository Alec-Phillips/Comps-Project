import styled from 'styled-components';

import lockImg from './lock-image.png';
import checkImg from './check-mark-image.png';

const StyledOption = styled.div`
  // background: transparent;
  background: linear-gradient(
    to bottom,
    white,
    rgba(192, 228, 240, 1)
  );
  // background-color: ${props => props.completed ? 'lightgreen' : props.active ? 'rgb(192, 228, 240)' : 'rgb(192, 228, 240)'};
  ${
    props => props.locked ? `
    background-image: url(${lockImg});
    opacity: .3;
    ` : null
  }
  ${
    props => props.completed ? `
    background-image: linear-gradient(
      to bottom,
      rgba(192, 228, 240, 0.1),
      rgba(192, 228, 240, 1)
    ), url(${checkImg});
    // opacity: 1;
    // background-color: rgb(192, 228, 240);
    ` : null
  }
  
  // background-image: url(${lockImg});
  transform: ${props => props.active ? 'scale(1.2)' : 'scale(1)'};
  border-radius: 5px;
  border: 2px solid lightblue;
  color: black;
  margin: 0.5em 1em;
  padding: 0.25em 1em;
  width: 110px;
  height: 50px;
  text-align: center;
  flex-direction: row;
  ${props => ! props.locked ? `
  &:hover {
    cursor: pointer;
    transform: scale(1.2);
  }
  ` : null}
  `

function ContentOptionButton({ label, active, completed, locked, setContentSection }) {

  return (
    <StyledOption
    className='someName'
    onClick={locked ? null : setContentSection}
    active={active}
    completed={completed}
    locked={locked}>
      {label}
    </StyledOption>
  )
}

export default ContentOptionButton;