import { Button, Input, message, Popconfirm, Form } from 'antd';
import React, { useState } from 'react';
import Card from '../components/Card';
import CardList from '../components/CardList';
import { CardsWrapper, Container } from '../globalStyles';
import {
  ButtonWrapper,
  SettingsCard,
  SettingsMain,
  StyledButton,
  TitleWrapper,
} from '../styles/settings';
const { Search } = Input;

const Settings = ({ cards, setCards, userObj, setUserObj }) => {
  const [showViewBtn, setShowViewBtn] = useState(false);
  const [settingsCard, setSettingsCard] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);

  // useEffect(() => {
  //   console.log('selectedCards ? ', selectedCards);
  //   console.log(settingsCard);
  // }, []);

  function confirm(e) {
    console.log(e);
    message.success('Click on Yes');
  }

  const addQuiz = (values) => {
    console.log(values);
    setShowViewBtn(true);
  };

  const onSearch = (value) => console.log(value);

  const handleSelect = () => {
    setSettingsCard(false);
  };

  return (
    <div>
      <Container
        style={{
          backgroundColor: 'var(--main-bg-color)',
        }}
      >
        <Form name="settings-form" onFinish={addQuiz}>
          <TitleWrapper>
            <h1>Settings</h1>
            {!settingsCard ? (
              <ButtonWrapper>
                <Form.Item>
                  <Popconfirm
                    title="Are you sure to delete this task?"
                    onConfirm={confirm}
                    okText="Yes"
                    cancelText="No"
                  >
                    <StyledButton danger>Delete</StyledButton>
                  </Popconfirm>
                </Form.Item>
                {showViewBtn && (
                  <Form.Item>
                    <StyledButton type="primary" ghost>
                      View
                    </StyledButton>
                  </Form.Item>
                )}
                <Form.Item>
                  <StyledButton type="primary" htmlType="submit">
                    Save
                  </StyledButton>
                </Form.Item>
              </ButtonWrapper>
            ) : (
              <ButtonWrapper>
                <Form.Item>
                  <StyledButton
                    type="primary"
                    htmlType="submit"
                    onClick={handleSelect}
                  >
                    Select
                  </StyledButton>
                </Form.Item>
              </ButtonWrapper>
            )}
          </TitleWrapper>
          {!settingsCard ? (
            <SettingsMain>
              <h2>Question</h2>
              <Form.Item
                name="question"
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
                <Form.Item name="cards">
                  <CardsWrapper>
                    {selectedCards.map((card) => (
                      <Card
                        key={card.id}
                        card={card}
                        settingsCard={settingsCard}
                        selectedCards={selectedCards}
                        setSelectedCards={setSelectedCards}
                      />
                    ))}
                  </CardsWrapper>
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
