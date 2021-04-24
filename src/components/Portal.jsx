import { memo, useRef } from 'react';
import { createPortal } from 'react-dom';
import pt from 'prop-types';

const Portal = props => {
  const { id, children } = props;
  const elRef = useRef(null);

  elRef.current = document.getElementById(id) || document.createElement('div')

  return createPortal(children, elRef.current);
};

Portal.propTypes = {
  id: pt.string.isRequired,
  children: pt.node.isRequired
};

export default memo(Portal);