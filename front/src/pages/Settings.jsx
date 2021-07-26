import { Button, Input, message, Form, Radio } from 'antd';
import React, { useState } from 'react';
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
  const [quiz, setQuiz] = useState([]);
  let history = useHistory();
  const { id, name, img_path } = userObj;

  const onRadioChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleViewBtn = () => {
    history.push({
      pathname: `/quiz/${quiz.id}`,
      state: { quiz },
    });
  };

  const addQuiz = async (values) => {
    const { title, answer } = values;
    console.log(values);
    if (selectedCards.length < 2) {
      message.warning('카드를 2개 이상 선택해주세요.');
      return;
    }
    if (isSaveClicked) {
      try {
        const card_id = selectedCards.map((card) => card.id);
        const res = await quizService.add({
          users_id: id,
          name,
          img_path,
          title,
          answer,
          card_id,
        });
        setQuiz(res.data);
      } catch (e) {
        console.log(e.message);
      }
      message.success('퀴즈를 만들었습니다!');
      setShowViewBtn(true);
      setIsSaveClicked(false);
    }
  };

  const onSelectBtn = () => {
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
              <h3>({selectedCards.length}/4)개 선택</h3>
              <StyledButton type="primary" onClick={onSelectBtn}>
                {selectedCards.length > 0 ? 'Select' : 'Back'}
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
                  <CardsWrapper>
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
