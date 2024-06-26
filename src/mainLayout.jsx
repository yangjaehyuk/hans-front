import { Layout } from 'antd';
import React from 'react';
import MainHeader from './components/layouts/main-header';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CustomFooter from './components/layouts/footer';

const { Header, Content, Footer } = Layout;

const MainLayout = ({ children }) => {
  /** layout for home, my page, style, post, edit, post detail pages */
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
  overflow-x: auto;
  white-space: nowrap;
`;

const StyledHeader = styled(Header)`
  padding: 0;
  width: 100% !important;
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
