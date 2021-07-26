import React, { useEffect, useState } from 'react';
import { Comment, Drawer, message, Spin } from 'antd';
import CommentForm from './CommentForm.jsx';
import CommentList from './CommentList.jsx';
import { commentService } from '../service/comments.js';
import { LoadingWrapper } from '../globalStyles.js';
import { userService } from '../service/users.js';
import {
  CommentsWrapper,
  ContentsWrapper,
  Background,
  Section,
  FinishText,
  StyledButton,
  CommentBtn,
} from '../styles/finishScreen.js';
import Avatar from 'antd/lib/avatar/avatar';
import { quizService } from '../service/quizzes.js';
import { Link } from 'react-router-dom';
import { CommentOutlined } from '@ant-design/icons';

const FinishScreen = ({ userObj, quizId, handleRestart }) => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [comments, setComments] = useState([]);
  const [quiz, setQuiz] = useState({});
  const {
    answer,
    card_id,
    created_at,
    users_id,
    name,
    img_path,
    id,
    title,
    cnt_correct_answer,
    cnt_total_answer,
  } = quiz;

  useEffect(() => {
    fetchQuizById();
    fetchComments();
  }, []);

  const fetchQuizById = async () => {
    setLoading(true);
    try {
      const res = await quizService.get(quizId);
      setQuiz(res.data);
    } catch (e) {
      console.log(e.message);
    }
    setLoading(false);
  };

  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await commentService.getAll();
      const comments = response.data;
      fetchCommentAuthor(comments);
    } catch (e) {
      console.log(e.message);
    }
    setLoading(false);
  };

  const fetchCommentAuthor = async (comments) => {
    setLoading(true);
    try {
      let newComments = [];
      for (let i = 0; i < comments.length; i++) {
        const response = await userService.get(comments[i].users_id);
        const authorObj = {
          name: response.data.name,
          img_path: response.data.img_path,
        };
        newComments.push({ ...comments[i], ...authorObj });
      }
      setComments(newComments);
    } catch (e) {
      console.log(e.message);
    }
    setLoading(false);
  };

  const addComment = async (input) => {
    const { content } = input;
    try {
      const commentObj = {
        quiz_id: quiz.id,
        users_id: userObj.id,
        content,
      };
      const res = await commentService.add(commentObj);
      console.log(res);
    } catch (e) {
      console.log(e.message);
    }
    await fetchComments();
    message.success('작성되었습니다.');
  };

  const handleCommentDrawer = () => {
    setVisible(true);
  };

  return loading ? (
    <LoadingWrapper>
      <Spin />
    </LoadingWrapper>
  ) : (
    <Section>
      <CommentsWrapper>
        <Background src="../../public/img/bg.jpg" alt="waste-background" />
        {comments.length > 0 && (
          <CommentList
            comments={comments}
            userObj={userObj}
            fetchComments={fetchComments}
          />
        )}
        <Comment content={<CommentForm addComment={addComment} />} />
      </CommentsWrapper>

      <ContentsWrapper>
        <div style={{ marginBottom: '0.2rem' }}>{created_at}</div>
        <div>
          Created by <Avatar src={img_path} />
          <div
            style={{
              display: 'inline-block',
              marginLeft: '0.2rem',
              marginTop: '0.5rem',
              fontWeight: '600',
              borderBottom: '2px solid var(--blue-color)',
            }}
          >
            {name}
          </div>
        </div>
        <FinishText>Finished!</FinishText>
        <div style={{ marginBottom: '3rem' }}>
          <span>
            <span
              style={{
                borderBottom: '2px solid var(--blue-color)',
                fontWeight: '600',
              }}
            >
              {Math.round((cnt_correct_answer / cnt_total_answer) * 100)}%
            </span>{' '}
            people got this right!
          </span>
        </div>
        <StyledButton type="primary" onClick={handleRestart}>
          Restart Quiz
        </StyledButton>
        <Link to="/">
          <StyledButton type="primary" ghost>
            Back to Quiz List
          </StyledButton>
        </Link>

        <CommentBtn
          type="primary"
          shape="round"
          size="large"
          onClick={handleCommentDrawer}
        >
          <CommentOutlined />
          Comments
        </CommentBtn>
      </ContentsWrapper>

      <Drawer
        height="80vh"
        placement="bottom"
        closable={true}
        onClose={() => setVisible(false)}
        visible={visible}
      >
        <Background src="../../public/img/bg.jpg" alt="waste-background" />
        {comments.length > 0 && (
          <CommentList
            comments={comments}
            userObj={userObj}
            fetchComments={fetchComments}
          />
        )}
        <Comment content={<CommentForm addComment={addComment} />} />
      </Drawer>
    </Section>
  );
};

export default FinishScreen;
