import { useState } from 'react';
import styled from 'styled-components';

const StyledOption = styled.div`
    // background: transparent;
    background: linear-gradient(
      to bottom,
      white,
      rgba(192, 228, 240, 1)
    );
    background-color: ${props => props.active ? 'rgb(192, 228, 240)' : 'rgb(192, 228, 240)'};
    transform: ${props => props.active ? 'scale(1.1)' : 'scale(1)'};
    border-radius: 5px;
    border: 2px solid lightblue;
    color: black;
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
