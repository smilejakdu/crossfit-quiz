import React, { useEffect, useState, useRef } from 'react';
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
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [titleSearched, setTitleSearched] = useState('');
  const [allQuizzes, setAllQuizzes] = useState([]);
  const [myQuizzesChecked, setMyQuizzesChecked] = useState(false);
  const [filteringId, setFilteringId] = useState(0);

  useEffect(() => {
    fetchQuizzes();
  }, []);
  useEffect(() => {
    filterQuizzes();
  }, [myQuizzesChecked, titleSearched]);

  const fetchQuizzes = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await quizService.getAll();
      console.log(res);
      setQuizzes(res.data);
      setAllQuizzes(res.data);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  const handleSort = (value) => {
    setFilteringId(value.id);
  };

  const filterQuizzes = () => {
    let searchResult = [];
    if (myQuizzesChecked) {
      searchResult = (titleSearched ? titleSearched : allQuizzes).filter(
        (quiz) => quiz.google_id === userObj.google_id
      );
    } else {
      searchResult = titleSearched ? titleSearched : allQuizzes;
    }
    console.log('searchResult', searchResult);
    setQuizzes(searchResult);
  };

  const searchByTitle = (str) => {
    const value = str.toLowerCase();
    inputRef.current.focus({
      cursor: 'all',
    });

    setError(null);
    setLoading(true);
    try {
      let searchResult = [];
      if (!value) {
        searchResult = allQuizzes;
        setTitleSearched('');
      } else {
        searchResult = allQuizzes.filter((quiz) =>
          quiz.title.toLowerCase().includes(value)
        );
        setTitleSearched(searchResult);
      }
      setQuizzes(searchResult);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  const filterByUser = async (e) => {
    setError(null);
    setLoading(true);
    try {
      if (e.target.checked) {
        setMyQuizzesChecked(true);
      } else {
        setMyQuizzesChecked(false);
      }
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  return (
    <>
      <SearchWrapper>
        <StyledSearch
          placeholder="Search"
          onSearch={searchByTitle}
          enterButton
          allowClear
          ref={inputRef}
        />

        <Filter>
          <TagWrapper>
            {sortingOptions.map((tag) => (
              <StyledTag
                key={tag.id}
                background={filteringId === tag.id && '#8176F5'}
                colorSelect={filteringId === tag.id && '#fff'}
                onClick={() => handleSort(tag)}
              >
                {tag.name}
              </StyledTag>
            ))}
          </TagWrapper>
          {userObj && (
            <StyledCheckbox onChange={filterByUser}>
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
