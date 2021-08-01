import { Button, Input, Popconfirm, Form, Radio, message } from 'antd';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Card from '../components/Card';
import CardList from '../components/CardList';
import { CardsWrapper, Container } from '../globalStyles';
import { cardService } from '../service/cards';
import { quizService } from '../service/quizzes';
import {
  ButtonWrapper,
  SettingsCard,
  SettingsMain,
  StyledButton,
  StyledRadio,
  TitleWrapper,
} from '../styles/settings';

const EditSettings = ({ cards, setCards }) => {
  let history = useHistory();
  let location = useLocation();
  const quiz = location.state.quiz;
  const [settingsCard, setSettingsCard] = useState(false);
  const [answer, setAnswer] = useState(null);
  const [selectedCards, setSelectedCards] = useState([]);
  const [isSaveClicked, setIsSaveClicked] = useState(false);

  useEffect(() => {
    fetchSelectedCards();
  }, []);

  const onRadioChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleViewBtn = () => {
    history.push({ pathname: `/quiz/${quiz.id}`, state: { quiz } });
  };

  const onSelectBtn = () => {
    setSettingsCard(false);
  };

  const fetchSelectedCards = async () => {
    const { cards_id1, cards_id2 } = quiz;
    console.log('cards_id1 : ', cards_id1);
    console.log('cards_id2 : ', cards_id2);
    try {
      const res1 = await cardService.get(cards_id1);
      const res2 = await cardService.get(cards_id2);
      let cardsArr = [res1.data[0], res2.data[0]];
      setSelectedCards(cardsArr);
    } catch (e) {
      console.log(e.message);
    }
  };

  const updateQuiz = async (values) => {
    const { title, answer } = values;
    if (selectedCards.length < 2) {
      message.warning('카드를 2장 선택해주세요.');
      return;
    }
    if (isSaveClicked) {
      try {
        const selectedIds = selectedCards.map((card) => card.id);
        const res = await quizService.update({
          id: quiz.id,
          title,
          answer,
          cards_id1: selectedIds[0],
          cards_id2: selectedIds[1],
        });
        console.log('퀴즈 수정', res.data);
      } catch (e) {
        console.log(e.message);
      }
      message.success('수정되었습니다.');
      history.push('/');
    }
  };

  const deleteQuiz = async () => {
    try {
      await quizService.remove(quiz.id);
    } catch (e) {
      console.log(e.message);
    }
    message.success('삭제되었습니다.');
    history.push('/');
  };

  return (
    <Container>
      <Form
        initialValues={{ title: quiz.title, answer: quiz.answer }}
        onFinish={updateQuiz}
      >
        <TitleWrapper>
          <h1>Settings</h1>
          {!settingsCard ? (
            <ButtonWrapper>
              <Popconfirm
                title="삭제하시겠습니까?"
                onConfirm={deleteQuiz}
                okText="Yes"
                cancelText="No"
              >
                <StyledButton danger>Delete</StyledButton>
              </Popconfirm>
              <StyledButton type="primary" ghost onClick={handleViewBtn}>
                View
              </StyledButton>

              <StyledButton
                type="primary"
                htmlType="submit"
                onClick={() => setIsSaveClicked(true)}
              >
                Save
              </StyledButton>
            </ButtonWrapper>
          ) : (
            <ButtonWrapper>
              <StyledButton type="primary" onClick={onSelectBtn}>
                {selectedCards.length > 0
                  ? `(${selectedCards.length}/2)개 Select`
                  : 'Back'}
              </StyledButton>
            </ButtonWrapper>
          )}
        </TitleWrapper>
        {!settingsCard ? (
          <SettingsMain>
            <h2>Question</h2>
            <Form.Item
              name="title"
              rules={[
                {
                  required: true,
                  message: '질문을 입력해주세요.',
                },
              ]}
            >
              <Input
                onKeyDown={(e) => (e.key === 'Enter' ? e.preventDefault() : '')}
                placeholder="Title"
                allowClear
                style={{ width: 200 }}
              />
            </Form.Item>
            <h2 style={{ marginTop: '2rem' }}>Answer Cards</h2>
            <Button type="primary" ghost onClick={() => setSettingsCard(true)}>
              + Edit Cards
            </Button>
            {selectedCards.length > 0 && (
              <Form.Item name="answer">
                <Radio.Group onChange={onRadioChange} value={answer}>
                  <CardsWrapper margin="1vw 0">
                    {selectedCards.map((card, i) => (
                      <StyledRadio key={card.id} value={i + 1}>
                        Correct
                        <Card
                          key={card.id}
                          card={card}
                          settingsCard={settingsCard}
                          selectedCards={selectedCards}
                          setSelectedCards={setSelectedCards}
                        />
                      </StyledRadio>
                    ))}
                  </CardsWrapper>
                </Radio.Group>
              </Form.Item>
            )}
          </SettingsMain>
        ) : (
          <SettingsCard>
            <CardList
              cards={cards}
              setCards={setCards}
              settingsCard={settingsCard}
              setSettingsCard={setSettingsCard}
              selectedCards={selectedCards}
              setSelectedCards={setSelectedCards}
            />
          </SettingsCard>
        )}
      </Form>
    </Container>
  );
};

export default EditSettings;
