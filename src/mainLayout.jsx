import { Layout } from 'antd';
import React from 'react';
import MainHeader from './components/layouts/main-header';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CustomFooter from './components/layouts/footer';

const { Header, Content, Footer } = Layout;

const MainLayout = ({ children }) => {
  return (
    <StyledLayout>
      <StyledHeader>
        <MainHeader />
      </StyledHeader>
      <ContentWrapper>
        <Content>{children}</Content>
      </ContentWrapper>
      <StyledFooter>
        <CustomFooter />
      </StyledFooter>
    </StyledLayout>
  );
};

const StyledLayout = styled(Layout)`
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
`;

const StyledHeader = styled(Header)`
  padding: 0;
`;

const ContentWrapper = styled.div`
  width: 100%;
  overflow-x: hidden;
`;

const StyledFooter = styled(Footer)`
  width: 100%;
  padding: 0;
`;

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
