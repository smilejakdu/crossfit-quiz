import React from 'react';
import {
  Card,
  message,
  Checkbox,
  Col,
  Input,
  Popconfirm,
  Row,
  Tag,
} from 'antd';
import styled from 'styled-components';
import { CommentOutlined } from '@ant-design/icons';
const { Search } = Input;

const SearchWrapper = styled.div`
  width: 50%;
  margin: 0 auto;
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

const QuizList = () => {
  function confirm(e) {
    console.log(e);
    message.success('Click on Yes');
  }

  function cancel(e) {
    console.log(e);
    message.error('Click on No');
  }

  const onSearch = (value) => console.log(value);

  function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }

  return (
    <>
      <SearchWrapper>
        <Search placeholder="Search" onSearch={onSearch} enterButton />

        <Filter>
          <div>
            <Tag
              checked
              // onChange={checked => handleChange(tag, checked)}
            >
              인기순
            </Tag>
            <Tag>최신순</Tag>
          </div>
          <StyledCheckbox onChange={onChange}>내가 만든 퀴즈</StyledCheckbox>
        </Filter>
      </SearchWrapper>

      <div className="site-card-wrapper">
        <Row gutter={16}>
          <Col span={8}>
            <Card title="동작 이름" extra={<a href="#">정답률</a>} hoverable>
              <div>생성일</div>
              <div>created by</div>
              <div>총 _명 참여!</div>
              <div>
                <CommentOutlined />
                comments
              </div>
              <Popconfirm
                title="Are you sure to delete this task?"
                onConfirm={confirm}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <a href="#">Delete</a>
              </Popconfirm>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default QuizList;
