"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionRequest = exports.BaseAction = exports.BaseRequest = void 0;
const core_1 = require("@actions/core");
const exec_1 = require("@actions/exec");
const fs_1 = require("fs");
const logwriter_1 = require("../util/logwriter");
class BaseRequest {
}
exports.BaseRequest = BaseRequest;
class BaseAction {
    constructor() {
        this._shellOutput = "";
        this._shellErrors = "";
        this._options = {
            listeners: {
                stdout: (data) => {
                    this._shellOutput += data.toString();
                },
                stderr: (data) => {
                    this._shellErrors += data.toString();
                }
            },
            cwd: "./"
        };
    }
    execCommandAsScript(command) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, core_1.info)(`Executing command ${command} as a sh file call`);
            this.resetOutputs();
            let currentDir = process.cwd();
            (0, fs_1.writeFileSync)(`${currentDir}/tmp_script.sh`, `#!/bin/bash\n${command}`);
            yield (0, exec_1.exec)(`chmod +x ${currentDir}/tmp_script.sh`, [], this._options);
            this.resetOutputs();
            yield (0, exec_1.exec)(`sh ${currentDir}/tmp_script.sh`, [], this._options);
            logwriter_1.LogWriter.logCommandOutputFromArray([this._shellOutput, this._shellErrors]);
            (0, fs_1.rmSync)(`${currentDir}/tmp_script.sh`);
        });
    }
    execCommand(command, args) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, core_1.info)(`Executing command [${command}] with args ${args}`);
            this.resetOutputs();
            yield (0, exec_1.exec)(command, args, this._options);
            logwriter_1.LogWriter.logCommandOutputFromArray([this._shellOutput, this._shellErrors]);
        });
    }
    resetOutputs() {
        this._shellErrors = "";
        this._shellOutput = "";
    }
}
exports.BaseAction = BaseAction;
class ActionRequest extends BaseRequest {
    constructor() {
        super(...arguments);
        this._parametro_recibido1 = "";
        this._parametro_recibido2 = "";
        this._errMessage = "";
    }
    get parametro_recibido1() {
        return this._parametro_recibido1;
    }
    set parametro_recibido1(value) {
        this._parametro_recibido1 = value;
    }
    get parametro_recibido2() {
        return this._parametro_recibido2;
    }
    set parametro_recibido2(newValue) {
        this._parametro_recibido2 = newValue;
    }
    get errMessage() {
        return this._errMessage;
    }
    isValid() {
        this._errMessage = "";
        let valid = true;
        if (!this._parametro_recibido1 || "" == this._parametro_recibido1) {
            this._errMessage += "PARAMETRO 1 NO RECIBIDO.\n";
            valid = false;
        }
        if (!this._parametro_recibido2 || "" == this._parametro_recibido2) {
            this._errMessage += "PARAMETRO 2 NO RECIBIDO\n";
            valid = false;
        }
        return valid;
    }
}
exports.ActionRequest = ActionRequest;
