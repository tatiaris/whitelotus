import { useState } from 'react';

export default function Home() {
  const [roomId, setRoomId] = useState('');
  const goToRoom = () => {
    location.href = `/room/${roomId}`;
  };

  return (
    <div>
      <div style={{ width: '250px' }}>
        <input onChange={(e) => setRoomId(e.target.value)} type="text" placeholder="room id" />
      </div>
      <button onClick={goToRoom}>submit</button>
    </div>
  );
}
