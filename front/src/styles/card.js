import { Button, Card } from 'antd';
import styled from 'styled-components';

export const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  border-radius: 25px;
  width: 15rem;
  height: 20rem;
  overflow: hidden;
  padding-top: 3.5rem;
`;
export const DeselectBtn = styled(Button)`
  font-size: 1.5em;
  color: #bec8c8;
  position: absolute;
  top: -2.4rem;
  right: 0;
  &:hover {
    color: var(--blue-color);
  }
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
export const Cover = styled.img`
  max-height: 10.5rem;
`;
