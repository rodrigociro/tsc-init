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
const fs = __importStar(require("fs"));
core.startGroup('READ: json file');
const myInput = core.getInput("parameter", { required: true });
const myInput2 = core.getInput("other_name", { required: true });
validarInput(myInput);
validarInput(myInput2);
function validarInput(algo) {
    try {
        var splitted = algo.split(",");
        for (var i = 0; i < splitted.length; i++) {
            core.info(splitted[i]);
        }
        if (splitted[1] == "json") {
            core.info("el valor de mi input es: " + algo);
            leerArchivoJson(algo);
        }
        else if (splitted[1] == "yml" || splitted[1] == "yaml") {
            core.info("el valor de mi input es: " + algo);
            leerArchivoYaml(algo);
        }
        else {
            core.warning("mi input está vacío");
        }
    }
    catch (err) {
        core.error(`Error leyendo: ${err}`);
    }
}
function leerArchivoJson(algo) {
    var archivo = fs.readFileSync(algo, 'utf-8');
    var archivoData = (JSON.parse(archivo));
    core.info(`${archivoData}`);
}
function leerArchivoYaml(algo) {
    core.info(`${algo}`);
}
core.endGroup();
