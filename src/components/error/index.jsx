import { useCustomNavigate } from '../../hooks';
import { Layout, Button } from 'antd';
import styled from 'styled-components';
import { TextBox } from '../../stores/atom/text-box';

import PropTypes from 'prop-types';
import { colors } from '../../constants/colors';
const ErrorContainer = ({ title, content }) => {
  const { handleChangeUrl } = useCustomNavigate();
  return (
    <StyledContent>
      <TextBox
        typography="h3"
        color={'black900'}
        textAlign="center"
        fontWeight={'500'}
        cursor="default"
      >
        {title}
      </TextBox>
      <StyledButton onClick={() => handleChangeUrl('/')} type="primary">
        <TextBox typography="h5" fontWeight={'700'} textAlign="center">
          {content}
        </TextBox>
      </StyledButton>
    </StyledContent>
  );
};

ErrorContainer.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

const StyledContent = styled(Layout.Content)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;

  height: 666px;

  gap: 32px;
`;

const StyledButton = styled(Button)`
  width: 300px;
  height: 54px;
  border-radius: 2px;
  padding: 12px 32px 12px 32px;
  border: 1px solid ${colors.black900};
  background-color: ${colors.black900};
  color: white;

  &:hover {
    background-color: ${colors.black900} !important;
    border-color: ${colors.black900} !important;
    color: white !important;
  }
`;

export default ErrorContainer;
