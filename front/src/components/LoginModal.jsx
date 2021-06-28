import React from 'react';
import { Modal } from 'antd';
import { GoogleLogin } from 'react-google-login';

const LoginModal = ({
  isModalVisible,
  setIsModalVisible,
  setUserObj,
  isSignedIn,
  setIsSignedIn,
}) => {
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const responseGoogle = (response) => {
    setIsModalVisible(false);
    const { profileObj } = response;
    setUserObj({
      id: profileObj.googleId,
      username: profileObj.givenName,
      imageUrl: profileObj.imageUrl,
    });

    // setIsSignedIn(true);
  };

  return (
    <Modal visible={isModalVisible} onCancel={handleCancel} footer={null}>
      <GoogleLogin
        clientId="275555720661-ugoifbggh1orde85t41blpfprl0dcvn0.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
        isSignedIn={isSignedIn}
      />
    </Modal>
  );
};

export default LoginModal;
