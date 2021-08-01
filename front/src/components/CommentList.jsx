import React, { useState } from 'react';
import { commentService } from '../service/comments.js';
import { Popconfirm, Button, Input, Avatar, message, Modal } from 'antd';
import {
  BtnContainer,
  CommentContainer,
  Content,
  StyledComment,
  StyledList,
} from '../styles/commentList.js';
const { TextArea } = Input;

const CommentList = ({ comments, userObj, fetchComments }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [content, setContent] = useState('');
  const [editId, setEditId] = useState(1);

  const getCommentTime = (createdAt) => {
    const day = new Date(createdAt);
    const hours = ('0' + day.getHours()).slice(-2);
    const minutes = ('0' + day.getMinutes()).slice(-2);
    const timeString = hours + ':' + minutes;
    return (
      <span>
        {createdAt.slice(2, 10)} {timeString}
      </span>
    );
  };

  const updateComment = async () => {
    setIsModalVisible(false);
    try {
      const res = await commentService.update({
        id: editId,
        content,
      });
      console.log(res.data);
    } catch (e) {
      console.log(e.message);
    }
    await fetchComments();
    message.success('수정되었습니다.');
  };

  const deleteComment = async (id) => {
    try {
      await commentService.remove(id);
    } catch (e) {
      console.log(e.message);
    }
    await fetchComments();
    message.success('삭제되었습니다.');
  };

  const showModal = (comment) => {
    setContent(comment.content);
    setEditId(comment.id);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <>
      <Modal
        visible={isModalVisible}
        footer={[
          <Button onClick={handleCancel}>Cancel</Button>,
          <Button type="primary" onClick={updateComment}>
            Save
          </Button>,
        ]}
        closable={false}
      >
        <TextArea rows={4} defaultValue={content} onChange={onChange} />
      </Modal>
      <StyledList
        dataSource={comments}
        header={`${comments.length} ${
          comments.length > 1 ? 'comments' : 'comment'
        }`}
        itemLayout="horizontal"
        renderItem={(comment) => (
          <>
            <CommentContainer>
              <StyledComment
                avatar={
                  <Avatar
                    src={comment.img_path}
                    alt={`${comment.name}'s avatar`}
                  />
                }
                author={<span style={{ color: 'white' }}>{comment.name}</span>}
                content={<Content>{comment.content}</Content>}
                datetime={getCommentTime(comment.created_at)}
              />
              {comment.users_id === userObj.id && (
                <BtnContainer>
                  <Button type="link" onClick={() => showModal(comment)}>
                    edit
                  </Button>
                  <Popconfirm
                    title="삭제할까요?"
                    onConfirm={() => deleteComment(comment.id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button type="link">delete</Button>
                  </Popconfirm>
                </BtnContainer>
              )}
            </CommentContainer>
          </>
        )}
      />
    </>
  );
};

export default CommentList;
