import React from 'react';
import MenuTab from '../components/MenuTab';
import { Container } from '../globalStyles';

const Home = ({ cards, setCards, userObj, setUserObj }) => {
  return (
    <div>
      <Container>
        <MenuTab cards={cards} setCards={setCards} />
      </Container>
    </div>
  );
};

export default Home;
