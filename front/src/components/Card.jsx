import React, { useState } from 'react';
import { Card as AntCard, Radio, Tag } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { useLocation } from 'react-router';

const Card = ({ card, showModal, setSettingsCard, setCards }) => {
  let location = useLocation();
  const [radioText, setRadioText] = useState('');
  const { title, category, thumbnailUrl } = card;

  const handleClick = () => {
    if (location.pathname === '/settings') {
      // setCards(card);
      setSettingsCard(false);
      console.log(card);
    } else {
      showModal();
    }
  };

  return (
    <AntCard
      style={{ minWidth: '16rem', maxWidth: '30rem' }}
      cover={<img alt="movement" src={thumbnailUrl} />}
      hoverable
      onClick={handleClick}
    >
      <Radio onChange={() => setRadioText('Correct')}>{radioText}</Radio>
      <Meta title={title} description={category && <Tag>{category}</Tag>} />
    </AntCard>
  );
};

export default Card;
