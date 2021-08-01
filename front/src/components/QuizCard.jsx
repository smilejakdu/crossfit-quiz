import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  CalendarOutlined,
  CommentOutlined,
  SendOutlined,
} from '@ant-design/icons';
import { Statistic, Avatar, message } from 'antd';
import { userService } from '../service/users';
import { StyledCard } from '../styles/quizCard';

const QuizCard = ({ quiz, userObj }) => {
  let history = useHistory();
  const {
    answer,
    cnt_correct_answer,
    cnt_total_answer,
    comment_cnt,
    created_at,
    id,
    title,
    users_id,
  } = quiz;
  const date = created_at.slice(0, 10);
  const [author, setAuthor] = useState({});

  useEffect(() => {
    getAuthor();
  }, []);

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

  const getAuthor = async () => {
    try {
      const res = await userService.get(users_id);
      setAuthor(res.data.result[0]);
    } catch (e) {
      console.log(e.message);
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
        cnt_total_answer ? (
          <Statistic
            valueStyle={{ fontSize: '1.1rem', color: '#cf1322' }}
            title="정답률"
            value={Math.round((cnt_correct_answer / cnt_total_answer) * 100)}
            suffix="%"
          />
        ) : (
          <></>
        )
      }
      onClick={handleClick}
    >
      <Statistic
        title="Submissions"
        value={`${cnt_total_answer ? cnt_total_answer : 0}명 참여`}
        prefix={<SendOutlined />}
        valueStyle={{ fontSize: '0.9rem' }}
      />
      <Statistic
        title="Created At"
        value={date}
        prefix={<CalendarOutlined />}
        valueStyle={{ fontSize: '0.9rem' }}
      />
      {/* <Statistic
        title="Created By"
        value={author.name}
        prefix={<Avatar src={author.img_path} />}
        valueStyle={{ fontSize: '0.9rem' }}
      /> */}
      <Statistic
        title="Comments"
        value={comment_cnt}
        prefix={<CommentOutlined />}
        valueStyle={{ fontSize: '0.9rem' }}
      />
    </StyledCard>
  );
};

export default QuizCard;
