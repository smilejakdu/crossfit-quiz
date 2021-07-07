import React from 'react';
import Header from '../components/Header';
import MenuTab from '../components/MenuTab';
import { Container } from '../globalStyles';

const Home = ({ cards, setCards, userObj, setUserObj }) => {
  return (
    <div>
      <Header userObj={userObj} setUserObj={setUserObj} />
      <Container>
        <MenuTab cards={cards} setCards={setCards} />
      </Container>
    </div>
  );
};

export default Home;
