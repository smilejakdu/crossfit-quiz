import React, { useEffect, useState } from 'react';
import { Comment, Drawer, message, Spin } from 'antd';
import CommentForm from './CommentForm.jsx';
import CommentList from './CommentList.jsx';
import { LoadingWrapper } from '../globalStyles.js';
import {
  CommentsWrapper,
  ContentsWrapper,
  Background,
  Section,
  FinishText,
  StyledButton,
  CommentBtn,
  AuthorName,
  AnswerText,
} from '../styles/finishScreen.js';
import Avatar from 'antd/lib/avatar/avatar';
import { userService } from '../service/users.js';
import { commentService } from '../service/comments.js';
import { useHistory } from 'react-router-dom';
import { CommentOutlined } from '@ant-design/icons';

const FinishScreen = ({ userObj, quiz, handleRestart }) => {
  let history = useHistory();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [comments, setComments] = useState([]);
  const [quizAuthor, setQuizAuthor] = useState({});
  const { users_id, id, cnt_correct_answer, cnt_total_answer } = quiz;

  useEffect(() => {
    getQuizAuthor();
    fetchCommentsByQuizId();
  }, []);

  const fetchCommentsByQuizId = async () => {
    setLoading(true);
    try {
      const res = await commentService.get(id);
      console.log('get Comments result : ', res);
      if (res.data.result.length > 0) {
        await fetchCommentAuthor(res.data.result);
      }
      return res.data.result.length;
    } catch (e) {
      console.log(e.message);
    }
    setLoading(false);
  };

  const getQuizAuthor = async () => {
    setLoading(true);
    try {
      const res = await userService.get(users_id);
      setQuizAuthor(res.data.result[0]);
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
        const res = await userService.get(comments[i].users_id);
        const authorObj = {
          name: res.data.result[0].name,
          img_path: res.data.result[0].img_path,
        };
        newComments.push({ ...comments[i], ...authorObj });
      }
      const sorted = newComments.reverse();
      setComments(sorted);
    } catch (e) {
      console.log(e.message);
    }
    setLoading(false);
  };

  const addComment = async (input) => {
    const { content } = input;
    try {
      const res = await commentService.add({
        quiz_id: quiz.id,
        users_id: userObj.id,
        content,
      });
      console.log('post comment result : ', res);
    } catch (e) {
      console.log(e.message);
    }
    await fetchCommentsByQuizId();
    message.success('작성되었습니다.');
  };

  const handleBackHome = async () => {
    history.push('/');
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
            fetchComments={fetchCommentsByQuizId}
          />
        )}
        <Comment content={<CommentForm addComment={addComment} />} />
      </CommentsWrapper>

      <ContentsWrapper>
        <div>
          Created by <Avatar src={quizAuthor.img_path} />
          <AuthorName>{quizAuthor.name}</AuthorName>
        </div>
        <FinishText>Finished!</FinishText>
        {cnt_total_answer > 0 ? (
          <AnswerText>
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
          </AnswerText>
        ) : (
          <div></div>
        )}
        <StyledButton type="primary" onClick={handleRestart}>
          Restart Quiz
        </StyledButton>
        <StyledButton onClick={handleBackHome} type="primary" ghost>
          Back Home
        </StyledButton>

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
        height={comments.length > 0 ? '80vh' : '20vh'}
        placement="bottom"
        closable={true}
        onClose={() => setVisible(false)}
        visible={visible}
      >
        <Background src="../../public/img/bg.jpg" alt="waste-background" />
        <Comment content={<CommentForm addComment={addComment} />} />
        {comments.length > 0 && (
          <CommentList
            comments={comments}
            userObj={userObj}
            fetchComments={fetchCommentsByQuizId}
          />
        )}
      </Drawer>
    </Section>
  );
};

export default FinishScreen;
