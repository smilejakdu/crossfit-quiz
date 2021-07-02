import React, { useState } from 'react';
import { Card as AntCard, Radio, Tag } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { useLocation } from 'react-router';

const Card = ({ showModal }) => {
  let location = useLocation();
  const [radioText, setRadioText] = useState('');

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
      onClick={showModal}
    >
      {location.pathname === '/settings' && (
        <Radio onChange={() => setRadioText('Correct')}>{radioText}</Radio>
      )}
      <Meta title="동작 이름" description={<Tag>카테고리</Tag>} />
    </AntCard>
  );
};

export default Card;
