import { Tag, Input } from 'antd';
import styled from 'styled-components';
const { Search } = Input;

export const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60%;
  margin: 0 auto;
`;
export const StyledSearch = styled(Search)`
  max-width: 20rem;
  min-width: 10rem;
`;
export const Filter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
`;
export const TagWrapper = styled.div`
  padding-bottom: 1.5rem;
`;
export const StyledTag = styled(Tag)`
  cursor: pointer;
  user-select: none;
  background: ${(props) => props.background};
  border: 1px solid var(--purple-color);
  border-radius: 30px;
  color: ${(props) => props.colorselect || 'var(--purple-color)'};
  &:first-child {
    margin-right: 1rem;
  }
`;
