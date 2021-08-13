import styles from '../ui/css/Home.module.css';

/**
 * Loading component
 */
export const Loading: React.FC = (): React.ReactElement => {
  return (
    <div className={`${styles['main-body']} full-screen flex-center`}>
      <div className={`${styles.box} flex-center opacity-75 shadow-50`}>
        <div className="flex-col-container">
          <div className={styles['details-container']}>
            <h1>Loading...</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
