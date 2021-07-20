import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  CalendarOutlined,
  CommentOutlined,
  SendOutlined,
} from '@ant-design/icons';
import { Card, Statistic, Avatar } from 'antd';

const QuizCard = ({ quiz, fetchQuizzes }) => {
  let history = useHistory();
  const { id, title, answer, created_at, google_id, card_id } = quiz;

  const handleClick = () => {
    const { google_id: currentUserId } = JSON.parse(
      window.localStorage.getItem('userObj')
    );
    console.log('userobj', JSON.parse(window.localStorage.getItem('userObj')));
    // if (google_id === currentUserId) {
    //   history.push('/settings');
    // } else {
    history.push(`/quiz/${id}`);
    // }
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
      <Statistic title="Created By" value={google_id} prefix={<Avatar />} />
      <Statistic title="Comments" value={20} prefix={<CommentOutlined />} />
    </Card>
  );
};

export default QuizCard;
