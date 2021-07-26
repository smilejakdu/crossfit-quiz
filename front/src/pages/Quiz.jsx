import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Image, Button, Tooltip, message, Spin } from 'antd';
import { Container, LoadingWrapper } from '../globalStyles';
import { TitleWrapper } from '../styles/settings';
import { cardService } from '../service/cards';
import { MainWrapper, ImageWrapper, CardsWrapper } from '../styles/quiz';
import FinishScreen from '../components/FinishScreen';
import Header from '../components/Header';
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

  const { answer, card_id, created_at, users_id, id, img_path, title } = quiz;

  useEffect(() => {
    fetchCards();
  }, []);

  useEffect(() => {
    setAnswerCard(cards[answer - 1]);
  }, [cards]);

  const fetchCards = async () => {
    setLoading(true);
    try {
      let cardsArr = [];
      for await (const id of card_id) {
        const res = await cardService.get(id);
        cardsArr.push(res.data);
      }
      setCards(cardsArr);
    } catch (e) {
      console.log(e.message);
    }
    setLoading(false);
  };

  const handleSelect = (card) => {
    setSelectedCard(card);
    console.log('클릭', card);
  };

  const handleCheckAnswer = () => {
    if (selectedCard.length === 0) {
      message.warning('정답을 선택해주세요.');
      return;
    }
    setShowAnswer(true);
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
    <FinishScreen userObj={userObj} quizId={id} handleRestart={handleRestart} />
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
                      height="18rem"
                    >
                      <Title style={{ color: '#ffffff' }} level={4}>
                        {card.title}
                      </Title>
                      <Image
                        key={card.id}
                        width={200}
                        preview={false}
                        src={card.img_path}
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
                    <ImageWrapper height="18rem">
                      <Title level={4}>{card.title}</Title>
                      <Image
                        key={card.id}
                        width={200}
                        preview={false}
                        src={card.img_path}
                      />
                    </ImageWrapper>
                  </Tooltip>
                )
              )}
            </CardsWrapper>
            <Button type="primary" onClick={() => setShowFinishScreen(true)}>
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
                        src={card.img_path}
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
                      src={card.img_path}
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
