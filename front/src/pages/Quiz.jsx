import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { quizService } from '../service/quizzes';
import { Typography, Image, Button, Tooltip } from 'antd';
import { Container } from '../globalStyles';
import { TitleWrapper } from '../styles/settings';
import { cardService } from '../service/cards';
import { MainWrapper, ImageWrapper, CardsWrapper } from '../styles/quiz';
const { Title } = Typography;

const Quiz = () => {
  let location = useLocation();
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState({});
  const [cards, setCards] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showFinishScreen, setShowFinishScreen] = useState(false);
  const [selectedCard, setSelectedCard] = useState([]);
  const [answerCard, setAnswerCard] = useState([]);

  const { answer, card_id, created_at, google_id, id, img_path, title } = quiz;

  useEffect(() => {
    fetchQuiz();
  }, []);

  useEffect(() => {
    setAnswerCard(cards[answer - 1]);
  }, [cards]);
  console.log('정답카드', answerCard);

  const fetchQuiz = async () => {
    setLoading(true);
    try {
      const quiz_id = location.pathname.substring(6, location.length);
      const res = await quizService.get(quiz_id);
      console.log(res.data.card_id);
      setQuiz(res.data);
      fetchCards(res.data.card_id);
    } catch (e) {
      console.log(e.message);
    }
    setLoading(false);
  };

  const fetchCards = async (card_id) => {
    setLoading(true);
    try {
      let cardsArr = [];
      for await (const id of card_id) {
        const res = await cardService.get(id);
        cardsArr.push(res.data);
      }
      console.log('cardsArr :', cardsArr);
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
    setShowAnswer(true);
  };

  const handleRestart = () => {
    setShowAnswer(false);
    setShowFinishScreen(false);
  };

  return loading ? (
    'loading..'
  ) : (
    <Container
      style={{
        backgroundColor: 'var(--main-bg-color)',
      }}
    >
      <TitleWrapper>
        <Title level={2}>{title}</Title>
      </TitleWrapper>
      {showAnswer ? (
        showFinishScreen ? (
          <MainWrapper>
            코멘트..........
            <Button type="primary" ghost onClick={handleRestart}>
              Restart Quiz
            </Button>
          </MainWrapper>
        ) : (
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
                    <ImageWrapper backgroundColor="var(--blue-color)">
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
                    <ImageWrapper>
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
        )
      ) : (
        <MainWrapper>
          <CardsWrapper>
            {cards.map((card) =>
              card === selectedCard ? (
                <Tooltip
                  placement="topLeft"
                  title="Select"
                  arrowPointAtCenter
                  color="purple"
                  visible={true}
                >
                  <ImageWrapper
                    border="1px solid purple"
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
  );
};

export default Quiz;
