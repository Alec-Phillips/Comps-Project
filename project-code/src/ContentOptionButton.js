import styled from 'styled-components';

import lockImg from './lock-image.png';

const StyledOption = styled.div`
  background: transparent;
  background-color: ${props => props.completed ? 'lightgreen' : props.active ? 'rgb(192, 228, 240)' : 'rgb(192, 228, 240)'};
  ${
    props => props.locked ? `
    background-image: url(${lockImg});
    opacity: .3;
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