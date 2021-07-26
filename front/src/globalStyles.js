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
      --purple-color:#8176f5;
    }
`;
export const Container = styled.div`
  background: var(--main-bg-color);
  height: 100vh;
`;
export const CardsWrapper = styled.div`
  margin-top: 1rem;
  display: grid;
  grid-gap: 2rem 0;
  place-items: center;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  @media screen and (max-width: 1400px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  @media screen and (max-width: 1124px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (max-width: 530px) {
    grid-template-columns: 1fr;
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
