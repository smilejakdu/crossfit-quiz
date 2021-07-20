import React, { useEffect, useState } from 'react';
import { Empty, Form, Skeleton } from 'antd';
import Card from './Card';
import SearchBar from './SearchBar';
import { cardService } from '../service/cards';
import { CardsWrapper, EmptyWrapper } from '../globalStyles';

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
  const [allCards, setAllCards] = useState([]);
  const [currentUserId, setCurrentUserId] = useState('');
  const [tagIds, setTagIds] = useState([]);
  const [myCardsChecked, setMyCardsChecked] = useState(false);
  const [titleSearched, setTitleSearched] = useState('');

  useEffect(() => {
    fetchCards();
    fetchAllCards();
    setCurrentUserId(
      JSON.parse(window.localStorage.getItem('userObj')).google_id
    );
  }, []);
  useEffect(() => {
    filterCards();
  }, [tagIds, myCardsChecked, titleSearched]);

  const fetchCards = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await cardService.getAll({
        params: { offset: '1', limit: '10' },
      });
      setCards(response.data);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  const fetchAllCards = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await cardService.getAll();
      setAllCards(response.data);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  const searchByTitle = async (value) => {
    setError(null);
    setLoading(true);
    try {
      let searchResult = [];
      if (!value) {
        searchResult = allCards;
        setTitleSearched('');
      } else {
        searchResult = allCards.filter((card) =>
          card.title.toLowerCase().includes(value)
        );
        setTitleSearched(searchResult);
      }
      setCards(searchResult);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  const filterCards = () => {
    let searchResult = [];
    if (myCardsChecked && tagIds.length > 0) {
      searchResult = (titleSearched ? titleSearched : allCards).filter(
        (card) =>
          card.google_id === currentUserId && tagIds.includes(card.category_id)
      );
    } else if (myCardsChecked && tagIds.length === 0) {
      searchResult = (titleSearched ? titleSearched : allCards).filter(
        (card) => card.google_id === currentUserId
      );
    } else if (!myCardsChecked && tagIds.length > 0) {
      searchResult = (titleSearched ? titleSearched : allCards).filter((card) =>
        tagIds.includes(card.category_id)
      );
    } else {
      searchResult = titleSearched ? titleSearched : allCards;
    }
    setCards(searchResult);
  };

  const filterByCategory = async (idArr) => {
    setError(null);
    setLoading(true);
    try {
      setTagIds(idArr);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  const filterByUser = async (e) => {
    setError(null);
    setLoading(true);
    try {
      if (e.target.checked) {
        setMyCardsChecked(true);
      } else {
        setMyCardsChecked(false);
      }
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
        searchByTitle={searchByTitle}
        filterByCategory={filterByCategory}
        filterByUser={filterByUser}
      />

      {loading ? (
        <Skeleton active />
      ) : cards.length === 0 ? (
        <EmptyWrapper>
          <Empty description="검색 결과가 없습니다." />
        </EmptyWrapper>
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
