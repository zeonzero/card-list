import React from 'react';
import pt from 'prop-types';
import Portal from "../Portal";

import './styles.scss';

const Modal = props => {
  const {
    children,
    isOpen,
    height,
    title,
    onClose,
    width,
  } = props;

  const style = {
    width,
    height
  };

  return isOpen ? (
    <Portal id="modal-root">
      <div className="modal-container">
        <div className="modal-backdrop" onClick={onClose}/>
        <div className="modal-item" style={style}>
          <div className="modal-header">
            <h2 className="modal-title">{title}</h2>
            <span className="modal-close" onClick={onClose}><i className="icon-x"/></span>
          </div>
          <div className="modal-body">
            {children}
          </div>
        </div>
      </div>
    </Portal>
  ) : null;
};

Modal.defaultProps = {
  title: 'Modal'
};

Modal.propTypes = {
  children: pt.node.isRequired,
  isOpen: pt.bool,
  height: pt.number,
  title: pt.string,
  onClose: pt.func.isRequired,
  width: pt.number
};

export default Modal;