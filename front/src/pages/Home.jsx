import React from 'react';
import MenuTab from '../components/MenuTab';
import { Container } from '../globalStyles';

const Home = ({ userObj, cards, setCards }) => {
  return (
    <Container>
      <MenuTab cards={cards} setCards={setCards} userObj={userObj} />
    </Container>
  );
};

export default Home;
