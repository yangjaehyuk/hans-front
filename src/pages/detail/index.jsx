// src/pages/detail.js
import React from 'react';
import { useParams } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { HeartOutlined } from '@ant-design/icons';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { TextBox } from '../../stores/atom/text-box';

const dummyData = [{}];
const Detail = () => {
  const { postId } = useParams();

  const additionalImages = [
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
  ];

  return (
    <DetailContainer>
      <GlobalStyle />
      <PostWrapper>
        <PostImageWrapper>
          <PostImage
            src="https://cdn-img.thehandsome.com/studio/goods/MU/2E/SS/MU2E1WSC017W6O_LB_W01.jpg?rs=684X1032"
            alt="Summer Office Fashion"
          />
        </PostImageWrapper>
        <PostContentWrapper>
          <PostHeader>
            <ProfileImage src="https://via.placeholder.com/32" alt="Profile" />
            <TextBox typography="body3" fontWeight={'700'}>
              yangjaehyuk_
            </TextBox>
          </PostHeader>
          <PostContent>
            <AdditionalImagesContainer>
              <TextBox typography="body2" fontWeight={'700'}>
                Related Products
              </TextBox>
              <Slider {...sliderSettings}>
                {additionalImages.map((src, index) => (
                  <div key={index}>
                    <AdditionalImage
                      src={src}
                      alt={`Additional ${index + 1}`}
                    />
                  </div>
                ))}
              </Slider>
            </AdditionalImagesContainer>
            <LikeSectionDivider /> {/* 줄 추가 */}
            <LikeSection>
              <LikeIcon />
              <LikeCount>좋아요 100개</LikeCount>
            </LikeSection>
            <PostDescription>
              <AuthorName>yangjaehyuk_ </AuthorName>사랑합니다~~~참고 하기 좋은
              직장인 여름 코디(^0^)
            </PostDescription>
            <Hashtags>
              #여름코디 #여자코디 #출근룩 #직장인코디 #직장인룩 #직딩룩
            </Hashtags>
          </PostContent>
          <CommentSection>
            <Comment>
              <ReplyName>user1 </ReplyName>좋은 정보 감사합니다! 좋은 정보
              감사합니다! 좋은 정보 감사합니다! 좋은 정보 감사합니다! 좋은 정보
              감사합니다!
            </Comment>
            <Comment>
              <ReplyName>user2 </ReplyName>정말 유용해요!
            </Comment>
            <CommentInput type="text" placeholder="댓글을 입력하세요..." />
          </CommentSection>
        </PostContentWrapper>
      </PostWrapper>
    </DetailContainer>
  );
};
const GlobalStyle = createGlobalStyle`
  .slick-slide > div {
    margin: 0 10px; /* 사진들 간의 간격을 추가 */
  }

  .slick-list {
    margin: 0 -10px; /* 슬라이더 전체 너비를 맞추기 위해 추가 */
  }
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-top: 20px; /* 위와의 간격을 띄우기 위해 추가 */
  line-height: 1.6; /* 기본 줄 간격 설정 */
`;

const PostWrapper = styled.div`
  border: 2px solid #dbdbdb; /* 외부 테두리 */
  border-radius: 10px; /* 둥근 테두리 적용 */
  width: 1000px; /* 너비를 1000px로 증가 */
  margin-bottom: 20px;
  background-color: white;
  display: flex; /* 가로로 나열하기 위해 flex 속성 추가 */
  overflow: hidden; /* 자식 요소의 테두리 반경을 부모에 맞추기 위해 추가 */
`;

const PostImageWrapper = styled.div`
  width: 60%; /* 이미지 영역을 60%로 설정 */
  border-right: 2px solid #dbdbdb; /* 내부 구분을 위한 테두리 */
`;

const PostContentWrapper = styled.div`
  width: 40%; /* 내용 영역을 40%로 설정 */
  display: flex;
  flex-direction: column;
  border-radius: 0 10px 10px 0; /* 내용 영역에 둥근 테두리 적용 */
  overflow: hidden;
  word-wrap: break-word;
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
  word-wrap: break-word;
  white-space: pre-wrap; /* 공백을 유지하면서 줄바꿈 */
`;

const ReplyName = styled.span`
  font-weight: bold;
  word-wrap: break-word;
  white-space: pre-wrap; /* 공백을 유지하면서 줄바꿈 */
`;

const PostImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px 0 0 10px; /* 이미지 영역에 둥근 테두리 적용 */
`;

const PostContent = styled.div`
  padding: 14px;
  border-bottom: 1px solid #dbdbdb; /* 내부 구분을 위한 테두리 */
`;

const LikeSectionDivider = styled.div`
  border-top: 1px solid #dbdbdb; /* 줄 추가 */
  margin: 10px 0; /* 줄 위아래 간격 추가 */
`;

const LikeSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 20px; /* LikeSection 위의 간격 추가 */
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
  line-height: 1.6; /* 줄 간격 설정 */
  word-wrap: break-word;
  white-space: pre-wrap; /* 공백을 유지하면서 줄바꿈 */
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Hashtags = styled.div`
  color: #00376b;
  line-height: 1.6; /* 줄 간격 설정 */
  word-wrap: break-word;
  white-space: pre-wrap; /* 공백을 유지하면서 줄바꿈 */
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CommentSection = styled.div`
  border-top: 1px solid #dbdbdb;
  padding: 14px;
  flex-grow: 1; /* CommentSection이 나머지 공간을 채우도록 설정 */
  line-height: 1.6; /* 줄 간격 설정 */
`;

const Comment = styled.div`
  margin-bottom: 10px;
  line-height: 1.6; /* 줄 간격 설정 */
  word-wrap: break-word;
  white-space: pre-wrap; /* 공백을 유지하면서 줄바꿈 */
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CommentInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  margin-top: 10px;
`;

const AdditionalImagesContainer = styled.div`
  margin-bottom: 10vh;
`;

const AdditionalImagesTitle = styled.h3`
  margin-bottom: 10px;
`;

const AdditionalImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 5px;
`;

const sliderSettings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  centerMode: false,
};
export default Detail;
