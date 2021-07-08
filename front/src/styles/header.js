import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 5rem;
  // border-bottom: 0.5px solid #f0f4f7;

  @media screen and (max-width: 48rem) {
    padding: 1.5rem 2rem;
  }
`;
export const Logo = styled.div``;
export const Right = styled.div`
  display: flex;
`;
export const UserWrapper = styled.div`
  margin-right: 1.5rem;

  &:hover {
    cursor: pointer;
  }
`;
export const Username = styled.span`
  display: inline-block;
  padding-left: 0.5rem;
`;
