import { categoryOptions } from '../constants';
import CardModal from './CardModal';
import React, { useState } from 'react';
import { Button, Tag } from 'antd';
import {
  Filter,
  SearchBox,
  SearchWrapper,
  StyledCheckbox,
  StyledSearch,
} from '../styles/searchBar';
const { CheckableTag } = Tag;

const SearchBar = ({
  showModal,
  isModalVisible,
  setIsModalVisible,
  form,
  settingsCard,
  fetchCards,
}) => {
  // console.log(settingsCard);
  const [selectedTags, setSelectedTags] = useState('');

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

  return (
    <SearchWrapper>
      <SearchBox>
        <StyledSearch placeholder="Search" onSearch={onSearch} enterButton />
        {!settingsCard && <Button onClick={showModal}>Add a Card</Button>}
        <CardModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          form={form}
          fetchCards={fetchCards}
        />
      </SearchBox>

      <Filter>
        <div>
          {categoryOptions.map((tag) => (
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
  );
};

export default SearchBar;
