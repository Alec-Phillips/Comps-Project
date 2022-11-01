import styled from 'styled-components';

const StyledOption = styled.div`
  background: transparent;
  background-color: ${props => props.active ? 'lightyellow' : 'rgb(192, 228, 240)'};
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
    transform: scale(1.1);
  }
  `

function ContentOptionButton({ label, active, setContentSection }) {

  return (
    <StyledOption
    onClick={setContentSection}
    active={active}>
      {label}
    </StyledOption>
  )
}

export default ContentOptionButton;