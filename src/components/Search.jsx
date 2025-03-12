import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [search, setSearch] = useState('');

  // 입력값 업데이트
  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  // 엔터 입력 시 검색 실행
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch(search); // 부모 컴포넌트로 검색어 전달
    }
  };

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={onChangeSearch}
        onKeyPress={handleKeyPress} // 엔터 키 감지
        placeholder="영화 찾기"
      />
    </div>
  );
};

export default Search;
