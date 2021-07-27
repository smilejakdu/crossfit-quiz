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
import InfiniteScroll from 'react-infinite-scroll-component';

const QuizList = ({ userObj }) => {
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [titleSearched, setTitleSearched] = useState('');
  const [myQuizzesChecked, setMyQuizzesChecked] = useState(false);
  const [filteringId, setFilteringId] = useState(0);
  const [allQuizzes, setAllQuizzes] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [start, setStart] = useState(0);
  const [count, setCount] = useState(10);

  useEffect(() => {
    fetchQuizzes();
  }, [filteringId]);

  useEffect(() => {
    filterQuizzes();
  }, [myQuizzesChecked, titleSearched]);

  console.log('quizzes', quizzes);

  const fetchQuizzes = async () => {
    setLoading(true);
    try {
      setStart(start + count);
      console.log('fetch Quiz');
      const res = await quizService.getAll(filteringId);
      console.log('fetch Quiz Result', res);
      setAllQuizzes(res.data);

      let arr = [];
      for (let i = start; i < count; i++) {
        arr.push(res.data[i]);
      }
      setQuizzes(quizzes.concat(arr));
    } catch (e) {
      console.log(e.message);
    }
    setLoading(false);
  };

  const handleSort = (tag) => {
    setFilteringId(tag.id);
  };

  const filterQuizzes = () => {
    let searchResult = [];
    if (myQuizzesChecked) {
      searchResult = (titleSearched ? titleSearched : allQuizzes).filter(
        (quiz) => quiz.users_id === userObj.id
      );
    } else {
      searchResult = titleSearched ? titleSearched : allQuizzes;
    }
    setQuizzes(searchResult);
  };

  const searchByTitle = (str) => {
    const value = str.toLowerCase();
    inputRef.current.focus({
      cursor: 'all',
    });
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
      console.log(e.message);
    }
    setLoading(false);
  };

  const filterByUser = async (e) => {
    setLoading(true);
    try {
      if (e.target.checked) {
        setMyQuizzesChecked(true);
      } else {
        setMyQuizzesChecked(false);
      }
    } catch (e) {
      console.log(e.message);
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
                background={filteringId === tag.id ? '#8176F5' : undefined}
                colorselect={filteringId === tag.id ? '#fff' : undefined}
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

      {/* {loading ? (
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
      )} */}

      <InfiniteScroll
        dataLength={quizzes.length}
        next={fetchQuizzes}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <CardsWrapper>
          {quizzes.map((quiz) => (
            <QuizCard
              quiz={quiz}
              fetchQuizzes={fetchQuizzes}
              userObj={userObj}
            />
          ))}
        </CardsWrapper>
      </InfiniteScroll>
    </>
  );
};

export default QuizList;
