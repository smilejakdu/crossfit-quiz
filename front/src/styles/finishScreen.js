import { Button } from 'antd';
import styled from 'styled-components';

export const Section = styled.section`
  display: flex;
  height: 100vh;
`;

export const CommentsWrapper = styled.div`
  width: 50vw;
  position: relative;
  padding: 5vw;
  padding-bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
export const ContentsWrapper = styled.div`
  width: 50vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  position: relative;
  @media screen and (max-width: 768px) {
    width: 100vw;
  }
`;
export const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('https://images.unsplash.com/photo-1612499345451-f540991b4cd8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')
    center/cover;
  filter: brightness(30%);
`;
export const AuthorName = styled.div`
  display: inline-block;
  margin-left: 0.2rem;
  margin-top: 0.5rem;
  font-weight: 600;
  border-bottom: 2px solid var(--blue-color);
`;
export const FinishText = styled.h1`
  margin: 3rem;
  font-size: 2rem;
  color: var(--blue-color);
  font-weight: 600;
`;
export const Title = styled.h2`
  font-weight: bold;
  font-size: 2em;
  text-transform: uppercase;
  display: inline-block;
  letter-spacing: 1px;
  margin-bottom: 2.5rem;
  z-index: 1;
`;
export const AnswerText = styled.div`
  margin-bottom: 3rem;
`;
export const StyledButton = styled(Button)`
  width: 10rem;
  margin-top: 1rem;
  border-radius: 25px;
  box-shadow: 2px 2px 15px 2px rgba(0, 0, 0, 0.15);
`;
export const CommentBtn = styled(Button)`
  box-shadow: 2px 2px 15px 2px rgba(0, 0, 0, 0.15);
  background-color: var(--purple-color);
  border: 1px solid #fff;
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
  }
  &:hover {
    border: 1px solid var(--purple-color);
    color: var(--purple-color);
    background-color: #fff;
  }
`;
