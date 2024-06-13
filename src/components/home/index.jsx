import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card, Carousel } from 'antd';
import { motion } from 'framer-motion';
import { useCustomNavigate } from '../../hooks';

import image1 from '../../assets/image/carousel0.jpg';
import image3 from '../../assets/image/carousel2.jpg';
import image4 from '../../assets/image/carousel3.jpg';
import image5 from '../../assets/image/carousel4.jpg';
import image6 from '../../assets/image/carousel6.jpg';
import image7 from '../../assets/image/carousel7.jpg';
import image8 from '../../assets/image/carousel8.jpg';

const { Meta } = Card;

const HomeCarousel = () => {
  const [animate, setAnimate] = useState(true);

  const handleBeforeChange = () => {
    setAnimate(false);
  };

  const handleAfterChange = () => {
    setAnimate(true);
  };

  return (
    <StyledCarousel
      arrows
      infinite
      autoplay
      beforeChange={handleBeforeChange}
      afterChange={handleAfterChange}
    >
      <CarouselItem
        imgUrl={image1}
        text1="OBZÉÉ"
        text2="뉴 시즌"
        text3="슬리브리스 탑 GIFT를 드려요"
        animate={animate}
      />
      <CarouselItem
        imgUrl={image3}
        text1="랑방블랑"
        text2="With SERI PAK"
        text3="볼마커 GIFT & 2만원 혜택까지"
        animate={animate}
      />
      <CarouselItem
        imgUrl={image4}
        text1="New In"
        text2="MINE"
        text3="하나만 걸쳐도 우아한 마인 신상품"
        animate={animate}
      />
      <CarouselItem
        imgUrl={image5}
        text1="MODERN"
        text2="CLASSIC"
        text3="베로니카 비어드 썸머 드롭"
        animate={animate}
      />
      <CarouselItem
        imgUrl={image6}
        text1="SJSJ X"
        text2="Mia Le Journal"
        text3="더한섬닷컴 단독 이벤트까지"
        animate={animate}
      />
      <CarouselItem
        imgUrl={image7}
        text1="Summer"
        text2="Vacation"
        text3="바캉스를 위한 스윔웨어 아그넬"
        animate={animate}
      />
      <CarouselItem
        imgUrl={image8}
        text1="시스템옴므의"
        text2="새 계절"
        text3="멋스러운 뉴 시즌을 만나보세요"
        animate={animate}
      />
    </StyledCarousel>
  );
};

const CarouselItem = ({ imgUrl, text1, text2, text3, animate }) => {
  return (
    <ItemContainer>
      <StyledImage src={imgUrl} alt="Carousel Item" />
      <TextContainer>
        {text1 && (
          <StyledTextOverlay
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: animate ? 1 : 0, x: animate ? 0 : 50 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            fontSize="4rem"
            lineHeight="4.8rem"
          >
            {text1}
          </StyledTextOverlay>
        )}
        {text2 && (
          <StyledTextOverlay
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: animate ? 1 : 0, x: animate ? 0 : 50 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            fontSize="4rem"
            lineHeight="4.8rem"
          >
            {text2}
          </StyledTextOverlay>
        )}
        {text3 && (
          <StyledTextOverlay
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: animate ? 1 : 0, x: animate ? 0 : 50 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            fontSize="1.8rem"
            lineHeight="4.6rem"
          >
            {text3}
          </StyledTextOverlay>
        )}
      </TextContainer>
    </ItemContainer>
  );
};

CarouselItem.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  text1: PropTypes.string.isRequired,
  text2: PropTypes.string.isRequired,
  text3: PropTypes.string.isRequired,
  animate: PropTypes.bool.isRequired,
};

const StyledCarousel = styled(Carousel)`
  max-width: 100vw;
  margin: 0 auto;
  max-height: 80vh;
  overflow: hidden;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 80vh;
  object-fit: fill;
`;

const ItemContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

const TextContainer = styled.div`
  position: absolute;
  top: 30%;
  left: 5%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledTextOverlay = styled(motion.div)`
  transform: translateY(-50%);
  font-size: ${(props) => props.fontSize};
  line-height: ${(props) => props.lineHeight};
  opacity: 1;
  color: white;
`;

const HomeCard = ({ imageUrl, title, nickname, url }) => {
  const { handleChangeUrl } = useCustomNavigate();

  return (
    <CardContainer>
      <StyledCard
        hoverable
        style={{ width: 240 }}
        cover={<StyledCardCover alt="example" src={imageUrl} />}
        onClick={() => handleChangeUrl(url)}
      >
        <Meta title={title} description={nickname} />
      </StyledCard>
    </CardContainer>
  );
};

HomeCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  nickname: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const StyledCard = styled(Card)`
  width: 240px;
`;

const StyledCardCover = styled.img`
  height: 300px;
  object-fit: fill;
`;

export { HomeCarousel, HomeCard };
