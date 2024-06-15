import React from 'react';
import ErrorContainer from '../../components/error';
const Error500 = () => {
  return (
    <ErrorContainer
      title="페이지가 작동하지 않습니다."
      content="홈 화면 가기"
    />
  );
};

export default Error500;
