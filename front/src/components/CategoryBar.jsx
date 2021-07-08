import React from 'react';
import styled from 'styled-components';
import { Form, Select } from 'antd';
import { categoryOptions } from '../constants';
const { Option } = Select;

const StyledSelect = styled(Select)`
  margin-top: 2rem;
`;

const CategoryBar = () => {
  return (
    <Form.Item name="category_id">
      <StyledSelect style={{ width: 120 }} placeholder="Equipment" allowClear>
        {categoryOptions.map((option) => (
          <Option key={option.id} value={option.id}>
            {option.value}
          </Option>
        ))}
      </StyledSelect>
    </Form.Item>
  );
};

export default CategoryBar;
