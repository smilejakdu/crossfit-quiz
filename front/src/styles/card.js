import { Button, Card } from 'antd';
import styled from 'styled-components';

export const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  border-radius: 25px;
  width: 15rem;
  height: 21rem;
  overflow: hidden;
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
export const EditButton = styled(Button)`
  position: absolute;
  top: 1rem;
  right: 5rem;
  z-index: 100;
  background: #fff;
  color: var(--blue-color);
  box-shadow: 2px 2px 15px 2px rgba(0, 0, 0, 0.15);
`;
export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
