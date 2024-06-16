import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card, Carousel } from 'antd';

const { Meta } = Card;

const DetailCarousel = ({ images }) => {
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
      {images.map((element, index) => (
        <CarouselItem key={index} imgUrl={element.imgUrl} />
      ))}
    </StyledCarousel>
  );
};

DetailCarousel.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      imgUrl: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

const CarouselItem = ({ imgUrl }) => {
  return (
    <ItemContainer>
      <StyledImage src={imgUrl} alt="Carousel Item" />
    </ItemContainer>
  );
};

CarouselItem.propTypes = {
  imgUrl: PropTypes.string.isRequired,
};

const StyledCarousel = styled(Carousel)`
  max-width: 100vw;
  margin: 0 auto;
  overflow: hidden;
  height: 100%;
`;
const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ItemContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const DetailCard = ({ productPrice, productImg, productUrl, productName }) => {
  const formattedPrice = `${new Intl.NumberFormat().format(productPrice)} 원`;
  return (
    <CardContainer>
      <StyledCard
        hoverable
        style={{ width: 240 }}
        cover={<StyledCardCover alt="example" src={productImg} />}
        onClick={() => (window.location.href = productUrl)}
      >
        <Meta title={productName} description={formattedPrice} />
      </StyledCard>
    </CardContainer>
  );
};

DetailCard.propTypes = {
  productPrice: PropTypes.number.isRequired,
  productImg: PropTypes.string.isRequired,
  productUrl: PropTypes.string.isRequired,
  productName: PropTypes.string.isRequired,
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

export { DetailCarousel, DetailCard };
