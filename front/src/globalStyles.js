import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        margin:0;
        padding:0;
        box-sizing:border-box;
        font-family: 'Open Sans', sans-serif;
    }
    
    :root {
      --main-bg-color: #f7f9fa;
      --blue-color:#3799fc;
      --purple-color:#8176f5;
    }
`;
export const Container = styled.div`
  background: var(--main-bg-color);
  min-height: 90vh;
`;
export const CardsWrapper = styled.div`
  max-width: 1600px;
  margin: ${(props) => props.margin || '0 10vw'};
  margin-bottom: 3rem;
  display: grid;
  grid-gap: 2vw 0;
  place-items: center;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  @media screen and (max-width: 1600px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  @media screen and (max-width: 1250px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media screen and (max-width: 1100px) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (max-width: 700px) {
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
export const SkeletonWrapper = styled.div`
  margin: 5rem;
`;

export default GlobalStyle;
