import React, { useEffect, useState } from 'react';
import { Comment, message, Spin } from 'antd';
import CommentForm from './CommentForm.jsx';
import CommentList from './CommentList.jsx';
import { commentService } from '../service/comments.js';
import { LoadingWrapper } from '../globalStyles.js';
import { userService } from '../service/users.js';

const Comments = ({ userObj, quizId }) => {
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await commentService.getAll();
      const comments = response.data;
      fetchAuthorInfo(comments);
    } catch (e) {
      console.log(e.message);
    }
    setLoading(false);
  };

  const fetchAuthorInfo = async (comments) => {
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
        quiz_id: quizId,
        users_id: userObj.google_id,
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

  return loading ? (
    <LoadingWrapper>
      <Spin />
    </LoadingWrapper>
  ) : (
    <>
      {comments.length > 0 && (
        <CommentList
          comments={comments}
          userObj={userObj}
          fetchComments={fetchComments}
        />
      )}
      <Comment content={<CommentForm addComment={addComment} />} />
    </>
  );
};

export default Comments;
