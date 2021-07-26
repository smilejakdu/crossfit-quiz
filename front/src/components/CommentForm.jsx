import React from 'react';
import { Form, Input, Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { StyledForm } from '../styles/commentForm';

const CommentForm = ({ addComment }) => {
  const [form] = Form.useForm();

  const handleSubmit = (input) => {
    addComment(input);
    form.resetFields();
  };

  return (
    <StyledForm form={form} onFinish={handleSubmit}>
      <Form.Item
        name="content"
        rules={[
          {
            required: true,
            message: '내용을 입력해주세요.',
          },
        ]}
      >
        <Input
          placeholder="What do you say?"
          allowClear
          style={{ borderRadius: '20px' }}
        />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          type="primary"
          shape="circle"
          style={{ marginLeft: '0.8rem' }}
        >
          <SendOutlined />
        </Button>
      </Form.Item>
    </StyledForm>
  );
};

export default CommentForm;
