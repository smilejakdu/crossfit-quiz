import React, { useState } from 'react';
import { Button, Checkbox, Input, Tag, Form } from 'antd';
import styled from 'styled-components';
import { category } from '../constants';
import CardModal from './CardModal';
import Card from './Card';

const { Search } = Input;
const { CheckableTag } = Tag;

const SearchWrapper = styled.div`
  width: 50%;
  margin: 0 auto;
`;
const SearchBox = styled.div`
  display: flex;
`;
const StyledSearch = styled(Search)`
  margin-right: 1.5rem;
`;
const Filter = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem 0;
  position: relative;
`;
const StyledCheckbox = styled(Checkbox)`
  position: absolute;
  right: 0;
`;

const CardList = () => {
  const [selectedTags, setSelectedTags] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const onSearch = (value) => console.log(value);

  function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }

  const handleChange = (tag, checked) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    console.log('checked: ', tag);
    console.log('선택한 카테고리: ', nextSelectedTags);
    setSelectedTags(nextSelectedTags);
  };

  const showModal = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  return (
    <>
      <SearchWrapper>
        <SearchBox>
          <StyledSearch placeholder="Search" onSearch={onSearch} enterButton />
          <Button onClick={showModal}>Add a Card</Button>
          <CardModal
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            form={form}
          />
        </SearchBox>

        <Filter>
          <div>
            {category.map((tag) => (
              <CheckableTag
                key={tag.name}
                checked={selectedTags.indexOf(tag) > -1}
                onChange={(checked) => handleChange(tag, checked)}
              >
                {tag.name}
              </CheckableTag>
            ))}
          </div>
          <StyledCheckbox onChange={onChange}>내가 만든 카드</StyledCheckbox>
        </Filter>
      </SearchWrapper>

      <Card showModal={showModal} />
    </>
  );
};

export default CardList;
