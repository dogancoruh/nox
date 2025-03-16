import { NoxDebugLogType } from "../enums/nox-debug-log-type";

export class NoxDebugEvent {
    type: NoxDebugLogType = "none";
    message!: string;
    params?: any[];
}