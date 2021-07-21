import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  CalendarOutlined,
  CommentOutlined,
  SendOutlined,
} from '@ant-design/icons';
import { Card, Statistic, Avatar } from 'antd';
import { currentUserId } from '../constants';

const QuizCard = ({ quiz, fetchQuizzes }) => {
  let history = useHistory();
  const {
    id,
    title,
    answer,
    created_at,
    google_id,
    username,
    img_path,
    card_id,
  } = quiz;

  const handleClick = () => {
    if (google_id === currentUserId) {
      history.push({
        pathname: `/settings/${id}`,
        state: { quiz },
      });
    } else {
      history.push(`/quiz/${id}`);
    }
  };

  return (
    <Card
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin: '1rem',
      }}
      hoverable
      title={<Statistic title="What is" value={title} />}
      extra={
        <Statistic
          title="정답률"
          value={93}
          suffix="%"
          valueStyle={{ color: '#cf1322' }}
        />
      }
      onClick={handleClick}
    >
      <Statistic
        title="Submissions"
        value={`?명 참여`}
        prefix={<SendOutlined />}
      />
      <Statistic
        title="Created At"
        value={created_at}
        prefix={<CalendarOutlined />}
      />
      <Statistic
        title="Created By"
        value={username}
        prefix={<Avatar src={img_path} />}
      />
      <Statistic title="Comments" value={20} prefix={<CommentOutlined />} />
    </Card>
  );
};

export default QuizCard;
