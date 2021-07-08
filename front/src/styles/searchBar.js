import styled from 'styled-components';
import { Input, Checkbox } from 'antd';
const { Search } = Input;

export const SearchWrapper = styled.div`
  width: 50%;
  margin: 0 auto;
`;
export const SearchBox = styled.div`
  display: flex;
`;
export const StyledSearch = styled(Search)`
  margin-right: 1.5rem;
`;
export const Filter = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem 0;
  position: relative;
`;
export const StyledCheckbox = styled(Checkbox)`
  position: absolute;
  right: 0;
`;
