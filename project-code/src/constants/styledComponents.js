import styled from 'styled-components';

export const ContentArea = styled.div`
  border: 2px solid yellow;
  background-color: white;
  margin: auto;
  margin-top: 10px;
  width: 75%;
  padding: 0px;
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
