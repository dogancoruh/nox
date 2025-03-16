import { EventEmitter, Injectable, Output } from "@angular/core";
import { NoxConfigurationService } from "./nox-configuration.service";
import { NoxDebugEvent } from "../events/nox-debug-event";
import { NoxDebugParameter } from "../data/nox-debug-parameter";

@Injectable({
    providedIn: 'root'
})
export class NoxDebugService {
    registeredParameters: NoxDebugParameter[] = [];

    @Output() onLog: EventEmitter<NoxDebugEvent> = new EventEmitter<NoxDebugEvent>();

    constructor(private configurationService: NoxConfigurationService) {

    }

    log(message?: any, ...params: any[]) {
        console.log(message, ...params);

        this.onLog.emit({
            type: "log",
            message: message,
            params: params
        });
    }

    info(message?: any, ...params: any[]) {
        console.info(message, ...params);

        this.onLog.emit({
            type: "info",
            message: message,
            params: params
        });
    }

    warn(message?: any, ...params: any[]) {
        console.warn(message, ...params);

        this.onLog.emit({
            type: "warn",
            message: message,
            params: params
        });
    }

    error(message?: any, ...params: any[]) {
        console.error(message, ...params);

        this.onLog.emit({
            type: "error",
            message: message,
            params: params
        });
    }
}