import { GameSettings } from "./interfaces";
import Player from "./player";

class GameState {
  [key:string]: any;
  private static instance: GameState;
  public static getInstance(): GameState {
    if (!GameState.instance) {
      GameState.instance = new GameState({
        player1: new Player("player1"),
        player2: new Player("player2")
      });
    }
    return GameState.instance;
  }

  step: string;
  isPaused: boolean;
  player1: Player;
  player2: Player;

  private constructor(gameSettings: GameSettings) {
    this.step = "settings";
    this.isPaused = true;
    this.player1 = gameSettings.player1;
    this.player2 = gameSettings.player2;
  }

  public start() {
    this.step = "game";
    this.player1.setTurn(true);
    this.player1.clock.start();
    this.isPaused = false;
  }

  public changeTurn() {
    this.player1.changeTurn();
    this.player2.changeTurn();
  }

  public pauseUnpause() {
    // Pause
    if (!this.isPaused) {
      this.isPaused = true;
      this.player1.clock.stop();
      this.player2.clock.stop();
      return;
    }

    // Unpause
    this.isPaused = false;
    if (this.player1.getTurn()) {
      this.player1.clock.start();
    }
    if (this.player2.getTurn()) {
      this.player2.clock.start();
    }
  }
}

export default GameState.getInstance();