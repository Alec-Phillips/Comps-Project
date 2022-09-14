import styled from 'styled-components';

const StyledOption = styled.div`
    background: transparent;
    border-radius: 3px;
    border: 2px solid palevioletred;
    color: palevioletred;
    margin: 0.5em 1em;
    padding: 0.25em 1em;
    width: 100px;
    height: 50px;
    flex-direction: row;
    &:hover {
      cursor: pointer;
      transform: scale(1.1);
    }
  `

function ContentOptionButton({ label, setContentSection }) {

  return (
    <StyledOption
    onClick={setContentSection}>
      {label}
    </StyledOption>
  )
}

export default ContentOptionButton;