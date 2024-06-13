// src/pages/detail.js
import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const DetailContainer = styled.div`
  padding: 20px;
`;

const PostHeader = styled.div`
  margin-bottom: 20px;
  text-align: center;
`;

const PostTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

const PostContent = styled.div`
  margin-bottom: 20px;
  text-align: center;
  border: 1px solid #ddd; /* 테두리 추가 */
  padding: 20px; /* 내용과 테두리 사이에 여백 추가 */
`;

const PostImage = styled.img`
  max-width: 100%;  // 이미지의 최대 너비를 100%로 설정
  height: 50vh;   // 이미지의 높이를 50vh로 설정
  margin-bottom: 20px;
`;

const PostFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  border: 1px solid #ddd; /* 테두리 추가 */
  padding: 20px; /* 내용과 테두리 사이에 여백 추가 */
`;

const AuthorInfo = styled.div`
  margin-bottom: 10px;
  font-size: 16px;
`;

const LikeSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const LikeButton = styled.button`
  margin-right: 10px;
  padding: 10px 20px;
  background-color: #ff6f61;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #ff4f41;
  }
`;

const LikeCount = styled.span`
  font-size: 16px;
`;

const Hashtags = styled.div`
  margin-bottom: 20px;
  text-align: center;
  font-size: 16px;
`;

const TermsPrivacy = styled.div`
  font-size: 12px;
  color: gray;
  text-align: center;
  margin-top: 20px;
`;

const Detail = () => {
  const { postId } = useParams();

  return (
    <DetailContainer>
      <PostHeader>
        <PostTitle>참고 하기 좋은 직장인 여름 코디(^0^)</PostTitle>
      </PostHeader>
      <PostContent>
        <PostImage 
          src="https://cdn-img.thehandsome.com/studio/goods/MU/2E/SS/MU2E1WSC017W6O_LB_W01.jpg?rs=684X1032" 
          alt="Summer Office Fashion" 
        />
        <p>@@ 이렇게 입으면 오땡?</p>
        <p>참고 하기 좋은 직장인 여름 코디(^0^)</p>
        <p>@@ 이렇게 입으면 오땡?</p>
      </PostContent>
      <PostFooter>
        <AuthorInfo>작성자: yangjaehyuk_</AuthorInfo>
        <LikeSection>
          <LikeButton>좋아요</LikeButton>
          <LikeCount>좋아요 100개</LikeCount>
        </LikeSection>
        <Hashtags>
          <p>#여름코디 #여자코디 #출근룩 #직장인코디 #직장인룩 #직딩룩</p>
        </Hashtags>
      </PostFooter>
    </DetailContainer>
  );
};

export default Detail;
