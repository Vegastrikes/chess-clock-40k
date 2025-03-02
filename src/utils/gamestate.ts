import { GameSettings, Player } from "./interfaces";
import Clock from './clock';

class GameState {
  [key:string]: any;
  private static instance: GameState;
  public static getInstance(): GameState {
    if (!GameState.instance) {
      GameState.instance = new GameState({
        player1: {username: "player1", clock: new Clock({hour: 2, minute: 30, second: 0})},
        player2: {username: "player2", clock: new Clock({hour: 2, minute: 30, second: 0})}
      });
    }
    return GameState.instance;
  }

  step: string;
  turn: number;
  pausedOnTurn: number;
  player1: Player;
  player2: Player;

  private constructor(gameSettings: GameSettings) {
    this.step = "settings";
    this.turn = 1;
    this.pausedOnTurn = 0;
    this.player1 = gameSettings.player1;
    this.player2 = gameSettings.player2;
  }

  public start() {
    this.step = "game";
    this.player1.clock.start();
  }

  public changeTurn() {
    if (this.turn === 1) {
      this.player1.clock.stop();
      this.player2.clock.start();
      this.turn = 2;
      return;
    }
    if (this.turn === 2) {
      this.player2.clock.stop();
      this.player1.clock.start();
      this.turn = 1;
    }
  }

  public pauseUnpause() {
    // Pause
    if (this.turn > 0) {
      this.pausedOnTurn = this.turn;
      this.player1.clock.stop();
      this.player2.clock.stop();
      this.turn = 0;
      return;
    }

    // Unpause
    this.turn = this.pausedOnTurn;
    this.pausedOnTurn = 0;

    if (this.turn === 1) {
      this.player1.clock.start();
    }

    if (this.turn === 2) {
      this.player2.clock.start();
    }
  }
}

export default GameState.getInstance();