import React, { useState } from 'react';
import { Form, Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { StyledForm, StyledInput } from '../styles/commentForm';

const CommentForm = ({ addComment }) => {
  const [width, setWidth] = useState('15rem');
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
        <StyledInput
          placeholder="Please leave your thoughts..."
          allowClear
          width={width}
          onMouseOver={() => setWidth('23rem')}
          onMouseLeave={() => setWidth('15rem')}
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
