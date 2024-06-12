import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TextBox } from '../../../stores/atom/text-box';

const SubHeader = ({ title }) => {
  return (
    <TitleContainer>
      <TextBox typography="h2" fontWeight={'700'} cursor="default">
        {title}
      </TextBox>
    </TitleContainer>
  );
};

SubHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

const TitleContainer = styled.div``;

export default SubHeader;
