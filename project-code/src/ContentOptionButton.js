import styled from 'styled-components';

const StyledOption = styled.div`
  background: transparent;
  background-color: ${props => props.completed ? 'lightgreen' : props.active ? 'lightyellow' : 'rgb(192, 228, 240)'};
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
  &:hover {
    cursor: pointer;
    transform: scale(1.2);
  }
  `

function ContentOptionButton({ label, active, completed, setContentSection }) {

  return (
    <StyledOption
    onClick={setContentSection}
    active={active}
    completed={completed}>
      {label}
    </StyledOption>
  )
}

export default ContentOptionButton;