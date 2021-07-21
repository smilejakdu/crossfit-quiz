import { UploadOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Modal, Form, Upload, Select } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import { categoryOptions } from '../constants';

import { cardService } from '../service/cards';
import {
  ButtonWrapper,
  CardWrapper,
  ContentsWrapper,
  StyledInput,
} from '../styles/editModal';
const { Option } = Select;

const StyledSelect = styled(Select)`
  margin-top: 2rem;
`;

const EditModal = ({
  fetchCards,
  showEditModal,
  setShowEditModal,
  card,
  category,
}) => {
  const [form] = Form.useForm();
  const { id, title, img_path } = card;
  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: title,
      status: 'done',
      url: img_path,
    },
  ]);

  const handleCancel = () => {
    setShowEditModal(false);
  };

  const updateCard = async (values) => {
    const {
      category,
      title,
      img_path: { file },
    } = values;
    console.log(values);
    setShowEditModal(false);
    try {
      const res = await cardService.update({
        id,
        category_id:
          category.value &&
          categoryOptions.findIndex(
            (option) => option.value === category.value
          ) + 1,
        title,
        img_path: file.response.result,
      });
      console.log(res);
    } catch (e) {
      console.log(e.message);
    }
    await fetchCards();
  };

  const deleteCard = async (id) => {
    try {
      const res = await cardService.remove(id);
      console.log(res);
    } catch (e) {
      console.log(e.message);
    }
    await fetchCards();
  };

  const removeImage = () => {
    console.log('이미지삭제');
  };

  const props = {
    action: 'http://192.168.146.63:4000/cards_img/upload',
    listType: 'picture-card',
    fileList,
    onChange({ fileList: newFileList }) {
      setFileList(newFileList);
    },
    onRemove: removeImage,
  };

  return (
    <Modal visible={showEditModal} onCancel={handleCancel} footer={null}>
      <CardWrapper>
        <Form
          form={form}
          name="edit-form"
          onFinish={updateCard}
          initialValues={{
            category: { value: category },
            title,
            img_path: fileList[0],
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
            <Form.Item name="category">
              <StyledSelect labelInValue style={{ width: 120 }} allowClear>
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
              name="img_path"
              rules={[
                {
                  required: true,
                  message: '이미지를 업로드 해주세요.',
                },
              ]}
            >
              <Upload {...props}>
                {fileList.length < 1 && (
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
