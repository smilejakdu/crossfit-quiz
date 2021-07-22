import { Tag, Input } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
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
  border: 1px solid #8176f5;
  border-radius: 30px;
  color: ${(props) => props.colorSelect || '#8176F5'};
  &:first-child {
    margin-right: 1rem;
  }
`;
export const StyledCheckbox = styled(Checkbox)``;
