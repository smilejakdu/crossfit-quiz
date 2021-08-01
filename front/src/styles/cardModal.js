import { Input } from 'antd';
import styled from 'styled-components';

export const CardWrapper = styled.div`
  margin: 1.5rem;
  padding: 2rem;
  background-color: var(--main-bg-color);
`;
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
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
