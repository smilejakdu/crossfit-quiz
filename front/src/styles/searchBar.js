import styled from 'styled-components';
import { Input, Checkbox, Button, Tag } from 'antd';
const { Search } = Input;
const { CheckableTag } = Tag;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60%;
  margin: 0 auto;
`;
export const SearchWrapper = styled.div`
  display: flex;
`;
export const StyledSearch = styled(Search)`
  min-width: 13rem;
  margin-right: 1.5rem;
  @media (max-width: 768px) {
    margin-right: 0.8rem;
  }
`;
export const StyledButton = styled(Button)`
  max-width: 8rem;
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
  @media screen and (max-width: 1350px) {
    padding-right: 0;
  }
  @media screen and (max-width: 768px) {
    display: grid;
    grid-gap: 0.5rem;
    grid-template-columns: 1fr 1fr;
  }
`;
export const StyledCheckableTag = styled(CheckableTag)`
  justify-self: center;
  user-select: none;
`;
export const StyledCheckbox = styled(Checkbox)``;
