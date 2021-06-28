import React from 'react';
import Header from '../components/Header';
import MenuTab from '../components/MenuTab';
import { Container } from '../globalStyles';

const Home = () => {
  return (
    <div>
      <Header />
      <Container>
        <MenuTab />
      </Container>
    </div>
  );
};

export default Home;
