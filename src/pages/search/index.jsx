import React from 'react';
import { useParams } from 'react-router-dom';

const Search = () => {
  let { query } = useParams();

  return (
    <div className="search">
      <p>현재 페이지의 파라미터는 {query} 입니다.</p>
    </div>
  );
};

export default Search;
