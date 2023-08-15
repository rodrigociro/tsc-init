"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const core_1 = require("@actions/core");
var BASE_URL_KEY = 'https://dummy.restapiexample.com';
var API_VERSION_KEY = "/api/v1";
var URL = "";
URL.concat(BASE_URL_KEY, API_VERSION_KEY);
(0, core_1.info)(URL);
axios_1.default.get(URL)
    .then(function (response) {
    evaluar(response);
})
    .catch(function (error) {
    (0, core_1.info)("hola desde el error");
})
    .finally(function () {
    (0, core_1.info)("hola desde finally");
});
function evaluar(response) {
    var datos = response.data;
    var estado = response.status;
    var estadoTexto = response.statusText;
    var cabeceras = response.headers;
    var configuracion = response.config;
    (0, core_1.info)("datos:\n" + JSON.stringify(datos) + "respuesta:\n" + JSON.stringify(estado));
}
