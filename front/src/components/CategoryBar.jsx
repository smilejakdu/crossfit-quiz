import React from 'react';
import styled from 'styled-components';
import { Form, Select } from 'antd';
import { categoryOptions } from '../constants';

const StyledSelect = styled(Select)`
  margin-top: 2rem;
`;

const CategoryBar = () => {
  return (
    <Form.Item
      name="category_id"
      rules={[
        {
          required: true,
          message: '카테고리를 선택해주세요',
        },
      ]}
    >
      <StyledSelect
        labelInValue
        style={{ width: '10rem' }}
        placeholder="Equipment"
        options={categoryOptions}
      />
    </Form.Item>
  );
};

export default CategoryBar;
