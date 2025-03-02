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
    if (this.isFinished) {
      return;
    }
    this.isRunning = true;
    this.countdownHandler = setInterval(() => { this.handleCountdown() }, 1000)
  }

  public stop() {
    this.isRunning = false;
    clearInterval(this.countdownHandler);
  }

  private handleCountdown() {
    const t = this.time;

    if (t.second > 0) {
      t.second -= 1;
      return;
    }

    if (t.minute > 0) {
      t.minute -= 1;
      t.second = 59;
      return;
    }

    if (t.hour > 0) {
      t.hour -= 1;
      t.minute = 59;
      t.second = 59;
      return;
    }

    this.finish()
  }

  private finish() {
    this.stop();
    this.isFinished = true;
  }
}

export default Clock;