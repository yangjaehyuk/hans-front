import React, { useEffect, useState } from 'react';
import { HomeCarousel, HomeCard } from '../../components/home';
import styled from 'styled-components';
import { TextBox } from '../../stores/atom/text-box';
import { Spin } from 'antd';
import PostAPI from '../../api/post-api';
import { getCookie } from '../../utils/cookie';
import { memberState } from '../../stores/atom/member-atom';
import { useRecoilValue } from 'recoil';
import { useCustomNavigate } from '../../hooks';
import { ROUTES } from '../../constants/routes';
const Home = () => {
  const accessToken = getCookie('accessToken');
  const memberData = useRecoilValue(memberState);
  const { handleChangeUrl } = useCustomNavigate();
  // console.log(memberData.nickname, memberData.profileImage);
  // heres to you loading
  const [isLoading1, setIsLoading1] = useState(true);

  // new arrivals loading
  const [isLoading2, setIsLoading2] = useState(true);
  const [timeArr, setTimeArr] = useState([]);
  useEffect(() => {
    //heres to you

    // time desc
    setIsLoading2(true);
    const fetchData2 = async () => {
      try {
        const res2 = await PostAPI.viewRecentPostsAPI();
        setTimeArr(res2.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading2(false);
      }
    };
    fetchData2();
  }, []);
  const arr = [
    {
      thumbnail_img_url:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMRs2OVbsbczIHMpdR0BGeMF8x1_fbHkZR5w&s',
      title: '아이브 가을',
      nickname: 'ivegaeul',
      postId: 1,
    },
    {
      thumbnail_img_url:
        'data:image/jpeg;base64,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',
      title: '아이브 레이',
      nickname: 'iverei',
      postId: 2,
    },
    {
      thumbnail_img_url:
        'data:image/jpeg;base64,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',
      title: '아이브 장원영',
      nickname: 'ivewonyoung',
      postId: 3,
    },
    {
      thumbnail_img_url:
        'data:image/jpeg;base64,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',
      title: '아이브 안유진',
      nickname: 'iveyujin',
      postId: 4,
    },
  ];
  console.log(timeArr);

  return (
    <Container>
      <HomeCarousel />
      <SubContainer>
        <DeepInner>
          <div
            style={{
              paddingBottom: '7vh',
              cursor: 'default',
              margin: '0 auto',
            }}
          >
            <TextBox typography="h1" fontWeight={'700'}>
              Here&apos;s to you
            </TextBox>
          </div>
          {accessToken &&
          memberData.nickname !== '' &&
          memberData.profileImage !== '' ? (
            <InnerContainer>
              {arr.map((item, index) => (
                <HomeCard
                  key={index}
                  thumbnail_img_url={item.thumbnail_img_url}
                  title={item.title}
                  nickname={item.nickname}
                  postId={item.postId}
                />
              ))}
            </InnerContainer>
          ) : (
            <>
              <InnerContainer>
                {arr.map((item, index) => (
                  <HomeCard
                    key={index}
                    thumbnail_img_url={item.thumbnail_img_url}
                    title={item.title}
                    nickname={item.nickname}
                    postId={item.postId}
                  />
                ))}
              </InnerContainer>
              <InnerText>
                To view personalized products,{' '}
                <div
                  onClick={() => {
                    handleChangeUrl(ROUTES.SIGNIN);
                  }}
                >
                  sign in
                </div>{' '}
                to our website.
              </InnerText>
            </>
          )}
        </DeepInner>
      </SubContainer>
      <SubContainer>
        <Inner>
          <div
            style={{
              paddingBottom: '7vh',
              cursor: 'default',
              margin: '0 auto',
            }}
          >
            <TextBox typography="h3" fontWeight={'700'}>
              New Arrivals
            </TextBox>
          </div>

          {isLoading2 ? (
            <LoadingContainer>
              <BlackSpin size="large" />
            </LoadingContainer>
          ) : (
            <InnerContainer>
              {timeArr.map((item, index) => (
                <HomeCard
                  key={index}
                  thumbnail_img_url={item.thumbNailImgUrl}
                  title={item.title}
                  nickname={item.nickname}
                  postId={item.postId}
                />
              ))}
            </InnerContainer>
          )}
        </Inner>
      </SubContainer>
    </Container>
  );
};

const InnerText = styled.div`
  margin: 0 auto;
  font-size: 5vh;
  cursor: default;
  padding-top: 5vh;
  div {
    display: inline;
    cursor: pointer;
  }
  & div:hover {
    font-weight: bold;
  }
`;
const LoadingContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const BlackSpin = styled(Spin)`
  .ant-spin-dot {
    i {
      background: black;
    }
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const SubContainer = styled.div`
  margin: 0 auto;
  width: 80vw;
  padding: 10vh 0 10vh 0;
`;

const InnerContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(25%, 1fr));
  align-items: center;
  justify-content: center;
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10vh 1vw 10vh 1vw;
`;
const DeepInner = styled(Inner)`
  border: 1px solid black;
`;

export default Home;
