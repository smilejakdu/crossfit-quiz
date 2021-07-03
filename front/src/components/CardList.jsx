import React, { useState } from 'react';
import { Form } from 'antd';
import Card from './Card';
import SearchBar from './SearchBar';
import { CardsWrapper } from '../globalStyles';

const CardList = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    // form.resetFields();
    setIsModalVisible(true);
  };

  return (
    <>
      <SearchBar
        showModal={showModal}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        form={form}
      />

      <CardsWrapper>
        <Card showModal={showModal} />
      </CardsWrapper>
    </>
  );
};

export default CardList;
