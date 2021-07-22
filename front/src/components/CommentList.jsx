import React, { useState } from 'react';
import { commentService } from '../service/comments.js';
import { Popconfirm, Button, Form, Input, Avatar, message } from 'antd';
import {
  BtnContainer,
  CommentContainer,
  StyledComment,
  StyledList,
} from '../styles/commentList.js';

const CommentList = ({ comments, userObj, fetchComments }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [editId, setEditId] = useState('1');
  const [content, setContent] = useState({});

  const openEditForm = (comment) => {
    setEditId(comment.id);
    setShowEdit(true);
  };

  const handleEditChange = (e) => {
    setContent(e.target.value);
  };

  const updateComment = async (id) => {
    try {
      const res = await commentService.update({ id, content });
      console.log(res.data);
      setShowEdit(false);
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

  return (
    <StyledList
      dataSource={comments}
      header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
      itemLayout="horizontal"
      renderItem={(comment) =>
        editId === comment.id && showEdit ? (
          <Form
            onFinish={() => updateComment(comment.id)}
            initialValues={{
              content: comment.content,
            }}
          >
            <Form.Item
              name="content"
              rules={[
                {
                  required: true,
                  message: '내용을 입력해주세요.',
                },
              ]}
            >
              <Input value={content} onChange={handleEditChange} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" ghost htmlType="submit">
                Save
              </Button>
              <Button onClick={() => setShowEdit(false)}>Cancel</Button>
            </Form.Item>
          </Form>
        ) : (
          <CommentContainer>
            <StyledComment
              avatar={
                <Avatar
                  src={comment.img_path}
                  alt={`${comment.name}'s avatar`}
                />
              }
              author={comment.name}
              content={comment.content}
              datetime={<span>{comment.created_at}</span>}
            />
            {comment.users_id === userObj.google_id && (
              <BtnContainer>
                <Button type="link" onClick={() => openEditForm(comment)}>
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
        )
      }
    />
  );
};

export default CommentList;
