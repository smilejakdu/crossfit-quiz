import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  CalendarOutlined,
  CommentOutlined,
  SendOutlined,
} from '@ant-design/icons';
import { Card, Statistic, Avatar, message } from 'antd';

const QuizCard = ({ quiz, userObj }) => {
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
    cnt_correct_answer,
    cnt_total_answer,
  } = quiz;

  const handleClick = () => {
    if (!userObj) {
      message.warning('로그인을 해주세요.');
      return;
    } else if (google_id === userObj.google_id) {
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
        cnt_correct_answer > 0 &&
        cnt_total_answer > 0 && (
          <Statistic
            title="정답률"
            value={Math.round((cnt_correct_answer / cnt_total_answer) * 100)}
            suffix="%"
            valueStyle={{ color: '#cf1322' }}
          />
        )
      }
      onClick={handleClick}
    >
      <Statistic
        title="Submissions"
        value={`${cnt_total_answer > 0 ? cnt_total_answer : 0}명 참여`}
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
