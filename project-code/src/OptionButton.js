import { useState } from 'react';
import styled from 'styled-components';

const StyledOption = styled.div`
    background: transparent;
    background-color: ${props => props.active ? 'yellow' : 'rgb(192, 228, 240)'};
    border-radius: 5px;
    border: 2px solid lightblue;
    color: palevioletred;
    margin: 0.5em 1em;
    padding: 0.25em 1em;
    width: 200px;
    height: 100px;
    flex-direction: row;
    text-align: center;
    font-size: 20pt;
    line-height: 100px;
    &:hover {
      cursor: pointer;
      transform: scale(1.1);
    }
  `

function OptionButton({ label, active, setSubContent, content }) {

  return (
    <StyledOption
      onClick={setSubContent}
      active={active}
      >
      {label}
    </StyledOption>
  )
}

export default OptionButton;
