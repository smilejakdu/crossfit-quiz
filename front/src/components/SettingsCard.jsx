import React, { useState } from 'react';
import { Card, Tag } from 'antd';
import Meta from 'antd/lib/card/Meta';
import styled from 'styled-components';
import SearchBar from './SearchBar';

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

const SettingsCard = ({ settingsCard }) => {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    console.log('check');
    if (selected) {
      setSelected(false);
    } else {
      setSelected(true);
    }
  };

  return (
    <>
      <ContentsWrapper>
        <h2>Answer Cards</h2>
        <SearchBar settingsCard={settingsCard} />
        <StyledCard
          cover={
            <img
              alt="movement"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
          }
          hoverable
          onClick={handleClick}
          selected={selected}
        >
          <Meta title="동작 이름" description={<Tag>카테고리</Tag>} />
        </StyledCard>
      </ContentsWrapper>
    </>
  );
};

export default SettingsCard;
