import { Layout } from 'antd';
import React from 'react';
import MainHeader from './components/layouts/main-header';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CustomFooter from './components/layouts/footer';

const { Header, Content } = Layout;

const MainLayout = ({ children }) => {
  return (
    <StyledLayout>
      <Header>
        <MainHeader />
      </Header>
      <Content>
        <StyledContent>{children}</StyledContent>
      </Content>
      <Footer>
        <CustomFooter />
      </Footer>
    </StyledLayout>
  );
};

const StyledLayout = styled(Layout)`
  min-height: 100vh;
  position: relative;
`;

const StyledContent = styled.div`
  max-width: 100vw;
  margin: 0 auto;
  padding-bottom: 10vh;
`;

const Footer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
`;

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
