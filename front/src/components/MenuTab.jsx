import { Tabs } from 'antd';
import React from 'react';
import CardList from './CardList';
import QuizList from './QuizList';
const { TabPane } = Tabs;

const MenuTab = ({ userObj, cards, setCards, quizzes, setQuizzes }) => {
  return (
    <Tabs centered size="large" defaultActiveKey="1">
      <TabPane tab="Quizzes" key="1">
        <QuizList quizzes={quizzes} setQuizzes={setQuizzes} userObj={userObj} />
      </TabPane>
      <TabPane tab="Cards" key="2">
        <CardList cards={cards} setCards={setCards} userObj={userObj} />
      </TabPane>
    </Tabs>
  );
};

export default MenuTab;
