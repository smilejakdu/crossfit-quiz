import React, { useEffect, useState } from 'react';
import { Empty, Input, Skeleton, Tag } from 'antd';
import { Filter, SearchWrapper, StyledCheckbox } from '../styles/quizList';
import { quizService } from '../service/quizzes';
import QuizCard from './QuizCard';
import { CardsWrapper, EmptyWrapper } from '../globalStyles';
const { Search } = Input;

const QuizList = ({ quizzes, setQuizzes }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await quizService.getAll({
        params: { offset: '1', limit: '10' },
      });
      console.log(res);
      setQuizzes(res.data);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  const onSearch = (value) => console.log(value);

  function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }

  return (
    <>
      <SearchWrapper>
        <Search placeholder="Search" onSearch={onSearch} enterButton />

        <Filter>
          <div>
            <Tag
              checked
              // onChange={checked => handleChange(tag, checked)}
            >
              인기순
            </Tag>
            <Tag>최신순</Tag>
          </div>
          <StyledCheckbox onChange={onChange}>내가 만든 퀴즈</StyledCheckbox>
        </Filter>
      </SearchWrapper>

      {loading ? (
        <Skeleton active />
      ) : quizzes.length === 0 ? (
        <EmptyWrapper>
          <Empty description="검색 결과가 없습니다." />
        </EmptyWrapper>
      ) : (
        <CardsWrapper>
          {quizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} fetchQuizzes={fetchQuizzes} />
          ))}
        </CardsWrapper>
      )}
    </>
  );
};

export default QuizList;
