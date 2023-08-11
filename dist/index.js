"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const execute = __importStar(require("@actions/exec"));
//Colors
//backgroud color
var yellow = '\u001b[43m';
var cyan = '\u001b[48;5;6m';
var red = '\u001b[48;2;255;0;0m';
//Foreground colors
let magenta = '\u001b[35m';
var cyanf = '\u001b[38;5;6m';
var redf = '\u001b[38;2;255;0;0m';
var texto = 'texto para probar colores';
core.info(magenta + texto);
core.info(redf + texto);
core.info(cyanf + texto);
core.info(yellow + texto);
core.info(red + texto);
core.info(cyan + texto);
//inputs
const myInput = core.getInput("parameter");
core.startGroup('GRUPO 1');
leerMyInput(myInput);
//async function  leerMyInput(myInput:string){
function leerMyInput(myInput) {
    try {
        core.info('Inside try block');
        core.info(myInput);
        //await execute.exec('ls -ltr')
        execute.exec('ls -ltr');
        execute.exec(`find . -name "*${myInput}*"`);
        if (!myInput) {
            core.warning('myInput no está definido');
        }
        if (core.isDebug()) {
            core.info('El input no tiene debug');
        }
        else {
            core.warning('El input tiene datos: ' + myInput);
        }
        core.info('Output to the actions build log');
        core.notice('This is a message that will also emit an annotation');
        core.setOutput('outputKey', 'outputVal');
    }
    catch (err) {
        core.error(`Error ${err}, action may still succeed though`);
    }
}
core.endGroup();
core.startGroup('GRUPO 2');
core.notice('este es un mensaje en el grupo2');
core.endGroup();
