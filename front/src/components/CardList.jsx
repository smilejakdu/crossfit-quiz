import React, { useEffect, useState } from 'react';
import { Empty, Form, message, Skeleton } from 'antd';
import Card from './Card';
import SearchBar from './SearchBar';
import { cardService } from '../service/cards';
import { CardsWrapper, EmptyWrapper, SkeletonWrapper } from '../globalStyles';
import InfiniteScroll from 'react-infinite-scroll-component';

const CardList = ({
  cards,
  setCards,
  settingsCard,
  selectedCards,
  setSelectedCards,
  userObj,
}) => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allCards, setAllCards] = useState([]);
  const [tagIds, setTagIds] = useState([]);
  const [myCardsChecked, setMyCardsChecked] = useState(false);
  const [titleSearched, setTitleSearched] = useState('');
  const [showAllBtn, setShowAllBtn] = useState(false);
  const [start, setStart] = useState(0);
  const count = 10;

  useEffect(() => {
    fetchCards();
  }, []);

  useEffect(() => {
    const sorted = allCards.reverse();
    setCards(sorted);
  }, [allCards]);

  useEffect(() => {
    filterCards();
  }, [tagIds, myCardsChecked, titleSearched]);

  const fetchCards = async () => {
    setLoading(true);
    try {
      const res = await cardService.getAll();
      console.log('get cards result', res);
      setAllCards(res.data.result);
      let arr = [];
      for (
        let i = start;
        i < Math.min(start + count, res.data.result.length);
        i++
      ) {
        arr.push(res.data.result[i]);
      }
      setCards(cards.concat(arr));
      setStart(start + count);
    } catch (e) {
      console.log(e.message);
    }
    setLoading(false);
  };

  const searchByTitle = async (value) => {
    setShowAllBtn(true);
    setLoading(true);
    try {
      let searchResult = [];
      if (!value) {
        searchResult = allCards;
        setTitleSearched('');
        setShowAllBtn(false);
      } else {
        searchResult = allCards.filter((card) =>
          card.title.toLowerCase().includes(value)
        );
        setTitleSearched(searchResult);
      }
      setCards(searchResult);
    } catch (e) {
      console.log(e.message);
    }
    setLoading(false);
  };

  const filterCards = () => {
    let searchResult = [];
    if (myCardsChecked && tagIds.length > 0) {
      searchResult = (titleSearched ? titleSearched : allCards).filter(
        (card) =>
          card.users_id === userObj.id && tagIds.includes(card.category_id)
      );
    } else if (myCardsChecked && tagIds.length === 0) {
      searchResult = (titleSearched ? titleSearched : allCards).filter(
        (card) => card.users_id === userObj.id
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
    setLoading(true);
    try {
      setTagIds(idArr);
    } catch (e) {
      console.log(e.message);
    }
    setLoading(false);
  };

  const filterByUser = async (e) => {
    setLoading(true);
    try {
      if (e.target.checked) {
        setMyCardsChecked(true);
      } else {
        setMyCardsChecked(false);
      }
    } catch (e) {
      console.log(e.message);
    }
    setLoading(false);
  };

  const resetFilter = () => {
    setShowAllBtn(false);
    setCards(allCards);
  };

  const showModal = async () => {
    if (!userObj) {
      message.warning('로그인을 해주세요.');
      return;
    }
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
        userObj={userObj}
        resetFilter={resetFilter}
        showAllBtn={showAllBtn}
      />

      {cards.length === 0 ? (
        loading ? (
          <SkeletonWrapper>
            <Skeleton active />
          </SkeletonWrapper>
        ) : (
          <EmptyWrapper>
            <Empty description="검색 결과가 없습니다." />
          </EmptyWrapper>
        )
      ) : (
        <InfiniteScroll
          dataLength={cards.length}
          next={fetchCards}
          hasMore={true}
        >
          <CardsWrapper>
            {cards.map((card) => (
              <Card
                key={card.id}
                card={card}
                fetchCards={fetchCards}
                selectedCards={selectedCards}
                setSelectedCards={setSelectedCards}
                settingsCard={settingsCard}
                userObj={userObj}
              />
            ))}
          </CardsWrapper>
        </InfiniteScroll>
      )}
    </>
  );
};

export default CardList;
