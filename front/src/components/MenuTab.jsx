import { Tabs } from 'antd';
import React from 'react';
import CardList from './CardList';
import QuizList from './QuizList';

const MenuTab = () => {
  const { TabPane } = Tabs;

  //   function callback(key) {
  //     console.log(key);
  //   }

  return (
    <Tabs
      centered
      size="large"
      defaultActiveKey="1"
      //  onChange={callback}
    >
      <TabPane tab="Quizzes" key="1">
        <QuizList />
      </TabPane>
      <TabPane tab="Cards" key="2">
        <CardList />
      </TabPane>
    </Tabs>
  );
};

export default MenuTab;
