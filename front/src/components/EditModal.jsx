import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm, Modal, Form, Upload } from 'antd';
import React, { useEffect, useState } from 'react';

import { cardService } from '../service/cards';
import {
  ButtonWrapper,
  CardWrapper,
  ContentsWrapper,
  StyledInput,
} from '../styles/editModal';
import CategoryBar from './CategoryBar';

const EditModal = ({
  fetchCards,
  showEditModal,
  setShowEditModal,
  editCard,
  setEditCard,
}) => {
  // console.log('editCard ? ', editCard);
  const { id, title, image_path } = editCard;
  const [category, setCategory] = useState('Equipment');

  useEffect(() => {
    if (editCard.category) {
      setCategory(editCard.category);
    }
  }, []);

  const handleCancel = () => {
    setShowEditModal(false);
  };

  const updateCard = async () => {
    setShowEditModal(false);
    try {
      if (category === 'Equipment') {
        const res = await cardService.update(id, { title, category: '' });
        console.log(res);
      } else {
        const res = await cardService.update(id, { title, category });
        console.log(res);
      }
    } catch (e) {
      console.log(e.message);
    }
    await fetchCards();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditCard({
      ...editCard,
      [name]: value,
    });
  };

  const getSelectedOption = (value) => {
    console.log(value);
    setCategory(value);
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
    <Modal visible={showEditModal} onCancel={handleCancel} footer={null}>
      <CardWrapper>
        <Form name="add-form" onFinish={updateCard}>
          <ButtonWrapper>
            <Popconfirm
              title="이 카드를 삭제할까요?"
              onConfirm={() => deleteCard(id)}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>Delete</Button>
            </Popconfirm>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </ButtonWrapper>
          <ContentsWrapper>
            <CategoryBar
              category={category}
              setCategory={setCategory}
              setSelectedOption={getSelectedOption}
            />
            <Form.Item
              rules={[
                {
                  required: true,
                  message: '제목을 입력해주세요.',
                },
              ]}
            >
              <StyledInput name="title" value={title} onChange={handleChange} />
            </Form.Item>
            {/* <Form.Item
              rules={[
                  {
                      required: true,
                      message: '이미지를 업로드 해주세요.',
                    },
              ]}
              >
              <Upload 
              
              name="image"
              {...props}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item> */}
          </ContentsWrapper>
        </Form>
      </CardWrapper>
    </Modal>
  );
};

export default EditModal;
