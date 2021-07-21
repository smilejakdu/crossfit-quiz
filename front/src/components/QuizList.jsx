import React, { useEffect, useState } from 'react';
import { Empty, Skeleton } from 'antd';
import {
  StyledSearch,
  Filter,
  SearchWrapper,
  TagWrapper,
  StyledCheckbox,
  StyledTag,
} from '../styles/quizList';
import { quizService } from '../service/quizzes';
import QuizCard from './QuizCard';
import { CardsWrapper, EmptyWrapper } from '../globalStyles';
import { sortingOptions } from '../constants';

const QuizList = ({ quizzes, setQuizzes, userObj }) => {
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
        <StyledSearch placeholder="Search" onSearch={onSearch} enterButton />

        <Filter>
          <TagWrapper>
            {sortingOptions.map((tag) => (
              <StyledTag
                key={tag.id}
                checked={tag.id === 0 && true}
                // onChange={(checked) => handleTags(tag, checked)}
              >
                {tag.name}
              </StyledTag>
            ))}
          </TagWrapper>
          {userObj && (
            <StyledCheckbox
            // onChange={filterByUser}
            >
              내가 만든 퀴즈
            </StyledCheckbox>
          )}
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
            <QuizCard
              key={quiz.id}
              quiz={quiz}
              fetchQuizzes={fetchQuizzes}
              userObj={userObj}
            />
          ))}
        </CardsWrapper>
      )}
    </>
  );
};

export default QuizList;
