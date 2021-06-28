import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        margin:0;
        padding:0;
        box-sizing:border-box;
        font-family:'Montserrat', sans-serif;
    }
`;
export const Container = styled.div`
  z-index: 1;
  width: 100%;
  // max-width: 1500px;
  margin-right: auto;
  margin-left: auto;
  padding: 0 4rem;

  @media screen and (max-width: 48rem) {
    padding: 0 2rem;
  }
`;

export default GlobalStyle;
