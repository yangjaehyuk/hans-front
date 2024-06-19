import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card, Carousel } from 'antd';

const { Meta } = Card;

const DetailCarousel = ({ images }) => {
  const [imageBlobs, setImageBlobs] = useState([]);

  useEffect(() => {
    const fetchAndStoreBlobs = async () => {
      try {
        const fetchedBlobs = await Promise.all(
          images.map(async (element) => {
            const response = await fetch(element.imgUrl, { mode: 'cors' });
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const blob = await response.blob();
            return blob;
          }),
        );

        // Convert blobs to URLs and store in localStorage
        const blobUrls = fetchedBlobs.map((blob) => URL.createObjectURL(blob));
        console.log('여기', blobUrls);
        localStorage.setItem('imageBlobs', JSON.stringify(blobUrls));
        setImageBlobs(blobUrls);
      } catch (error) {
        console.error('Error fetching or storing blobs:', error);
      }
    };

    fetchAndStoreBlobs();

    return () => {
      // Clean up blob URLs when component unmounts
      imageBlobs.forEach((blobUrl) => URL.revokeObjectURL(blobUrl));
    };
  }, [images]);

  if (imageBlobs.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <StyledCarousel arrows infinite autoplay>
      {imageBlobs.map((blobUrl, index) => (
        <CarouselItem key={index} imgUrl={blobUrl} />
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
  height: 100vh;
  object-fit: fill;
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
