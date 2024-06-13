import { Modal } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';

const SearchContainer = ({ open, onCancel, confirmLoading, modalText }) => {
  return (
    <Modal
      title="Search"
      open={open}
      footer={null}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
    >
      {modalText}
    </Modal>
  );
};

SearchContainer.propTypes = {
  open: PropTypes.bool.isRequired,
  onSearch: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  confirmLoading: PropTypes.bool.isRequired,
  modalText: PropTypes.node.isRequired,
};

export default SearchContainer;
