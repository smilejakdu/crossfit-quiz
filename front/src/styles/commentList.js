import styled from 'styled-components';
import { Comment, List } from 'antd';

export const StyledList = styled(List)``;
export const CommentContainer = styled.div`
  margin-bottom: 0.5rem;
  word-break: break-all;
  display: flex;
  align-items: flex-start;

  @media screen and (max-width: 48rem) {
    flex-direction: column;
  }
`;
export const StyledComment = styled(Comment)`
  margin-right: 0.8rem;
`;
export const BtnContainer = styled.div`
  display: flex;
  padding-top: 2rem;

  @media screen and (max-width: 48rem) {
    padding-top: 0;
    padding-left: 2rem;
  }
`;
