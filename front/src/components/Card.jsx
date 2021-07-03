import React, { useState } from 'react';
import { Card as AntCard, Radio, Tag } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { useLocation } from 'react-router';
const Card = ({ showModal }) => {
  const [radioText, setRadioText] = useState('');
  let location = useLocation();

  const handleClick = () => {
    if (location.pathname === '/settings') {
      return;
    } else {
      showModal();
    }
  };

  return (
    <AntCard
      style={{ minWidth: '16rem', maxWidth: '30rem' }}
      cover={
        <img
          alt="movement"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
      hoverable
      onClick={handleClick}
    >
      <Radio onChange={() => setRadioText('Correct')}>{radioText}</Radio>
      <Meta title="동작 이름" description={<Tag>카테고리</Tag>} />
    </AntCard>
  );
};

export default Card;
