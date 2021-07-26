import styled from 'styled-components';

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const CardsWrapper = styled.div`
  margin: 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
`;

export const ImageWrapper = styled.div`
  margin: 1rem;
  padding: 1.5rem 0;
  width: 15rem;
  height: ${(props) => props.height || '15rem'};
  background-color: ${(props) => props.backgroundColor || '#ffffff'};
  border: ${(props) => props.border || '1px solid var(--blue-color)'};
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props.justifyContent};
  align-items: center;

  box-shadow: 5px 7px 14px 0px rgba(13, 27, 62, 0.75);
  border-radius: 25px;

  &:hover {
    transform: ${(props) => props.transform};
  }
`;
