import { GameSettings, Player } from "./interfaces";
import Clock from './clock';

class GameState {
  [key:string]: any;
  private static instance: GameState;
  public static getInstance(): GameState {
    if (!GameState.instance) {
      GameState.instance = new GameState({
        player1: {username: "player1", clock: new Clock({hour: 0, minute: 0, second: 2})},
        player2: {username: "player2", clock: new Clock({hour: 2, minute: 30, second: 0})}
      });
    }
    return GameState.instance;
  }

  step: string;
  turn: number;
  player1: Player;
  player2: Player;

  private constructor(gameSettings: GameSettings) {
    this.step = "settings";
    this.turn = 1;
    this.player1 = gameSettings.player1;
    this.player2 = gameSettings.player2;
  }

  public start() {
    this.step = "game";
  }
}

export default GameState.getInstance();