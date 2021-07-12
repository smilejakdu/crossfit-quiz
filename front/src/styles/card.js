import { DeleteOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
import styled from 'styled-components';

export const StyledCard = styled(Card)`
  min-width: 14rem;
  max-width: 30rem;
  position: relative;
`;
export const MetaWrapper = styled.div`
  /* display: flex; */
`;
export const DeselectBtn = styled(Button)`
  font-size: 1.5em;
  color: #bec8c8;
  &:hover {
    color: var(--blue-color);
  }
  position: absolute;
  top: -2.4rem;
  right: 0;
`;
