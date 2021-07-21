import React from 'react';
import MenuTab from '../components/MenuTab';
import { Container } from '../globalStyles';

const Home = ({ userObj, cards, setCards, quizzes, setQuizzes }) => {
  return (
    <div>
      <Container>
        <MenuTab
          cards={cards}
          setCards={setCards}
          quizzes={quizzes}
          setQuizzes={setQuizzes}
          userObj={userObj}
        />
      </Container>
    </div>
  );
};

export default Home;
