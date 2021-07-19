import { Input } from 'antd';
import styled from 'styled-components';

export const CardWrapper = styled.div`
  margin: 2rem;
  padding: 2rem;
  border: 1px solid #266293;
  background-color: var(--main-bg-color);
`;
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const StyledInput = styled(Input)`
  margin: 1rem 0;
  width: 10rem;
`;
