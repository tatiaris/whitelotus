import styles from '../ui/css/Modal.module.css';

/**
 * Modal component
 */
interface ModalProps {
  visible: boolean;
  setVisible: CallableFunction;
  content: any;
}
export const Modal: React.FC<ModalProps> = (props): React.ReactElement => {
  const { visible, content, setVisible } = props;

  const backdropClicked = (e) => {
    console.log('backdrop clicked', e.target);
    if (e.target.id == 'modal-backdrop') {
      setVisible(false);
    }
  };

  return (
    <div onClick={backdropClicked} onKeyDown={backdropClicked} role="presentation" id="modal-backdrop" className={`${styles[`modal-backdrop${visible ? '-visible' : ''}`]} full-screen flex-center`}>
      <div className={`${styles['modal-box']} shadow-50`}>{content}</div>
    </div>
  );
};

export default Modal;
