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
    try {
      let cardsArr = [];
      for await (const id of quiz.card_id) {
        const res = await cardService.get(id);
        cardsArr.push(res.data);
      }
      setSelectedCards(cardsArr);
    } catch (e) {
      console.log(e.message);
    }
  };

  const updateQuiz = async (values) => {
    const { title, answer } = values;
    if (isSaveClicked) {
      try {
        const res = await quizService.update({
          id: quiz.id,
          title,
          answer,
          card_id: selectedCards.map((card) => card.id),
        });
        console.log('퀴즈 수정', res.data);
      } catch (e) {
        console.log(e.message);
      }
      message.success('수정되었습니다.');
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
    <div>
      <Container
        style={{
          backgroundColor: 'var(--main-bg-color)',
        }}
      >
        <Form
          name="settings-form"
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
                <h3>({selectedCards.length}/4)개 선택</h3>
                <StyledButton type="primary" onClick={onSelectBtn}>
                  Select
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
                <Input placeholder="Title" allowClear style={{ width: 200 }} />
              </Form.Item>
              <h2 style={{ marginTop: '2rem' }}>Answer Cards</h2>
              <Button
                type="primary"
                ghost
                onClick={() => setSettingsCard(true)}
              >
                + Select Cards
              </Button>
              {selectedCards.length > 0 && (
                <Form.Item name="answer">
                  <Radio.Group onChange={onRadioChange} value={answer}>
                    <CardsWrapper>
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
              <h2>Select Answer Cards</h2>
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
    </div>
  );
};

export default EditSettings;
