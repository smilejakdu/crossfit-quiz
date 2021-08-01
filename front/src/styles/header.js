import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 5rem;
  @media screen and (max-width: 48rem) {
    padding: 1.5rem 2rem;
  }
`;
export const LogoTitle = styled.span`
  color: var(--blue-color);
  font-weight: 600;
`;
export const Logo = styled.img`
  width: 3rem;
`;
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
