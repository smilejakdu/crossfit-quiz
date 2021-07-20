import styled from 'styled-components';

export const MainWrapper = styled.div`
  background-color: #fff;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const CardsWrapper = styled.div`
  background-color: pink;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
`;
export const ImageWrapper = styled.div`
  background-color: ${(props) => props.backgroundColor || '#ffffff'};
  border: ${(props) => props.border || '1px solid var(--blue-color)'};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;
  margin: 0 auto;
  margin-right: 4rem;
  box-shadow: 5px 7px 14px 0px rgba(13, 27, 62, 0.75);

  &:hover {
    transform: ${(props) => props.transform};
  }
  &:last-child {
    margin-right: 0;
  }
`;
