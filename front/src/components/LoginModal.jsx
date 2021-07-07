import React from 'react';
import { Modal } from 'antd';
import { GoogleLogin } from 'react-google-login';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginModal = ({ isModalVisible, setIsModalVisible, setUserObj }) => {
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const responseGoogle = (response) => {
    setIsModalVisible(false);
    const { profileObj } = response;
    setUserObj({
      googleId: profileObj.googleId,
      username: profileObj.givenName,
      imageUrl: profileObj.imageUrl,
    });
  };

  return (
    <Modal
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
    >
      <Wrapper>
        <GoogleLogin
          clientId="275555720661-ugoifbggh1orde85t41blpfprl0dcvn0.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      </Wrapper>
    </Modal>
  );
};

export default LoginModal;
