import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
const { TextArea } = Input;

const CommentForm = ({ addComment }) => {
  const [value, setValue] = useState('');
  const [form] = Form.useForm();

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (input) => {
    addComment(input);
    form.resetFields();
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
      <Form.Item
        name="content"
        rules={[
          {
            required: true,
            message: '내용을 입력해주세요.',
          },
        ]}
      >
        <TextArea rows={4} onChange={handleChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary">
          Add Comment
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CommentForm;
