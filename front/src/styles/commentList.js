import styled from 'styled-components';
import { Button, Comment, Form, List } from 'antd';

export const StyledList = styled(List)`
  color: #fff;
`;
export const CommentContainer = styled.div`
  margin-bottom: 0.5rem;
  word-break: break-all;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-right: 3rem;
`;
export const StyledComment = styled(Comment)`
  display: flex;
`;
export const Content = styled.div`
  background-color: rgba(234, 227, 227, 0.5);
  color: #000;
  padding: 0.2rem 1rem;
  border-radius: 10px;
  border-top-left-radius: 0;
  max-width: 35rem;
`;
export const BtnContainer = styled.div`
  padding-left: 2rem;
`;
export const EditForm = styled(Form)`
  margin: 2rem;
  background-color: rgba(129, 118, 245, 0.5);
  padding: 1.5rem 1rem;
  padding-bottom: 0.1rem;
  border-radius: 25px;
  box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.3);
`;
export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const StyledButton = styled(Button)`
  box-shadow: 2px 2px 15px 2px rgba(0, 0, 0, 0.15);
  color: var(--purple-color);
`;
