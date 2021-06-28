import React from 'react';
import Header from '../components/Header';
import MenuTab from '../components/MenuTab';
import { Container } from '../globalStyles';

const Cards = () => {
  return (
    <div>
      <Header />
      <MenuTab />
      <Container>cardlist</Container>
    </div>
  );
};

export default Cards;
