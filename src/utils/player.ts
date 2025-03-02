import Clock from "./clock";

class Player {
    [key:string]: any;

    username: string;
    clock: Clock;
    private turn: boolean;
    constructor(username: string) {
        this.username = username || "default";
        this.clock = new Clock({hour: 2, minute: 30, second: 0});
        this.turn = false;
    }

    public setTurn (v: boolean) {
        this.turn = v;
    }

    public getTurn (): boolean {
        return this.turn;
    }

    public changeTurn () {
        this.turn = !this.turn;
        this.clock.startStop();
    }
}

export default Player;