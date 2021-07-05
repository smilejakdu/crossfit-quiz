import React, { useEffect, useState } from 'react';
import { Button, Popover, Avatar } from 'antd';
import styled from 'styled-components';
import LoginModal from './LoginModal';
import { GoogleLogout } from 'react-google-login';
import { Link, useLocation } from 'react-router-dom';

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
const UserWrapper = styled.div`
  margin-right: 1.5rem;

  &:hover {
    cursor: pointer;
  }
`;
const Username = styled.span`
  display: inline-block;
  padding-left: 0.5rem;
`;

const Header = ({ userObj, setUserObj }) => {
  let location = useLocation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    window.localStorage.setItem('userObj', JSON.stringify(userObj));
  }, [userObj]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const logout = () => {
    setUserObj(null);
  };

  const content = (
    <GoogleLogout
      clientId="275555720661-ugoifbggh1orde85t41blpfprl0dcvn0.apps.googleusercontent.com"
      buttonText="Sign Out"
      onLogoutSuccess={logout}
    ></GoogleLogout>
  );

  return (
    <Wrapper>
      <Logo>Logo</Logo>

      <Right>
        {userObj && (
          <UserWrapper>
            <Popover content={content}>
              <Avatar src={userObj.imageUrl} />
              <Username>{userObj.username}</Username>
            </Popover>
          </UserWrapper>
        )}
        {userObj ? (
          location.pathname === '/settings' ? (
            <Link to="/">
              <Button type="primary" ghost>
                Back to Quiz List
              </Button>
            </Link>
          ) : (
            <Link to="/settings">
              <Button type="primary">Create Quiz</Button>
            </Link>
          )
        ) : (
          <>
            <Button type="primary" onClick={showModal}>
              Sign Up
            </Button>
            <LoginModal
              isModalVisible={isModalVisible}
              setIsModalVisible={setIsModalVisible}
              setUserObj={setUserObj}
            />
          </>
        )}
      </Right>
    </Wrapper>
  );
};

export default Header;
