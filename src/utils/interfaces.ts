import Player from './player';

interface GameSettings {
  player1: Player;
  player2: Player;
}

interface Time {
  [key:string]: any;
  hour: number,
  minute: number,
  second: number
}

export {
  type GameSettings,
  type Time
}