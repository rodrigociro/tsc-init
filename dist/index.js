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
function evaluateResponse(response) {
    var data = response.data;
    var status = response.status;
    var statusText = response.statusText;
    var headers = response.headers;
    var config = response.config;
    (0, core_1.info)("data:\n" + JSON.stringify(data) +
        "\nstatus:\n" + JSON.stringify(status) +
        "\nstatusText:" + JSON.stringify(statusText) +
        "\nheaders:" + JSON.stringify(headers) +
        "\nconfig:" + JSON.stringify(config));
}
//main function
function getDataFromAction(url, method, options) {
    if (method.toUpperCase() == 'GET') {
        axios_1.default.get(URL)
            .then(function (response) {
            evaluateResponse(response);
        })
            .catch(function (error) {
            (0, core_1.setFailed)("Something wrong with get: " + error);
        })
            .finally(function () {
            (0, core_1.info)("hola desde finally");
        });
    }
    else if (method.toUpperCase() == 'POST') {
        console.log("hi");
    }
    else if (method.toUpperCase() == 'PUT') {
        console.log("hi");
    }
    else {
        (0, core_1.setFailed)("Wrong method value");
    }
}
