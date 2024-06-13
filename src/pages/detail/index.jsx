// src/pages/detail.js
import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { HeartOutlined } from '@ant-design/icons';

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-top: 20px; /* 위와의 간격을 띄우기 위해 추가 */
`;

const PostWrapper = styled.div`
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  width: 600px;
  margin-bottom: 20px;
  background-color: white;
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 14px;
  border-bottom: 1px solid #dbdbdb;
`;

const ProfileImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 14px;
`;

const AuthorName = styled.span`
  font-weight: bold;
`;

const PostImage = styled.img`
  width: 100%;
  height: auto;
`;

const PostContent = styled.div`
  padding: 14px;
`;

const LikeSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const LikeIcon = styled(HeartOutlined)`
  margin-right: 8px; /* 아이콘과 텍스트 사이의 간격 추가 */
  font-size: 24px;
  cursor: pointer;

  &:hover {
    color: #ff6f61;
  }
`;

const LikeCount = styled.span`
  font-weight: bold;
`;

const PostDescription = styled.div`
  margin-bottom: 10px;
`;

const Hashtags = styled.div`
  color: #00376b;
`;

const CommentSection = styled.div`
  border-top: 1px solid #dbdbdb;
  padding: 14px;
`;

const Comment = styled.div`
  margin-bottom: 10px;
`;

const CommentInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  margin-top: 10px;
`;

const Detail = () => {
  const { postId } = useParams();

  return (
    <DetailContainer>
      <PostWrapper>
        <PostHeader>
          <ProfileImage src="https://via.placeholder.com/32" alt="Profile" />
          <AuthorName>yangjaehyuk_</AuthorName>
        </PostHeader>
        <PostImage 
          src="https://cdn-img.thehandsome.com/studio/goods/MU/2E/SS/MU2E1WSC017W6O_LB_W01.jpg?rs=684X1032" 
          alt="Summer Office Fashion" 
        />
        <PostContent>
          <LikeSection>
            <LikeIcon />
            <LikeCount>좋아요 100개</LikeCount>
          </LikeSection>
          <PostDescription>
            <strong>yangjaehyuk_ </strong>참고 하기 좋은 직장인 여름 코디(^0^)
          </PostDescription>
          <Hashtags>#여름코디 #여자코디 #출근룩 #직장인코디 #직장인룩 #직딩룩</Hashtags>
        </PostContent>
        <CommentSection>
          <Comment>
            <strong>user1 </strong>좋은 정보 감사합니다!
          </Comment>
          <Comment>
            <strong>user2 </strong>정말 유용해요!
          </Comment>
          <CommentInput type="text" placeholder="댓글을 입력하세요..." />
        </CommentSection>
      </PostWrapper>
    </DetailContainer>
  );
};

export default Detail;
