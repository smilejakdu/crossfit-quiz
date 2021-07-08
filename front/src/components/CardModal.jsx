import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Modal, Form, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { cardService } from '../service/cards';
import {
  ButtonWrapper,
  CardWrapper,
  ContentsWrapper,
  StyledInput,
} from '../styles/cardModal';
import CategoryBar from './CategoryBar';

const CardModal = ({ fetchCards, isModalVisible, setIsModalVisible, form }) => {
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSave = (values) => {
    // console.log('google_id : ', google_id);
    // console.log(window.localStorage.getItem('userObj'));
    const { category_id, title, image_path } = values;
    const { google_id } = JSON.parse(window.localStorage.getItem('userObj'));
    addCard({
      category_id,
      title,
      image_path,
      google_id,
    });
    setIsModalVisible(false);
  };

  const addCard = async (values) => {
    try {
      const res = await cardService.add(values);
      console.log(res);
    } catch (e) {
      console.log(e.message);
    }
    // await fetchCards();
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
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </ButtonWrapper>
          <ContentsWrapper>
            <CategoryBar />
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
              name="image_path"
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
