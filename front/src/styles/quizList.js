import Checkbox from 'antd/lib/checkbox/Checkbox';
import styled from 'styled-components';

export const SearchWrapper = styled.div`
  width: 50%;
  margin: 0 auto;
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
