import React from 'react';
import Header from '../components/Header';
import MenuTab from '../components/MenuTab';
import { Container } from '../globalStyles';

const Home = ({ userObj, setUserObj }) => {
  return (
    <div>
      <Header userObj={userObj} setUserObj={setUserObj} />
      <Container>
        <MenuTab />
      </Container>
    </div>
  );
};

export default Home;
