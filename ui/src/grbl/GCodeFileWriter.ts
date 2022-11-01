import { AppDispatch, JobActions } from "@app/store";
import { IController, IGCodeWriter, InterruptReason } from "./types";
const { incLinesProcessed, incErrorsCount, setStatus } = JobActions;

export class GCodeFileWriter implements IGCodeWriter {
  private _dispatch: AppDispatch;
  private _grbl: IController;
  private _lines!: string[];

  constructor(dispatch: AppDispatch, grbl: IController) {
    this._dispatch = dispatch;
    this._grbl = grbl;
  }

  startWriting(lines: string[]) {
    this._lines = [...lines];
    this._dispatch(setStatus("In progress"));
    this.pull(this._grbl.writeableBytes());
  }

  pull(bytes: number): boolean {
    if (this._lines.length === 0) return false;
    if (bytes - this._lines[0].length < 0) {
      return true;
    }
    const line = this._lines.shift();
    if (line !== undefined) {
      this._grbl.sendGCode(line);
    } else {
      throw new Error("Unreachable code");
    }
    return this._lines.length > 0;
  }

  ack(): void {
    this._dispatch(incLinesProcessed());
  }

  interrupt(reason: InterruptReason): void {
    switch (reason) {
      case InterruptReason.ERROR:
        this._dispatch(incErrorsCount);
        this._lines = [];
        this._dispatch(setStatus("Failed"));
        break;
      case InterruptReason.ALARM:
      case InterruptReason.RESET:
      case InterruptReason.CONNECTION_ERROR:
      default:
        this._lines = [];
        this._dispatch(setStatus("Failed"));
        break;
    }
  }
}
