import { info } from "@actions/core";
import { exec } from "@actions/exec";
import { exists, existsSync, rmSync, writeFileSync } from "fs";
import { LogWriter } from "../util/logwriter";

export abstract class BaseRequest {
}

export abstract class BaseAction {
    abstract execute(request: ActionRequest):any;

    protected _shellOutput : string = "";
    protected _shellErrors : string = "";
    private _options : any = {
        listeners: {
            stdout: (data: Buffer) => {
                this._shellOutput += data.toString();
            },
            stderr: (data: Buffer) => {
                this._shellErrors += data.toString();
            }
        },
        cwd: "./"
    };


    protected async execCommandAsScript(command: string) {
        info(`Executing command ${command} as a sh file call`);
        this.resetOutputs();
        let currentDir : string = process.cwd();
        writeFileSync(`${currentDir}/tmp_script.sh`, `#!/bin/bash\n${command}`);
        await exec(`chmod +x ${currentDir}/tmp_script.sh`, [], this._options);
        this.resetOutputs();
        await exec(`sh ${currentDir}/tmp_script.sh`, [], this._options);
        LogWriter.logCommandOutputFromArray([this._shellOutput, this._shellErrors]);
        rmSync(`${currentDir}/tmp_script.sh`);
    }

    protected async execCommand(command: string, args?: string[] | []) {
        info(`Executing command [${command}] with args ${args}`);
        this.resetOutputs();
        await exec(command, args, this._options);
        LogWriter.logCommandOutputFromArray([this._shellOutput, this._shellErrors]);
    }

    protected resetOutputs() {
        this._shellErrors = "";
        this._shellOutput = "";
    }
}

export class ActionRequest extends BaseRequest {
    private _parametro_recibido1: string = "";
    private _parametro_recibido2: string = "";
    private _errMessage : string = "";

    public get parametro_recibido1(): string {
        return this._parametro_recibido1;
    }
    public set parametro_recibido1(value: string) {
        this._parametro_recibido1 = value;
    }
    public get parametro_recibido2() : string {
        return this._parametro_recibido2;
    }
    public set parametro_recibido2(newValue : string) {
        this._parametro_recibido2 = newValue;
    }
    public get errMessage() : string {
        return this._errMessage;
    }

    public isValid() : boolean {
        this._errMessage = "";
        let valid : boolean = true;
        if (!this._parametro_recibido1 || "" == this._parametro_recibido1) {
            this._errMessage += "PARAMETRO 1 NO RECIBIDO.\n";
            valid =  false;
        }
        if (!this._parametro_recibido2 || "" == this._parametro_recibido2) {
            this._errMessage += "PARAMETRO 2 NO RECIBIDO\n";
            valid =  false;
        }
        return valid;
    }

}