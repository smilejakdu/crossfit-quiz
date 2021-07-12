import React, { useEffect, useState } from 'react';
import { Form, Skeleton } from 'antd';
import Card from './Card';
import SearchBar from './SearchBar';
import { cardService } from '../service/cards';
import { CardsWrapper } from '../globalStyles';

const CardList = ({
  cards,
  setCards,
  settingsCard,
  selectedCards,
  setSelectedCards,
}) => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await cardService.getAll({
        params: { offset: '1', limit: '10' },
      });
      console.log(response);
      setCards(response.data);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  const showModal = async () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  return (
    <>
      <SearchBar
        showModal={showModal}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        form={form}
        fetchCards={fetchCards}
        settingsCard={settingsCard}
      />

      {loading ? (
        <Skeleton active />
      ) : (
        <CardsWrapper>
          {cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              fetchCards={fetchCards}
              selectedCards={selectedCards}
              setSelectedCards={setSelectedCards}
              settingsCard={settingsCard}
            />
          ))}
        </CardsWrapper>
      )}
    </>
  );
};

export default CardList;
