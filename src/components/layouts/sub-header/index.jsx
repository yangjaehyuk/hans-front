import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TextBox } from '../../../stores/atom/text-box';

const SubHeader = ({ title }) => {
  return (
    <HeaderContainer>
      <TitleContainer>
        <TextBox typography="h2" fontWeight={'700'} cursor="default">
          {title}
        </TextBox>
      </TitleContainer>
    </HeaderContainer>
  );
};

SubHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 20vh;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default SubHeader;
