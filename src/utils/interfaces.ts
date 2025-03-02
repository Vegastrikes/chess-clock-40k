import Clock from './clock';

interface GameSettings {
  player1: Player;
  player2: Player;
}

interface Player {
  [key:string]: any;
  username: string;
  clock: Clock;
}

interface Time {
  [key:string]: any;
  hour: number,
  minute: number,
  second: number
}

export {
  type GameSettings,
  type Player,
  type Time
}