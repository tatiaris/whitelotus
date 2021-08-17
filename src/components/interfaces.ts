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
}

export interface roomJsonObj {
  totalPlayers: number;
  currentAdmin: string;
  players: Record<string, PlayerObj>;
  spectators: Record<string, PlayerObj>;
  gameType: string;
  inProgress: boolean;
}

export interface notificationObj {
  content: string;
  type: string;
}
