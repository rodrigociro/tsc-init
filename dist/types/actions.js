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
        this._environment = "";
        this._region = "";
        this._tagVersion = "";
        this._chartVersion = "";
        this._helmTimeout = "5m0s";
        this._helmMaxReleasesHistory = 2;
        this._deployEnvFilePath = "";
        this._secrets = {};
        this._errMessage = "";
    }
    get chartVersion() {
        return this._chartVersion;
    }
    set chartVersion(value) {
        this._chartVersion = value;
    }
    get environment() {
        return this._environment;
    }
    set environment(newValue) {
        this._environment = newValue;
    }
    get region() {
        return this._region;
    }
    set region(newValue) {
        this._region = newValue;
    }
    get tagVersion() {
        return this._tagVersion;
    }
    set tagVersion(newValue) {
        this._tagVersion = newValue;
    }
    get helmTimeout() {
        return this._helmTimeout;
    }
    set helmTimeout(newValue) {
        this._helmTimeout = newValue;
    }
    get helmMaxReleasesHistory() {
        return this._helmMaxReleasesHistory;
    }
    set helmMaxReleasesHistory(newValue) {
        this._helmMaxReleasesHistory = newValue;
    }
    get deployEnvFilePath() {
        return this._deployEnvFilePath;
    }
    set deployEnvFilePath(newValue) {
        this._deployEnvFilePath = newValue;
    }
    get secrets() {
        return this._secrets;
    }
    set secrets(newValue) {
        this._secrets = newValue;
    }
    get errMessage() {
        return this._errMessage;
    }
    isValid() {
        this._errMessage = "";
        let valid = true;
        if (!this._environment || "" == this._environment) {
            this._errMessage += "Missing parameter with environment identifier.\n";
            valid = false;
        }
        if (!this._region || "" == this._region) {
            this._errMessage += "Missing parameter with region identifier.\n";
            valid = false;
        }
        if (!this._deployEnvFilePath || "" == this._deployEnvFilePath) {
            this._errMessage += "Missing parameter with path to deployment yaml file.\n";
            valid = false;
        }
        else if (!(0, fs_1.existsSync)(this._deployEnvFilePath)) {
            this._errMessage += `${this._deployEnvFilePath} cannot be found in workspace.\n`;
            valid = false;
        }
        if (!this._chartVersion || "" == this._chartVersion) {
            this._errMessage += "Missing parameter with the chart/version of the chart to deploy.\n";
            valid = false;
        }
        return valid;
    }
}
exports.ActionRequest = ActionRequest;
