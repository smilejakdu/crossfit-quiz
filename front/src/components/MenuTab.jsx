import { Tabs } from 'antd';
import React from 'react';
import Cards from './Cards';
import Quizzes from './Quizzes';

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
        <Quizzes />
      </TabPane>
      <TabPane tab="Cards" key="2">
        <Cards />
      </TabPane>
    </Tabs>
  );
};

export default MenuTab;
