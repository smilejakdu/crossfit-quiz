import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  CalendarOutlined,
  CommentOutlined,
  SendOutlined,
} from '@ant-design/icons';
import { Statistic, Avatar, message } from 'antd';
import { StyledCard } from '../styles/card';

const QuizCard = ({ quiz, userObj }) => {
  let history = useHistory();
  const {
    id,
    title,
    answer,
    created_at,
    users_id,
    name,
    img_path,
    card_id,
    cnt_correct_answer,
    cnt_total_answer,
  } = quiz;

  const handleClick = () => {
    if (!userObj) {
      message.warning('로그인을 해주세요.');
      return;
    } else if (users_id === userObj.id) {
      history.push({
        pathname: `/settings/${id}`,
        state: { quiz },
      });
    } else {
      history.push({
        pathname: `/quiz/${id}`,
        state: { quiz },
      });
    }
  };

  return (
    <StyledCard
      hoverable
      title={
        <Statistic
          title="What is"
          value={title}
          valueStyle={{ fontSize: '1.1rem', marginRight: '2rem' }}
        />
      }
      extra={
        cnt_correct_answer > 0 &&
        cnt_total_answer > 0 && (
          <Statistic
            valueStyle={{ fontSize: '1.1rem', color: '#cf1322' }}
            title="정답률"
            value={Math.round((cnt_correct_answer / cnt_total_answer) * 100)}
            suffix="%"
          />
        )
      }
      onClick={handleClick}
    >
      <Statistic
        title="Submissions"
        value={`${cnt_total_answer > 0 ? cnt_total_answer : 0}명 참여`}
        prefix={<SendOutlined />}
        valueStyle={{ fontSize: '0.9rem' }}
      />
      <Statistic
        title="Created At"
        value={created_at}
        prefix={<CalendarOutlined />}
        valueStyle={{ fontSize: '0.9rem' }}
      />
      <Statistic
        title="Created By"
        value={name}
        prefix={<Avatar src={img_path} />}
        valueStyle={{ fontSize: '0.9rem' }}
      />
      <Statistic
        title="Comments"
        value={20}
        prefix={<CommentOutlined />}
        valueStyle={{ fontSize: '0.9rem' }}
      />
    </StyledCard>
  );
};

export default QuizCard;
