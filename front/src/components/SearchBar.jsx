import { debounce } from 'debounce';
import {
  Wrapper,
  SearchWrapper,
  Filter,
  StyledButton,
  StyledCheckbox,
  StyledSearch,
  TagWrapper,
  StyledCheckableTag,
  CheckboxWrapper,
} from '../styles/searchBar';
import { categoryOptions } from '../constants';
import CardModal from './CardModal';
import React, { useEffect, useRef, useState } from 'react';
import { RedoOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const SearchBar = ({
  showModal,
  isModalVisible,
  setIsModalVisible,
  form,
  settingsCard,
  fetchCards,
  searchByTitle,
  filterByCategory,
  filterByUser,
  userObj,
  resetFilter,
  showAllBtn,
}) => {
  const [selectedTags, setSelectedTags] = useState('');
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const inputRef = useRef(null);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleResize = debounce(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, 1000);

  const handleSearch = async (value) => {
    searchByTitle(value.toLowerCase());
    inputRef.current.focus({
      cursor: 'all',
    });
  };

  const handleTags = (tag, checked) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    setSelectedTags(nextSelectedTags);
    const tagIds = nextSelectedTags.map((tag) => tag.id);
    filterByCategory(tagIds);
  };

  return (
    <Wrapper>
      <SearchWrapper>
        <StyledSearch
          placeholder="Search"
          onSearch={handleSearch}
          enterButton
          allowClear
          ref={inputRef}
        />
        {!settingsCard && (
          <StyledButton type="primary" ghost onClick={showModal}>
            {windowSize.width > 768 ? '+ Add a Card' : '+ New'}
          </StyledButton>
        )}
        <CardModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          form={form}
          fetchCards={fetchCards}
          userObj={userObj}
        />
      </SearchWrapper>
      <Filter>
        <TagWrapper>
          {categoryOptions.map((tag) => (
            <StyledCheckableTag
              key={tag.name}
              checked={selectedTags.indexOf(tag) > -1}
              onChange={(checked) => handleTags(tag, checked)}
            >
              {tag.name}
            </StyledCheckableTag>
          ))}
        </TagWrapper>
        {userObj && (
          <CheckboxWrapper>
            <StyledCheckbox onChange={filterByUser}>
              내가 만든 카드
            </StyledCheckbox>
            {showAllBtn && (
              <Button type="link" size="small" onClick={resetFilter}>
                <RedoOutlined />
                모든 카드
              </Button>
            )}
          </CheckboxWrapper>
        )}
      </Filter>
    </Wrapper>
  );
};

export default SearchBar;
