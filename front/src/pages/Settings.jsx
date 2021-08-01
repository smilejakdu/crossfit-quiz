import { LeftOutlined } from '@ant-design/icons';
import { Button, Input, message, Form, Radio } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '../components/Card';
import CardList from '../components/CardList';
import { CardsWrapper, Container } from '../globalStyles';
import { quizService } from '../service/quizzes';
import {
  ButtonWrapper,
  SettingsCard,
  SettingsMain,
  StyledButton,
  StyledRadio,
  TitleWrapper,
} from '../styles/settings';

const Settings = ({ cards, setCards, userObj }) => {
  const [form] = Form.useForm();
  const [showViewBtn, setShowViewBtn] = useState(false);
  const [settingsCard, setSettingsCard] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const [answer, setAnswer] = useState(1);
  const [isSaveClicked, setIsSaveClicked] = useState(false);
  const [quizId, setQuizId] = useState(0);
  const [quiz, setQuiz] = useState({});
  let history = useHistory();

  useEffect(() => {
    setCards([]);
  }, [settingsCard]);

  useEffect(() => {
    fetchQuizzes();
  }, [quizId]);

  useEffect(() => {
    if (quizId !== 0) setShowViewBtn(true);
  }, [quiz]);

  const onRadioChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleViewBtn = () => {
    history.push({
      pathname: `/quiz/${quizId}`,
      state: { quiz },
    });
  };

  const addQuiz = async (values) => {
    const { title, answer } = values;
    console.log(values);
    if (selectedCards.length < 2) {
      message.warning('카드를 2장 선택해주세요.');
      return;
    }
    if (isSaveClicked) {
      try {
        const selectedIds = selectedCards.map((card) => card.id);
        const res = await quizService.add({
          users_id: userObj.id,
          title,
          answer,
          cards_id1: selectedIds[0],
          cards_id2: selectedIds[1],
        });
        console.log('post quiz result : ', res);
        setQuizId(res.data.quiz_id);
      } catch (e) {
        console.log(e.message);
      }
      message.success('퀴즈를 만들었습니다!');
      setIsSaveClicked(false);
    }
  };

  const fetchQuizzes = async () => {
    try {
      const res = await quizService.getAll();
      const addedQuiz = res.data.result.filter((quiz) => quiz.id === quizId);
      console.log('added', addedQuiz);
      setQuiz(...addedQuiz);
    } catch (e) {
      console.log(e.message);
    }
  };

  const onBackToSettingsMain = () => {
    setSettingsCard(false);
  };

  return (
    <Container>
      <Form initialValues={{ answer: 1 }} onFinish={addQuiz} form={form}>
        <TitleWrapper>
          <h1>Settings</h1>
          {!settingsCard ? (
            <ButtonWrapper>
              {showViewBtn && (
                <StyledButton type="primary" ghost onClick={handleViewBtn}>
                  View
                </StyledButton>
              )}
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
              <StyledButton type="primary" onClick={onBackToSettingsMain}>
                <LeftOutlined />
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
              + Select Cards
            </Button>
            {selectedCards.length > 0 && (
              <Form.Item
                name="answer"
                rules={[
                  {
                    required: true,
                    message: '카드를 선택해주세요.',
                  },
                ]}
              >
                <Radio.Group onChange={onRadioChange} value={answer}>
                  <CardsWrapper margin="1vw 0">
                    {selectedCards.map((card, i) => (
                      <StyledRadio value={i + 1}>
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

export default Settings;
