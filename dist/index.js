"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const core_1 = require("@actions/core");
var method = (0, core_1.getInput)("method");
if (method == "") {
    method = 'GET';
}
var options = (0, core_1.getInput)("options");
var BASE_URL_KEY = 'https://dummy.restapiexample.com';
var API_VERSION_KEY = '/api/v1';
var PATH = '/employees';
var URL = BASE_URL_KEY.concat(API_VERSION_KEY, PATH);
getDataFromAction(URL, method);
//function to show data from API request
function evaluar(response) {
    var datos = response.data;
    var estado = response.status;
    var estadoTexto = response.statusText;
    var cabeceras = response.headers;
    var configuracion = response.config;
    (0, core_1.info)("datos:\n" + JSON.stringify(datos) + "respuesta:\n" + JSON.stringify(estado));
}
//main function
function getDataFromAction(url, method, options) {
    if (method == 'GET') {
        axios_1.default.get(URL)
            .then(function (response) {
            evaluar(response);
        })
            .catch(function (error) {
            (0, core_1.setFailed)("Something wrong with get: " + error);
        })
            .finally(function () {
            (0, core_1.info)("hola desde finally");
        });
    }
    else if (method == 'POST') {
        console.log("hi");
    }
    else if (method == 'PUT') {
        console.log("hi");
    }
    else {
        (0, core_1.setFailed)("Wrong method value");
    }
}
