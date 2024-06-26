import React from 'react';
import ErrorContainer from '../../components/error';

/** This is an error page that error status code numbered 404. */
const Error404 = () => {
  return (
    <ErrorContainer
      title="페이지를 찾을 수 없습니다."
      content="홈 화면 가기"
    ></ErrorContainer>
  );
};

export default Error404;
