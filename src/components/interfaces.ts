export interface exampleInterface {
  name: string;
}

export interface joiningData {
  userInfo: PlayerObj;
  gameType: string;
}

export interface PlayerObj {
  username: string;
  picString: string;
  admin: boolean;
}

export interface roomJsonObj {
  totalPlayers: number;
  players: Record<string, PlayerObj>;
  spectators: Record<string, PlayerObj>;
  gameType: string;
  inProgress: boolean;
}
