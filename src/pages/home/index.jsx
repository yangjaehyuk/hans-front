import React from 'react';
import HomeCarousel from '../../components/home';
import styled from 'styled-components';

import { Layout } from 'antd';
const Home = () => {
  return (
    <StyledLayout>
      <HomeCarousel />
    </StyledLayout>
  );
};

export default Home;

const StyledLayout = styled(Layout)`
  max-width: 100vw;
  background-color: white;
`;
