import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Carousel } from 'antd';
import image1 from '../../assets/image/carousel1.jpg';
import image2 from '../../assets/image/carousel2.jpg';
import image3 from '../../assets/image/carousel3.jpg';
import image4 from '../../assets/image/carousel4.jpg';
import image5 from '../../assets/image/carousel5.jpg';
import image6 from '../../assets/image/carousel6.jpg';
import image7 from '../../assets/image/carousel7.jpg';
import image8 from '../../assets/image/carousel8.jpg';

const HomeCarousel = () => {
  return (
    <StyledCarousel arrows infinite={true} autoplay>
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
  max-height: 80vh;
  overflow: hidden;
`;

const StyledImage = styled.img`
  width: 100vw;
  height: 80vh;
  object-fit: fill;
`;

export default HomeCarousel;
