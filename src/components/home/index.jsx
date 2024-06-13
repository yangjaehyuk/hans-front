import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card, Carousel } from 'antd';
import { useCustomNavigate } from '../../hooks';

import image1 from '../../assets/image/carousel1.jpg';
import image2 from '../../assets/image/carousel2.jpg';
import image3 from '../../assets/image/carousel3.jpg';
import image4 from '../../assets/image/carousel4.jpg';
import image5 from '../../assets/image/carousel5.jpg';
import image6 from '../../assets/image/carousel6.jpg';
import image7 from '../../assets/image/carousel7.jpg';
import image8 from '../../assets/image/carousel8.jpg';

const { Meta } = Card;

const HomeCarousel = () => {
  return (
    <StyledCarousel arrows infinite autoplay>
      <CarouselItem imgUrl={image1} />
      <CarouselItem imgUrl={image2} />
      <CarouselItem imgUrl={image3} />
      <CarouselItem imgUrl={image4} />
      <CarouselItem imgUrl={image5} />
      <CarouselItem imgUrl={image6} />
      <CarouselItem imgUrl={image7} />
      <CarouselItem imgUrl={image8} />
    </StyledCarousel>
  );
};

const CarouselItem = ({ imgUrl }) => {
  return <StyledImage src={imgUrl} alt="Carousel Item" />;
};

CarouselItem.propTypes = {
  imgUrl: PropTypes.string.isRequired,
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
