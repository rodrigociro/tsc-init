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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const core_1 = require("@actions/core");
const fs = __importStar(require("fs"));
var method = (0, core_1.getInput)("method");
if (method == "") {
    method = 'GET';
}
var options = (0, core_1.getInput)("options");
var BASE_URL_KEY = process.env.prueba ? "no hay" : "a";
(0, core_1.info)(BASE_URL_KEY);
var API_VERSION_KEY = '/api/v1';
var PATH = '/employees';
var URL = BASE_URL_KEY.concat(API_VERSION_KEY, PATH);
getDataFromAction(URL, method);
//function to show data from API request
function evaluateResponseGet(response) {
    var data = response.data;
    var status = response.status;
    var statusText = response.statusText;
    var headers = response.headers;
    var config = response.config;
    (0, core_1.info)("DATA: " + JSON.stringify(data) + "\nSTATUS: " + JSON.stringify(status) + "\nSTATUS-TEXT: " + JSON.stringify(statusText) + "\nHEADERS: " + JSON.stringify(headers) + "\nCONFIG: " + JSON.stringify(config));
}
//main function
function getDataFromAction(url, method, options) {
    if (method.toUpperCase() == 'GET') {
        axios_1.default.get(URL)
            .then(function (response) {
            evaluateResponseGet(response);
        })
            .catch(function (error) {
            (0, core_1.setFailed)("Something wrong with get: " + error);
        })
            .finally(function () {
            (0, core_1.info)("hola desde finally");
        });
    }
    else if (method.toUpperCase() == 'POST') {
        var post_url = BASE_URL_KEY.concat(API_VERSION_KEY, "/create");
        (0, core_1.info)(post_url);
        var jsonfile = fs.readFileSync('pruebaCreate.json', 'utf-8');
        (0, core_1.info)(JSON.stringify(jsonfile));
        axios_1.default.post(post_url, jsonfile)
            .then(function (response) {
            (0, core_1.info)(JSON.stringify(response.data));
        })
            .catch(function (error) {
            (0, core_1.setFailed)(error);
        });
    }
    else if (method.toUpperCase() == 'PUT') {
        var put_url = BASE_URL_KEY.concat(API_VERSION_KEY, "/update/21");
        (0, core_1.info)(put_url);
        var jsonfile = fs.readFileSync('pruebaCreate.json', 'utf-8');
        (0, core_1.info)(JSON.stringify(jsonfile));
        axios_1.default.put(put_url, jsonfile)
            .then(function (response) {
            (0, core_1.info)(JSON.stringify(response.data));
        })
            .catch(function (error) {
            (0, core_1.setFailed)(error);
        });
    }
    else if (method.toUpperCase() == 'DELETE') {
        var delete_url = BASE_URL_KEY.concat(API_VERSION_KEY, "/delete/2");
        (0, core_1.info)(delete_url);
        var jsonfile = fs.readFileSync('pruebaCreate.json', 'utf-8');
        (0, core_1.info)(JSON.stringify(jsonfile));
        axios_1.default.delete(delete_url)
            .then(function (response) {
            (0, core_1.info)(JSON.stringify(response.data));
        })
            .catch(function (error) {
            (0, core_1.setFailed)(error);
        });
    }
    else {
        (0, core_1.setFailed)("Wrong method value");
    }
}
