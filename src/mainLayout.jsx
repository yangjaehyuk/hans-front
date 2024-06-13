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
      <Header>
        <MainHeader />
      </Header>
      <Content>
        <StyledContent>{children}</StyledContent>
      </Content>
      <StyledFooter>
        <CustomFooter />
      </StyledFooter>
    </StyledLayout>
  );
};
const StyledLayout = styled(Layout)`
  max-width: 100vw;
  min-height: 100vh;
  position: relative;
`;
const StyledContent = styled.div`
  max-width: 100vw;
  margin: 0 auto;
  padding-bottom: 10vh;
`;
const StyledFooter = styled(Footer)`
  padding: 0 !important;
`;
MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default MainLayout;