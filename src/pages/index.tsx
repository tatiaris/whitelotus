import { useEffect } from 'react';
import { useState } from 'react';
import { socket } from '../../util/socket';
import Loading from '../components/common/Loading';
import styles from '../components/ui/css/Home.module.css';

export default function Home() {
  const [roomId, setRoomId] = useState('');
  const [gameId, setGameId] = useState('the-mind');
  const [creatingRoom, setCreatingRoom] = useState(false);

  const createRoom = () => {
    if (gameId !== 'choose') {
      setCreatingRoom(true);
      socket.emit('create_room', gameId);
    }
  };

  const joinCreatedRoom = (room_id: string) => {
    location.href = `/room/${room_id}`;
  };
  const goToRoom = (e) => {
    e.preventDefault();
    if (roomId.length > 0) joinCreatedRoom(roomId);
  };

  useEffect(() => {
    socket.on('room_created', joinCreatedRoom);
  }, []);

  if (creatingRoom) return <Loading />;

  return (
    <div className={`${styles['main-body']} full-screen flex-center`}>
      <div className={`${styles.box} flex-center opacity-75 shadow-50`}>
        <div className="flex-col-container">
          <div className={styles['details-container']}>
            <h1>White Lotus Games</h1>
            <p>
              <b>Play games with friends online for free.</b>
            </p>
          </div>
          <div className="flex-center">
            <select defaultValue="choose" className={`${styles.select} text-center`} onBlur={(e) => setGameId(e.currentTarget.value)} name="game" id="game">
              <option value="choose">
                Choose Game
              </option>
              <option value="the-mind">The Mind</option>
              {/* <option value="bomb-squad">Bomb Squad</option> */}
            </select>
            <button onClick={createRoom} className={`${styles.btn} shadow-25`}>
              create
            </button>
          </div>
          <div className="flex-center">
            <form onSubmit={goToRoom}>
              <input onChange={(e) => setRoomId(e.target.value.trim())} className={`${styles.inp} text-center`} type="text" placeholder="room code" />
              <button type="submit" className={`${styles.btn} shadow-25`}>
                join
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
