<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { Form, Skeleton } from 'antd';
import Card from './Card';
import SearchBar from './SearchBar';
import { cardService } from '../service/config';

const CardList = ({ cards, setCards, setSettingsCard }) => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCards();
    // console.log(cards);
  }, []);

  const fetchCards = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await cardService.getAll();
      console.log(response);
      setCards(response.data);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  const showModal = async () => {
    form.resetFields();
=======
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
>>>>>>> 6f82ad49c15c779fdff7d2b0f70c339742a377b5
    setIsModalVisible(true);
  };

  return (
    <>
      <SearchBar
        showModal={showModal}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        form={form}
<<<<<<< HEAD
        fetchCards={fetchCards}
      />
      {loading ? (
        <>
          <Skeleton active />
        </>
      ) : (
        cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            showModal={showModal}
            setSettingsCard={setSettingsCard}
            setCards={setCards}
          />
        ))
      )}
=======
      />

      <CardsWrapper>
        <Card showModal={showModal} />
      </CardsWrapper>
>>>>>>> 6f82ad49c15c779fdff7d2b0f70c339742a377b5
    </>
  );
};

export default CardList;
