interface GameSettings {
  p1: PlayerSettings;
  p2: PlayerSettings;
}

interface PlayerSettings {
  username?: string;
  hour?: number;
  minute?: number;
  second?: number;
}

const defaultSettings: PlayerSettings = {
  hour: 2,
  minute: 30,
  second: 0
}

class GameState {
  [key:string]: any;
  private static instance: GameState;
  public static getInstance(): GameState {
    if (!GameState.instance) {
      GameState.instance = new GameState({
        p1: {...defaultSettings, username: "player1"},
        p2: {...defaultSettings, username: "player2"}
      });
    }
    return GameState.instance;
  }

  step: string;
  turn: number;
  p1: PlayerSettings;
  p2: PlayerSettings;

  private constructor(gameSettings: GameSettings) {
    this.step = "settings";
    this.turn = 1;
    this.p1 = gameSettings.p1;
    this.p2 = gameSettings.p2;
  }
}

export default GameState.getInstance();