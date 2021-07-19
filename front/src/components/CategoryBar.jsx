import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Form, Select } from 'antd';
import { categoryOptions } from '../constants';

const StyledSelect = styled(Select)`
  margin-top: 2rem;
`;

const CategoryBar = () => {
  return (
    <Form.Item name="category_id">
      <StyledSelect
        labelInValue
        style={{ width: 120 }}
        placeholder="Equipment"
        allowClear
        onChange={(value) => console.log(value)}
        options={categoryOptions}
      />
    </Form.Item>
  );
};

export default CategoryBar;
