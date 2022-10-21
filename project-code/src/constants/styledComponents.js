import styled from 'styled-components';

export const ContentArea = styled.div`
  border: 2px solid yellow;
  background-color: white;
  margin: auto;
  margin-top: 10px;
  width: 75%;
  padding: 15px;
  margin-bottom: 20px;
`

export const StyledHeader = styled.h1`
  text-align: center;
  background: transparent;
  color: palevioletred;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`

export const OptionArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`

export const StyledOption = styled.div`
  background: transparent;
  background-color: ${props => props.accepted ? 'lightgreen' : 'white'};
  border-radius: 5px;
  border: 2px solid lightblue;
  color: palevioletred;
  margin: 0.5em 1em;
  padding: 0.25em 1em;
  width: 110px;
  height: 50px;
  text-align: center;
  flex-direction: row;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
    background-color: ${props => props.accepted ? 'lightgreen' : 'yellow'};
  }
  `
