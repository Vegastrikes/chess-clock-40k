interface GameSettings {
  p1: PlayerSettings;
  p2: PlayerSettings;
}

interface PlayerSettings {
  username?: string,
  hour?: number,
  minute?: number
}

class GameState {
  private static instance: GameState;
  public static getInstance(): GameState {
    if (!GameState.instance) {
      GameState.instance = new GameState({p1: {}, p2: {}});
    }
    return GameState.instance;
  }
  turn: number;
  p1: PlayerSettings;
  p2: PlayerSettings;

  private constructor(gameSettings: GameSettings) {
    this.turn = 1;
    this.p1 = gameSettings.p1;
    this.p2 = gameSettings.p2;
  }
}

export default GameState.getInstance();