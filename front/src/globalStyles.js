import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        margin:0;
        padding:0;
        box-sizing:border-box;
        font-family:'Montserrat', sans-serif;
    }
    
    :root {
      --main-bg-color: #f7f9fa;
    }
`;
export const Container = styled.div`
  z-index: 1;
  width: 100%;
  // max-width: 1500px;
  margin-right: auto;
  margin-left: auto;
  padding: 2rem 4rem;
`;
export const CardsWrapper = styled.div`
  padding: 2rem;
  display: grid;
  grid-gap: 3rem;
  grid-template-columns: 1fr 1fr 1fr;

  @media screen and (max-width: 80rem) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (max-width: 52rem) {
    grid-template-columns: 1fr;
    justify-content: center;
  }
`;

export default GlobalStyle;
