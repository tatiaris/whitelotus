import React from 'react';
import { PlayerObj } from '../interfaces';

/**
 * ProfilePic component
 */
interface ProfilePicConfig {
  width: number;
  height: number;
  rows: 6 | 8 | 10;
}
interface Props {
  userInfo: PlayerObj;
  config: ProfilePicConfig;
}
export const ProfilePic: React.FC<Props> = (props): React.ReactElement => {
  const { picString } = props.userInfo;
  const { width, height, rows } = props.config;
  const pixStyle0 = { width: `${width / rows}px`, height: `${height / rows}px`, backgroundColor: 'yellow' };
  const pixStyle1 = { width: `${width / rows}px`, height: `${height / rows}px`, backgroundColor: 'black' };
  const picStringArr = [];
  for (let i = 0; i < rows; i++) {
    for (let j = (i * rows) / 2; j < (i * rows) / 2 + rows / 2; j++) {
      const bit = parseInt(picString[j]);
      picStringArr.push(bit ? <div key={`pic-bit${j}`} style={pixStyle1}></div> : <div key={`pic-bit${j}`} style={pixStyle0}></div>);
    }
    for (let j = (i * rows) / 2 + (rows / 2 - 1); j >= (i * rows) / 2; j--) {
      const bit = parseInt(picString[j]);
      picStringArr.push(bit ? <div key={`pic-bit-r-${j}`} style={pixStyle1}></div> : <div key={`pic-bit-r-${j}`} style={pixStyle0}></div>);
    }
  }

  return <div style={{ width: '100px', height: '100px', display: 'flex', flexWrap: 'wrap' }}>{picStringArr}</div>;
};

export default ProfilePic;
