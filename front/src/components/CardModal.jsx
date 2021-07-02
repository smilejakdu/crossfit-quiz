import { UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Input,
  message,
  Popconfirm,
  Select,
  Modal,
  Form,
  Upload,
} from 'antd';
import React from 'react';
import styled from 'styled-components';
import { category } from '../constants';
const { Option } = Select;

const CardWrapper = styled.div`
  margin: 2rem;
  padding: 2rem;
  border: 1px solid #266293;
  background-color: var(--main-bg-color);
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledSelect = styled(Select)`
  margin-top: 2rem;
`;
const StyledInput = styled(Input)`
  margin: 1rem 0;
  width: 10rem;
`;

const CardModal = ({ isModalVisible, setIsModalVisible, form }) => {
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function handleOptionChange(value) {
    console.log(`selected ${value}`);
  }

  function confirm(e) {
    console.log(e);
    message.success('Click on Yes');
  }

  function cancel(e) {
    console.log(e);
    message.error('Click on No');
  }

  const handleSave = (values) => {
    console.log(values);
    setIsModalVisible(false);
  };

  const props = {
    name: 'file',
    // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <Modal visible={isModalVisible} onCancel={handleCancel} footer={null}>
      <CardWrapper>
        <Form form={form} name="add-form" onFinish={handleSave}>
          <ButtonWrapper>
            <Form.Item>
              <Popconfirm
                title="Are you sure to delete this task?"
                onConfirm={confirm}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <Button danger>Delete</Button>
              </Popconfirm>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </ButtonWrapper>
          <ContentsWrapper>
            <Form.Item name="category">
              <StyledSelect
                placeholder="Equipment"
                style={{ width: 120 }}
                onChange={handleOptionChange}
              >
                {category.map((tag) => (
                  <Option key={tag.name} value={tag.name}>
                    {tag.name}
                  </Option>
                ))}
              </StyledSelect>
            </Form.Item>
            <Form.Item
              name="title"
              rules={[
                {
                  required: true,
                  message: '제목을 입력해주세요.',
                },
              ]}
            >
              <StyledInput placeholder="Title" />
            </Form.Item>
            <Form.Item
              name="image"
              rules={[
                {
                  required: true,
                  message: '이미지를 업로드 해주세요.',
                },
              ]}
            >
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
          </ContentsWrapper>
        </Form>
      </CardWrapper>
    </Modal>
  );
};

export default CardModal;
