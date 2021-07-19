import { Tabs } from 'antd';
import React from 'react';
import CardList from './CardList';
import QuizList from './QuizList';
const { TabPane } = Tabs;

const MenuTab = ({ cards, setCards }) => {
  return (
    <Tabs centered size="large" defaultActiveKey="1">
      <TabPane tab="Quizzes" key="1">
        <QuizList />
      </TabPane>
      <TabPane tab="Cards" key="2">
        <CardList cards={cards} setCards={setCards} />
      </TabPane>
    </Tabs>
  );
};

export default MenuTab;
