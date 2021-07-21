import { Button, Card } from 'antd';
import styled from 'styled-components';

export const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
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
export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
