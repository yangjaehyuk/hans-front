import React, { useEffect, useState } from 'react';
import { HomeCarousel, HomeCard } from '../../components/home';
import styled from 'styled-components';
import { TextBox } from '../../stores/atom/text-box';
import { Spin } from 'antd';
import PostAPI from '../../api/post-api';
import HistoryAPI from '../../api/history-api';
import { useCustomNavigate } from '../../hooks';
import { ROUTES } from '../../constants/routes';
/** This is the home page. */
const Home = () => {
  const { handleChangeUrl } = useCustomNavigate();
  const [timeArr, setTimeArr] = useState(Array.from({ length: 8 }));

  // banner loading state
  const [isCheck, setIsCheck] = useState(false);
  const [isLoading1, setIsLoading1] = useState(true);

  // new arrivals loading state
  const [isLoading2, setIsLoading2] = useState(true);

  const [arr, setArr] = useState(new Array(4).fill({}));
  useEffect(() => {
    setIsLoading1(true);
    const fetchData1 = async () => {
      try {
        const res1 = await HistoryAPI.bannerAPI();
        setArr(res1.data.data);
        setIsCheck(true);
      } catch (error) {
        setIsLoading1(true);
        setIsCheck(false);
        try {
          const res2 = await PostAPI.viewRecommendPostsAPI();
          setArr(res2.data.data);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading1(false);
        }
      } finally {
        setIsLoading1(false);
      }
    };
    const fetchData2 = async () => {
      setIsLoading2(true);
      try {
        const res3 = await PostAPI.viewRecentPostsAPI();
        setTimeArr(res3.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading2(false);
      }
    };
    fetchData1();
    fetchData2();
  }, []);

  return (
    <Container>
      <HomeCarousel />
      <SubContainer>
        <Inner>
          <div
            style={{
              borderTop: '1px solid black',
              paddingBottom: '7vh',
              cursor: 'default',
              margin: '0 auto',
              paddingTop: '3.5vh',
            }}
          >
            <CustomTextBox>Here&apos;s to you</CustomTextBox>
          </div>
          {isLoading1 ? (
            <LoadingContainer>
              <BlackSpin size="large" />
            </LoadingContainer>
          ) : isCheck ? (
            <InnerContainer>
              {arr.slice(arr.length - 4, arr.length).map((item, index) => (
                <HomeCard
                  key={index}
                  thumbnail_img_url={item.thumbNailImgUrl}
                  title={item.title}
                  nickname={item.nickname}
                  postId={item.postId}
                />
              ))}
            </InnerContainer>
          ) : (
            <>
              <InnerContainer>
                {arr.slice(0, 4).map((item, index) => (
                  <HomeCard
                    key={index}
                    thumbnail_img_url={item.thumbNailImgUrl}
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
        </Inner>
      </SubContainer>
      <SubContainer>
        <Inner>
          <div
            style={{
              borderTop: '1px solid black',
              paddingBottom: '7vh',
              cursor: 'default',
              margin: '0 auto',
              paddingTop: '3.5vh',
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
              {timeArr.slice(0, 8).map((item, index) => (
                <HomeCard
                  key={index}
                  thumbnail_img_url={item?.thumbNailImgUrl} // Using optional chaining here
                  title={item?.title} // Using optional chaining here
                  nickname={item?.nickname} // Using optional chaining here
                  postId={item?.postId} // Using optional chaining here
                />
              ))}
            </InnerContainer>
          )}
        </Inner>
      </SubContainer>
    </Container>
  );
};

const CustomTextBox = styled(TextBox)`
  font-size: 4rem;
  font-weight: 700;
  padding-top: 3vh;
`;

const InnerText = styled.div`
  margin: 0 auto;
  font-size: 5vh;
  cursor: default;
  padding-top: 5vh;
  div {
    display: inline;
    cursor: pointer;
    font-weight: bold;
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

export default Home;
