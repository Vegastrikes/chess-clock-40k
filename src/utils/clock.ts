import { Time } from "./interfaces";

class Clock {
  [key:string]: any;

  isRunning: boolean;
  isFinished: boolean

  constructor(time: Time) {
    this.time = time;
    this.isRunning = false;
    this.isFinished = false;
  }

  private countdownHandler!: ReturnType<typeof setInterval>;

  public setTime(i: string, v: number) {
    this.time[i] = v;
  }

  public getTime(i: string): number {
    return this.time[i];
  }

  public start() {
    this.isRunning = true;
    this.countdownHandler = setInterval(() => { this.handleCountdown() }, 1000)
  }

  public stop() {
    this.isRunning = false;
    clearInterval(this.countdownHandler);
  }

  private handleCountdown() {
    console.log('counting...')
  }
}

export default Clock;