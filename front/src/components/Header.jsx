import { Button } from 'antd';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 5rem;
  // border-bottom: 0.5px solid #f0f4f7;

  @media screen and (max-width: 48rem) {
    padding: 1.5rem 2rem;
  }
`;
const Logo = styled.div``;
const Right = styled.div`
  display: flex;
`;

const Header = () => {
  return (
    <Wrapper>
      <Logo>Logo</Logo>

      <Right>
        <Button type="primary">Sign Up</Button>
      </Right>
    </Wrapper>
  );
};

export default Header;
