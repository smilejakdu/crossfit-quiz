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
      --blue-color:#3799fc;
    }
`;
export const Container = styled.div`
  z-index: 1;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding: 2rem 4rem;
`;
export const CardsWrapper = styled.div`
  padding: 2rem;
  display: grid;
  grid-gap: 3rem;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  @media screen and (max-width: 80rem) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media screen and (max-width: 70rem) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (max-width: 52rem) {
    grid-template-columns: 1fr;
    justify-content: center;
  }
`;
export const EmptyWrapper = styled.div`
  margin-top: 5rem;
`;
export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

export default GlobalStyle;
