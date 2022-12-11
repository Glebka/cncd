import { AppDispatch, MachineStateActions } from "../store";
import { BaseGrblHandler } from "./BaseGrblHandler";
import { IController } from "./types";
const { setStatus, processStatusReport } = MachineStateActions;

const STATUS_QUERY_INTERVAL_MS = 500;

export class MachineStateHandler extends BaseGrblHandler {
  private _dispatch: AppDispatch;
  private _statusReqTimerHandle!: NodeJS.Timer;

  constructor(dispatch: AppDispatch) {
    super();
    this._dispatch = dispatch;
  }

  onConnected(c: IController): void {
    this._dispatch(setStatus("Initial"));
    c.sendReset();
    this._statusReqTimerHandle = setInterval(() => {
      c.sendReqStatus();
    }, STATUS_QUERY_INTERVAL_MS);
  }

  onConnectionError(_: IController): void {
    this._dispatch(setStatus("Disconnected"));
    if (this._statusReqTimerHandle) {
      clearInterval(this._statusReqTimerHandle);
    }
  }

  onDisconnected(_: IController): void {
    this._dispatch(setStatus("Disconnected"));
    if (this._statusReqTimerHandle) {
      clearInterval(this._statusReqTimerHandle);
    }
  }

  onStatusReport(_: IController, report: string): void {
    this._dispatch(processStatusReport(report));
  }

  onMessage(_: IController, msg: string): void {
    console.log(msg);
  }
}
