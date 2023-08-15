"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const core_1 = require("@actions/core");
var url = 'https://dummy.restapiexample.com/api/v1/employees';
var resultado = axios_1.default.get(url).then(function (response) {
});
(0, core_1.info)("Contenido:\n" + JSON.stringify(resultado));
