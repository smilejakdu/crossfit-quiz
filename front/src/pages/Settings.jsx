import { Button, Input, message, Popconfirm, Form, Radio } from 'antd';
import React, { useState } from 'react';
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
const { Search } = Input;

const Settings = ({ cards, setCards }) => {
  const [showViewBtn, setShowViewBtn] = useState(false);
  const [settingsCard, setSettingsCard] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const [value, setValue] = useState(1);

  const onRadioChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  function confirm(e) {
    console.log(e);
    message.success('Click on Yes');
  }

  const addQuiz = async (values) => {
    if (selectedCards.length < 2) {
      message.warning('카드를 2개 이상 선택해주세요.');
      return;
    }
    console.log(values);
    // const {title} = values;

    // try {
    //   const res = await quizService.add({title, answer, id});
    //   console.log(res);
    // } catch (e) {
    //   console.log(e.message);
    // }
    // await fetchCards();
  };

  const onSearch = (value) => console.log(value);

  const onSelectBtn = () => {
    setSettingsCard(false);
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
          onFinish={addQuiz}
          initialValues={{ answer: 1 }}
        >
          <TitleWrapper>
            <h1>Settings</h1>
            {!settingsCard ? (
              <ButtonWrapper>
                <Popconfirm
                  title="Are you sure to delete this task?"
                  onConfirm={confirm}
                  okText="Yes"
                  cancelText="No"
                >
                  <StyledButton danger>Delete</StyledButton>
                </Popconfirm>

                {showViewBtn && (
                  <StyledButton type="primary" ghost>
                    View
                  </StyledButton>
                )}
                <StyledButton type="primary" htmlType="submit">
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
                <Search
                  placeholder="Search"
                  allowClear
                  onSearch={onSearch}
                  style={{ width: 200 }}
                />
              </Form.Item>
              <h2 style={{ marginTop: '2rem' }}>Answer Cards</h2>
              <Button
                type="primary"
                ghost
                onClick={() => setSettingsCard(true)}
              >
                + Add Cards
              </Button>
              {selectedCards.length > 0 && (
                <Form.Item name="answer">
                  <Radio.Group onChange={onRadioChange} defaultValue={1}>
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

export default Settings;
