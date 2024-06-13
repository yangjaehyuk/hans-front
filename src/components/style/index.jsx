import { React, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Radio } from 'antd';
import PropTypes from 'prop-types';
const StyleContainer = ({ first, second, third, fourth }) => {
  const [selectedValue, setSelectedValue] = useState('a');

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };

  useEffect(() => {
    console.log(selectedValue);
  }, [selectedValue]); // selectedValue가 변경될 때마다 useEffect가 호출됨

  return (
    <StyledRadioGroup
      defaultValue={'a'}
      value={selectedValue}
      onChange={handleChange}
    >
      <Radio.Button value="a">{first}</Radio.Button>
      <Radio.Button value="b">{second}</Radio.Button>
      <Radio.Button value="c">{third}</Radio.Button>
      <Radio.Button value="d">{fourth}</Radio.Button>
    </StyledRadioGroup>
  );
};

StyleContainer.propTypes = {
  first: PropTypes.string.isRequired,
  second: PropTypes.string.isRequired,
  third: PropTypes.string.isRequired,
  fourth: PropTypes.string.isRequired,
};
const StyledRadioGroup = styled(Radio.Group)`
  display: flex;
  align-items: center;

  .ant-radio-button-wrapper {
    border: 1px solid black;
    color: black !important;
  }

  .ant-radio-button-wrapper-checked {
    background-color: black !important;
    border-color: black !important;
    color: white !important;
  }

  .ant-radio-button-wrapper:hover {
    border-color: black !important;
    color: black !important;
  }

  .ant-radio-button-wrapper-checked:not(
      .ant-radio-button-wrapper-disabled
    ):hover {
    background-color: black !important;
    border-color: black !important;
    color: white !important;
  }

  .ant-radio-button-wrapper-disabled {
    border-color: black !important;
    color: black !important;
  }
`;

export default StyleContainer;
