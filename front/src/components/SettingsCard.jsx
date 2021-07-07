import React, { useState } from 'react';
import { Card, Tag } from 'antd';
import Meta from 'antd/lib/card/Meta';
import styled from 'styled-components';
import SearchBar from './SearchBar';
import CardList from './CardList';

const ContentsWrapper = styled.div`
  background-color: #fff;
  padding: 2rem;
`;
const StyledCard = styled(Card)`
  min-width: 16rem;
  max-width: 30rem;
  position: relative;
  box-shadow: ${(props) => props.selected && '4px 4px 15px 0px #383838'};
  top: ${(props) => props.selected && '2px'};
`;

const SettingsCard = ({ cards, setCards, setSettingsCard }) => {
  return (
    <>
      <ContentsWrapper>
        <h2>Answer Cards</h2>
        <CardList
          cards={cards}
          setCards={setCards}
          setSettingsCard={setSettingsCard}
        />
      </ContentsWrapper>
    </>
  );
};

export default SettingsCard;
