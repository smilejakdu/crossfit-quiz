import React, { useEffect, useState, useRef } from 'react';
import { Empty, Skeleton, Button } from 'antd';
import {
  StyledSearch,
  Filter,
  SearchWrapper,
  TagWrapper,
  StyledTag,
} from '../styles/quizList';
import { quizService } from '../service/quizzes';
import QuizCard from './QuizCard';
import { CardsWrapper, EmptyWrapper, SkeletonWrapper } from '../globalStyles';
import { sortingOptions } from '../constants';
import InfiniteScroll from 'react-infinite-scroll-component';
import { RedoOutlined } from '@ant-design/icons';
import { CheckboxWrapper, StyledCheckbox } from '../styles/searchBar';

const QuizList = ({ userObj }) => {
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [titleSearched, setTitleSearched] = useState('');
  const [myQuizzesChecked, setMyQuizzesChecked] = useState(false);
  const [filteringId, setFilteringId] = useState(0);
  const [allQuizzes, setAllQuizzes] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [showAllBtn, setShowAllBtn] = useState(false);
  const [start, setStart] = useState(0);
  const count = 10;

  useEffect(() => {
    fetchQuizzes();
  }, []);

  useEffect(() => {
    const sorted = allQuizzes.reverse();
    setQuizzes(sorted);
  }, [allQuizzes]);

  useEffect(() => {
    fetchQuizzes();
  }, [filteringId]);

  useEffect(() => {
    filterQuizzes();
  }, [myQuizzesChecked, titleSearched]);

  const fetchQuizzes = async () => {
    setLoading(true);
    try {
      const res = await quizService.getAll(filteringId);
      console.log('fetch Quiz Result', res);
      setAllQuizzes(res.data.result);
      let arr = [];
      for (
        let i = start;
        i < Math.min(start + count, res.data.result.length);
        i++
      ) {
        arr.push(res.data.result[i]);
      }
      setQuizzes(quizzes.concat(arr));
      setStart(start + count);
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
    setShowAllBtn(true);
    setLoading(true);
    try {
      let searchResult = [];
      if (!value) {
        searchResult = allQuizzes;
        setTitleSearched('');
        setShowAllBtn(false);
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

  const resetFilter = () => {
    setShowAllBtn(false);
    setQuizzes(allQuizzes);
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
            <CheckboxWrapper>
              <StyledCheckbox onChange={filterByUser}>
                내가 만든 퀴즈
              </StyledCheckbox>
              {showAllBtn && (
                <Button type="link" size="small" onClick={resetFilter}>
                  <RedoOutlined />
                  모든 카드
                </Button>
              )}
            </CheckboxWrapper>
          )}
        </Filter>
      </SearchWrapper>

      {quizzes.length === 0 ? (
        loading ? (
          <SkeletonWrapper>
            <Skeleton active />
          </SkeletonWrapper>
        ) : (
          <EmptyWrapper>
            <Empty description="검색 결과가 없습니다." />
          </EmptyWrapper>
        )
      ) : (
        <InfiniteScroll
          dataLength={quizzes.length}
          next={fetchQuizzes}
          hasMore={true}
        >
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
        </InfiniteScroll>
      )}
    </>
  );
};

export default QuizList;
