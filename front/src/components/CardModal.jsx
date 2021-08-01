import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Modal, Form, Upload } from 'antd';
import React, { useState } from 'react';
import { categoryOptions } from '../constants';
import { cardService } from '../service/cards';
import { baseURL } from '../service/config';
import {
  ButtonWrapper,
  CardWrapper,
  ContentsWrapper,
  StyledInput,
} from '../styles/cardModal';
import CategoryBar from './CategoryBar';

const CardModal = ({
  fetchCards,
  isModalVisible,
  setIsModalVisible,
  form,
  userObj,
}) => {
  const [uploadVisible, setUploadVisible] = useState(true);

  const handleCancel = () => {
    setIsModalVisible(false);
    setUploadVisible(true);
  };

  const handleSave = (values) => {
    const { category_id, title, image } = values;
    console.log('image : ', image);
    if (image.fileList.length === 0) {
      message.warning('이미지를 업로드해주세요.');
      return;
    }
    const selectedOption = categoryOptions.filter(
      (option) => category_id.value === option.value
    );
    addCard({
      category_id: selectedOption[0].id,
      title,
      img_path: image.file.response.result,
      users_id: userObj.id,
    });
    setIsModalVisible(false);
    setUploadVisible(true);
  };

  const addCard = async (values) => {
    console.log('add card data : ', values);
    try {
      const res = await cardService.add(values);
      console.log('add card result : ', res);
    } catch (e) {
      console.log(e.message);
    }
    await fetchCards();
    message.success('Saved!');
  };

  const props = {
    action: `${baseURL}/cards_img/upload`,
    listType: 'picture',
    onChange(info) {
      if (info.file.status === 'uploading') {
        setUploadVisible(false);
      } else if (info.file.status === 'done') {
        message.success(`${info.file.name} uploaded!`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name}  upload failed.`);
      }
    },
    onRemove() {
      form.resetFields(['image']);
      setUploadVisible(true);
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
              name="image"
              rules={[
                {
                  required: true,
                  message: '이미지를 업로드 해주세요.',
                },
              ]}
            >
              <Upload {...props}>
                {uploadVisible && (
                  <Button icon={<UploadOutlined />}>Upload</Button>
                )}
              </Upload>
            </Form.Item>
          </ContentsWrapper>
        </Form>
      </CardWrapper>
    </Modal>
  );
};

export default CardModal;
