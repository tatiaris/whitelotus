import styles from '../ui/css/Home.module.css';

/**
 * Loading component
 */
export const Loading: React.FC = (): React.ReactElement => {
  return (
    <div className={`${styles['main-body']} full-screen flex-center`}>
      <div className="flex-col-container">
        <div className={styles['lds-grid']}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
