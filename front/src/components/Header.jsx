import { debounce } from 'debounce';
import React, { useEffect, useState } from 'react';
import { Button, Popover, Avatar } from 'antd';
import LoginModal from './LoginModal';
import { GoogleLogout } from 'react-google-login';
import { Link, useRouteMatch } from 'react-router-dom';
import {
  Logo,
  LogoTitle,
  Right,
  Username,
  UserWrapper,
  Wrapper,
} from '../styles/header';

const Header = ({ userObj, setUserObj }) => {
  let matchSettings = useRouteMatch('/settings');
  let matchQuiz = useRouteMatch('/quiz/:id');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    window.localStorage.setItem('userObj', JSON.stringify(userObj));
  }, [userObj]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleResize = debounce(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, 1000);

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
      <Link to="/">
        <div styles={{ display: 'flex', alignItems: 'center' }}>
          <LogoTitle>CROSSFIT</LogoTitle>
          <Logo
            alt="logo"
            src="https://image.flaticon.com/icons/png/512/1248/1248778.png"
          />
          <LogoTitle>QUIZ</LogoTitle>
        </div>
      </Link>

      <Right>
        {userObj && (
          <UserWrapper>
            <Popover content={content}>
              <Avatar src={userObj.img_path} />
              {windowSize.width > 768 && <Username>{userObj.name}</Username>}
            </Popover>
          </UserWrapper>
        )}
        {userObj ? (
          matchSettings || matchQuiz ? (
            <Link to="/">
              <Button type="primary" ghost>
                Back Home
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
