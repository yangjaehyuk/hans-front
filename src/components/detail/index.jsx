import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card } from 'antd';
const { Meta } = Card;
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
