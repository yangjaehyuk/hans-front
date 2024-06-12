import React from 'react';
import { Layout } from 'antd';
import CustomFooter from './components/layouts/footer';
import styled from 'styled-components';
import SubHeader from './components/layouts/sub-header';
import PropTypes from 'prop-types';

const AuthLayout = ({ title, children }) => {
  return (
    <Layout>
      <SubHeader title={title} />
      <StyledContent>{children}</StyledContent>
      <CustomFooter />
    </Layout>
  );
};

export default AuthLayout;
AuthLayout.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const StyledContent = styled(Layout.Content)`
  max-width: 1280px;
  margin: 0 auto;
`;
