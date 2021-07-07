import { Button, Input, message, Popconfirm, Form } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import Card from '../components/Card';
import Header from '../components/Header';
import SettingsCard from '../components/SettingsCard';
<<<<<<< HEAD
import { Container } from '../globalStyles';
=======
import { CardsWrapper, Container } from '../globalStyles';
>>>>>>> 6f82ad49c15c779fdff7d2b0f70c339742a377b5
const { Search } = Input;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 5rem;
`;
const ButtonWrapper = styled.div`
  display: flex;
`;
const StyledButton = styled(Button)`
  margin-left: 0.5rem;
`;
const ContentsWrapper = styled.div`
  background-color: #fff;
  padding: 2rem;
`;

const Settings = ({ cards, setCards, userObj, setUserObj }) => {
  const [showViewBtn, setShowViewBtn] = useState(false);
  const [settingsCard, setSettingsCard] = useState(false);

  function confirm(e) {
    console.log(e);
    message.success('Click on Yes');
  }

  function cancel(e) {
    console.log(e);
    message.error('Click on No');
  }

  const handleSave = (values) => {
    console.log(values);
  };

  const onSearch = (value) => console.log(value);

  const handleSelect = () => {
    setSettingsCard(false);
  };

  return (
    <div>
      <Header userObj={userObj} setUserObj={setUserObj} />
      <Container
        style={{
          backgroundColor: 'var(--main-bg-color)',
        }}
      >
        <Form name="settings-form" onFinish={handleSave}>
          <TitleWrapper>
            <h1>Settings</h1>
            {!settingsCard ? (
              <ButtonWrapper>
                <Form.Item>
                  <Popconfirm
                    title="Are you sure to delete this task?"
                    onConfirm={confirm}
                    onCancel={cancel}
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
                  <StyledButton
                    type="primary"
                    htmlType="submit"
                    onClick={() => setShowViewBtn(true)}
                  >
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
            <ContentsWrapper>
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
              <Form.Item name="cards">
                <CardsWrapper>
<<<<<<< HEAD
                  {cards.map((card) => (
                    <Card
                      key={card.id}
                      card={card}
                      setCards={setCards}
                      setSettingsCard={setSettingsCard}
                    />
                  ))}
=======
                  <Card />
                  <Card />
                  <Card />
                  <Card />
>>>>>>> 6f82ad49c15c779fdff7d2b0f70c339742a377b5
                </CardsWrapper>
              </Form.Item>
            </ContentsWrapper>
          ) : (
<<<<<<< HEAD
            <SettingsCard
              cards={cards}
              setCards={setCards}
              setSettingsCard={setSettingsCard}
            />
=======
            <SettingsCard settingsCard={settingsCard} />
>>>>>>> 6f82ad49c15c779fdff7d2b0f70c339742a377b5
          )}
        </Form>
      </Container>
    </div>
  );
};

export default Settings;
