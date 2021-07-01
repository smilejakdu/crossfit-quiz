import React, { useState } from 'react';
import { Button, Card, Checkbox, Col, Input, Row, Tag } from 'antd';
import styled from 'styled-components';
import { category } from '../constants';

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
    <>
      <SearchWrapper>
        <SearchBox>
          <StyledSearch placeholder="Search" onSearch={onSearch} enterButton />
          <Button>Add a Card</Button>
        </SearchBox>

        <Filter>
          <div>
            {category.map((tag) => (
              <CheckableTag
                key={tag.name}
                checked={selectedTags.indexOf(tag) > -1}
                onChange={(checked) => handleChange(tag, checked)}
                inputColor={tag.color}
              >
                {tag.name}
              </CheckableTag>
            ))}
          </div>
          <StyledCheckbox onChange={onChange}>내가 만든 카드</StyledCheckbox>
        </Filter>
      </SearchWrapper>

      <div className="site-card-wrapper">
        <Row gutter={16}>
          <Col span={8}>
            <Card title="동작 이름" hoverable>
              <div>이미지</div>
              <Tag>카테고리</Tag>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default CardList;
