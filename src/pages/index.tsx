import { useEffect } from 'react';
import { FormEvent, useState } from 'react';
import { socket } from '../../util/socket';

export default function Home() {
  const [roomId, setRoomId] = useState('');
  const [gameId, setGameId] = useState('the-mind');
  const [creatingRoom, setCreatingRoom] = useState(false);

  const createRoom = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCreatingRoom(true);
    socket.emit('create_room', gameId);
  };

  const joinCreatedRoom = (room_id: string) => {
    location.href = `/room/${room_id}`;
  };
  const goToRoom = () => {
    joinCreatedRoom(roomId);
  };

  useEffect(() => {
    socket.on('room_created', joinCreatedRoom);
  }, []);

  if (creatingRoom) return <div>creating room...</div>;

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ padding: '10px' }}>
        <div>Choose the game to play:</div>
        <form onSubmit={createRoom}>
          <div>
            <select onBlur={(e) => setGameId(e.currentTarget.value)} name="game" id="game">
              <option value="the-mind">The Mind</option>
              <option value="bomb-squad">Bomb Squad</option>
            </select>
          </div>
          <div>
            <button type="submit">create</button>
          </div>
        </form>
      </div>
      <div style={{ padding: '10px' }}>
        <div>Join room:</div>
        <div style={{ width: '250px' }}>
          <input onChange={(e) => setRoomId(e.target.value)} type="text" placeholder="room id" />
        </div>
        <button onClick={goToRoom}>join</button>
      </div>
    </div>
  );
}
