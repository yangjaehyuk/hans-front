import { Layout } from 'antd';
import React from 'react';
import MainHeader from './components/layouts/main-header';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CustomFooter from './components/layouts/footer';
const MainLayout = ({ children }) => {
  return (
    <Layout>
      <MainHeader></MainHeader>
      <StyledContent>{children}</StyledContent>
      <CustomFooter />
    </Layout>
  );
};
const StyledContent = styled(Layout.Content)`
  max-width: 1280px;
  margin: 0 auto;
`;
export default MainLayout;
MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
