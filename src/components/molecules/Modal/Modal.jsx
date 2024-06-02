// Utilities
import { createPortal } from 'react-dom';
// Components
import Backdrop from '@/components/atoms/Backdrop';
// Styles
import classes from './Modal.module.css';

const ModalOverlay = ({ children }) => {
  return <div className={classes['modal']}>{children}</div>;
};

const Modal = ({ onClose, children }) => {
  return (
    <>
      {createPortal(<Backdrop onClose={onClose} />, document.body)}
      {createPortal(<ModalOverlay>{children}</ModalOverlay>, document.body)}
    </>
  );
};

export default Modal;
