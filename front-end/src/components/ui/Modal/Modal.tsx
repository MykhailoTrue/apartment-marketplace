import { FC, PropsWithChildren } from 'react';
import classes from './Modal.module.css';

interface ModalProps {
  opened?: boolean;
  onClose: () => void;
}

const Modal: FC<PropsWithChildren<ModalProps>> = ({
  opened,
  onClose,
  children,
}) => {
  const rootClasses = [classes.modal];
  if (opened) {
    rootClasses.push(classes.opened);
  }

  return (
    <div className={rootClasses.join(' ')} onClick={() => onClose()}>
      <div
        className={classes.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
