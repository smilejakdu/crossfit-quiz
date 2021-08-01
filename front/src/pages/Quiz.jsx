import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Image, Button, Tooltip, message, Spin } from 'antd';
import { Container, LoadingWrapper } from '../globalStyles';
import { TitleWrapper } from '../styles/settings';
import { cardService } from '../service/cards';
import { MainWrapper, ImageWrapper, CardsWrapper } from '../styles/quiz';
import FinishScreen from '../components/FinishScreen';
import Header from '../components/Header';
import { baseURL } from '../service/config';
import { answerService } from '../service/answer';
const { Title } = Typography;

const Quiz = ({ userObj, setUserObj }) => {
  let location = useLocation();
  const quiz = location.state.quiz;
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showFinishScreen, setShowFinishScreen] = useState(false);
  const [selectedCard, setSelectedCard] = useState([]);
  const [answerCard, setAnswerCard] = useState([]);

  const { answer, id, title, cards_id1, cards_id2 } = quiz;

  useEffect(() => {
    fetchCardsById();
  }, []);

  useEffect(() => {
    setAnswerCard(cards[answer - 1]);
  }, [cards]);

  const fetchCardsById = async () => {
    try {
      const res1 = await cardService.get(cards_id1);
      const res2 = await cardService.get(cards_id2);
      let cardsArr = [res1.data[0], res2.data[0]];
      setCards(cardsArr);
    } catch (e) {
      console.log(e.message);
    }
    setLoading(false);
  };

  const handleSelect = (card) => {
    setSelectedCard(card);
  };

  const handleCheckAnswer = () => {
    if (selectedCard.length === 0) {
      message.warning('카드를 선택해주세요.');
      return;
    }
    setShowAnswer(true);
  };

  const handleFinish = () => {
    setShowFinishScreen(true);
    updateCorrectRate({
      users_id: userObj.id,
      quiz_id: id,
      answer: selectedCard === answerCard ? 1 : 0,
    });
  };

  const updateCorrectRate = async (data) => {
    setLoading(true);
    try {
      const res = await answerService.add(data);
      console.log('post 정답률 result : ', res);
    } catch (e) {
      console.log(e.message);
    }
    setLoading(false);
  };

  const handleRestart = () => {
    setSelectedCard([]);
    setShowAnswer(false);
    setShowFinishScreen(false);
  };

  return loading ? (
    <LoadingWrapper>
      <Spin />
    </LoadingWrapper>
  ) : showFinishScreen ? (
    <FinishScreen userObj={userObj} quiz={quiz} handleRestart={handleRestart} />
  ) : (
    <>
      <Header userObj={userObj} setUserObj={setUserObj} />
      <Container>
        <TitleWrapper>
          <Title level={2}>{title}</Title>
        </TitleWrapper>
        {showAnswer ? (
          <MainWrapper>
            <CardsWrapper>
              {cards.map((card) =>
                card === answerCard ? (
                  <Tooltip
                    placement="topLeft"
                    title="Correct!"
                    arrowPointAtCenter
                    color="lime"
                    visible={selectedCard === answerCard && true}
                  >
                    <ImageWrapper
                      backgroundColor="var(--blue-color)"
                      height="20rem"
                    >
                      <Title
                        style={{ color: '#ffffff', paddingBottom: '2rem' }}
                        level={4}
                      >
                        {card.title}
                      </Title>
                      <Image
                        key={card.id}
                        width={200}
                        preview={false}
                        src={`${baseURL}/${card.img_path}`}
                      />
                    </ImageWrapper>
                  </Tooltip>
                ) : (
                  <Tooltip
                    placement="topLeft"
                    title="Wrong!"
                    arrowPointAtCenter
                    color="red"
                    visible={
                      card === selectedCard &&
                      selectedCard !== answerCard &&
                      true
                    }
                  >
                    <ImageWrapper height="20rem">
                      <Title style={{ paddingBottom: '2rem' }} level={4}>
                        {card.title}
                      </Title>
                      <Image
                        key={card.id}
                        width={200}
                        preview={false}
                        src={`${baseURL}/${card.img_path}`}
                      />
                    </ImageWrapper>
                  </Tooltip>
                )
              )}
            </CardsWrapper>
            <Button type="primary" onClick={handleFinish}>
              Finish
            </Button>
          </MainWrapper>
        ) : (
          <MainWrapper>
            <CardsWrapper>
              {cards.map((card) =>
                card === selectedCard ? (
                  <Tooltip
                    placement="topLeft"
                    title="Select"
                    arrowPointAtCenter
                    color="#8176F5"
                    visible={true}
                  >
                    <ImageWrapper
                      justifyContent="center"
                      border="1px solid #8176F5"
                      onClick={() => handleSelect(card)}
                    >
                      <Image
                        key={card.id}
                        width={200}
                        preview={false}
                        src={`${baseURL}/${card.img_path}`}
                      />
                    </ImageWrapper>
                  </Tooltip>
                ) : (
                  <ImageWrapper
                    transform="scale(1.04)"
                    justifyContent="center"
                    onClick={() => handleSelect(card)}
                  >
                    <Image
                      key={card.id}
                      width={200}
                      preview={false}
                      src={`${baseURL}/${card.img_path}`}
                    />
                  </ImageWrapper>
                )
              )}
            </CardsWrapper>
            <Button type="primary" onClick={handleCheckAnswer}>
              정답 확인
            </Button>
          </MainWrapper>
        )}
      </Container>
    </>
  );
};

export default Quiz;
