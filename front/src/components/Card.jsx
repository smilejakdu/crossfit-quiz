import React, { useState } from 'react';
import { Card as AntCard, Radio, Tag } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { useLocation } from 'react-router';
<<<<<<< HEAD

const Card = ({ card, showModal, setSettingsCard, setCards }) => {
  let location = useLocation();
  const [radioText, setRadioText] = useState('');
  const { title, category, thumbnailUrl } = card;

  const handleClick = () => {
    if (location.pathname === '/settings') {
      // setCards(card);
      setSettingsCard(false);
      console.log(card);
=======
const Card = ({ showModal }) => {
  const [radioText, setRadioText] = useState('');
  let location = useLocation();

  const handleClick = () => {
    if (location.pathname === '/settings') {
      return;
>>>>>>> 6f82ad49c15c779fdff7d2b0f70c339742a377b5
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
<<<<<<< HEAD
      <Meta title={title} description={category && <Tag>{category}</Tag>} />
=======
      <Meta title="동작 이름" description={<Tag>카테고리</Tag>} />
>>>>>>> 6f82ad49c15c779fdff7d2b0f70c339742a377b5
    </AntCard>
  );
};

export default Card;
