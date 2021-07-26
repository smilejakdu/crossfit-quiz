import React, { useState } from 'react';
import { commentService } from '../service/comments.js';
import { Popconfirm, Button, Form, Input, Avatar, message } from 'antd';
import {
  BtnContainer,
  ButtonWrapper,
  CommentContainer,
  Content,
  EditForm,
  StyledButton,
  StyledComment,
  StyledList,
} from '../styles/commentList.js';
const CommentList = ({ comments, userObj, fetchComments }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [editId, setEditId] = useState('1');
  const [form] = Form.useForm();

  const openEditForm = (comment) => {
    setEditId(comment.id);
    setShowEdit(true);
  };

  const updateComment = async (id) => {
    try {
      const res = await commentService.update({
        id,
        content: form.getFieldsValue().content,
      });
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
      header={`${comments.length} ${
        comments.length > 1 ? 'comments' : 'comment'
      }`}
      itemLayout="horizontal"
      renderItem={(comment) =>
        editId === comment.id && showEdit ? (
          <EditForm
            form={form}
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
              <Input style={{ borderRadius: '20px' }} />
            </Form.Item>
            <ButtonWrapper>
              <Form.Item>
                <StyledButton
                  size="small"
                  shape="round"
                  htmlType="submit"
                  style={{ marginRight: '0.5rem' }}
                >
                  Save
                </StyledButton>
                <StyledButton
                  size="small"
                  shape="round"
                  onClick={() => setShowEdit(false)}
                >
                  Cancel
                </StyledButton>
              </Form.Item>
            </ButtonWrapper>
          </EditForm>
        ) : (
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
              datetime={<span>{comment.created_at}</span>}
            />
            {comment.users_id === userObj.id && (
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
