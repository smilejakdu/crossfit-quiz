import { UploadOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Modal, Form, Upload, Select, message } from 'antd';
import React, { useState } from 'react';
import { categoryOptions } from '../constants';
import { cardService } from '../service/cards';
import { baseURL } from '../service/config';
import {
  ButtonWrapper,
  CardWrapper,
  ContentsWrapper,
  StyledInput,
  StyledSelect,
} from '../styles/editModal';
const { Option } = Select;

const EditModal = ({
  fetchCards,
  showEditModal,
  setShowEditModal,
  card,
  category,
}) => {
  const [form] = Form.useForm();
  const { id, title, img_path } = card;
  const [uploadVisible, setUploadVisible] = useState(true);

  const handleCancel = () => {
    setShowEditModal(false);
  };

  const handleSave = (values) => {
    const { category, title, image } = values;
    console.log('image : ', image);
    if (image.fileList.length === 0) {
      message.warning('이미지를 업로드해주세요.');
      return;
    }
    updateCard({
      category_id:
        categoryOptions.findIndex((option) => option.value === category.value) +
        1,
      id,
      title,
      img_path: image.file.response.result,
    });
    setShowEditModal(false);
  };

  const updateCard = async (values) => {
    console.log('update card data : ', values);
    try {
      const res = await cardService.update(values);
      console.log('update card result : ', res);
    } catch (e) {
      console.log(e.message);
    }
    await fetchCards();
    message.success('Saved!');
  };

  const deleteCard = async (id) => {
    setShowEditModal(false);
    try {
      const res = await cardService.remove(id);
      console.log('delete card : ', res);
    } catch (e) {
      console.log(e.message);
    }
    await fetchCards();
    message.success('삭제되었습니다.');
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
    <Modal visible={showEditModal} onCancel={handleCancel} footer={null}>
      <CardWrapper>
        <Form
          form={form}
          name="edit-form"
          onFinish={handleSave}
          initialValues={{
            category: { value: category },
            title,
            image: img_path,
          }}
        >
          <ButtonWrapper>
            <Popconfirm
              title="이 카드를 삭제할까요?"
              onConfirm={() => deleteCard(id)}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>Delete</Button>
            </Popconfirm>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </ButtonWrapper>
          <ContentsWrapper>
            <Form.Item
              name="category"
              rules={[
                {
                  required: true,
                  message: '카테고리를 선택해주세요.',
                },
              ]}
            >
              <StyledSelect labelInValue style={{ width: '10rem' }}>
                {categoryOptions.map((option) => (
                  <Option key={option.id} value={option.value}>
                    {option.value}
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
              <StyledInput />
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
                  <Button icon={<UploadOutlined />}>Change Image</Button>
                )}
              </Upload>
            </Form.Item>
          </ContentsWrapper>
        </Form>
      </CardWrapper>
    </Modal>
  );
};

export default EditModal;
