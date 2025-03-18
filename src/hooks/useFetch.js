/* CUSTOM HOOK */
import { useState, useEffect, useMemo } from 'react';

const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
const BASE_URL = `${import.meta.env.VITE_TMDB_API_URL}`;

export const useFetch = (url, queryObject = {}) => {
  // url을 매개변수로 넣음으로써 원하는 url로 변경 가능
  const [movies, setMovies] = useState([]); // 기본값: 로컬 JSON 데이터 -> 빈 배열
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [error, setError] = useState(null); // 에러 상태 추가
  const memoizedQuery = useMemo(
    () => queryObject,
    [JSON.stringify(queryObject)],
  );

  useEffect(() => {
    const fetchMovies = async () => {
      const queries = new URLSearchParams({
        ...memoizedQuery,
        language: 'ko-KR',
      });

      try {
        const response = await fetch(`${BASE_URL}${url}?${queries}`, {
          // + url 매개변수
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
          params: {
            // 공통 파라미터
            language: 'ko',
            credits: 'true',
          },
        });

        // console.log(response);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (!data) {
          throw new Error('No movie data found');
        }
        setMovies(data);
        setLoading(false);
      } catch (error) {
        setError('영화 데이터를 불러올 수 없습니다. 다시 시도해 주세요.');
        setLoading(false);
        console.error(error);
      }
    };
    fetchMovies();
  }, [memoizedQuery]);
  return { movies, loading, error };
  // return 을 해줘야 데이터가 useFetch 쓰이는 곳에 저장되고 사용할 수 있다
};
