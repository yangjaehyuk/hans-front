import React from 'react';
import { Layout, Outlet } from 'antd';
import { Footer as CustomFooter } from './components/layouts/footer';
import styled from 'styled-component';
const { Footer, Header } = Layout;

const layout = () => {
  return (
    <Layout>
      <Header></Header>
      <StyledContent>
        <Outlet />
      </StyledContent>

      <Footer>
        <CustomFooter />
      </Footer>
    </Layout>
  );
};

export default layout;

const StyledContent = styled(Layout.Content)`
  max-width: 1024px;
  margin: 0 auto;
`;
