import { navigatePath } from '../Helper';
import styles from '../ui/css/Home.module.css';

/**
 * RoomNotFound component
 */
interface RoomNotFoundProps {
  room_id: string;
}
export const RoomNotFound: React.FC<RoomNotFoundProps> = (props): React.ReactElement => {
  return (
    <div className={`${styles['main-body']} full-screen flex-center`}>
      <div className={`${styles.box} flex-center opacity-75 shadow-50`}>
        <div className="flex-col-container">
          <div className={styles['details-container']}>
            <h1>Room {props.room_id} not found.</h1>
          </div>
          <button onClick={() => navigatePath('/')} className={`${styles.btn} shadow-25`}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomNotFound;
