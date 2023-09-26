"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const core_1 = require("@actions/core");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
var method = (0, core_1.getInput)("method");
if (method == "") {
    method = 'GET';
}
var dmpAppId = (0, core_1.getInput)("dmpAppId");
var gitRepository = (0, core_1.getInput)("gitRepository");
var appVersion = (0, core_1.getInput)("appVersion");
var appGitBranch = (0, core_1.getInput)("appGitBranch");
var appCommitId = (0, core_1.getInput)("commitId");
var environment = (0, core_1.getInput)("real-deployment-environment");
var gitHubActionsBuildUrl = (0, core_1.getInput)("gitHubActionsBuildUrl");
var artifactNexusUrl = (0, core_1.getInput)("artifactNexusUrl");
var success = (0, core_1.getInput)("success");
//set de URL of DMP
if (environment == "CERT") {
    var BASE_URL_KEY = 'https://release-manager-scg-itos-dmp-dev.dmp.scger.dev.corp';
    var API_VERSION_KEY = '/api/v1/tools/github-actions-runner/build-finished/integration-branch';
}
if (environment == "PRE") {
    var BASE_URL_KEY = 'https://release-manager-scg-itos-dmp-pre.dmp.scger.pre.corp';
    var API_VERSION_KEY = '/api/v1/tools/github-actions-runner/build-finished/integration-branch';
}
if (environment == "PRO") {
    var BASE_URL_KEY = 'https://release-manager-scg-itos-dmp-pro.dmp.scger.corp';
    var API_VERSION_KEY = '/api/v1/tools/github-actions-runner/build-finished/integration-branch';
}
else {
    var BASE_URL_KEY = 'https://release-manager-scg-itos-dmp-dev.dmp.scger.dev.corp';
    var API_VERSION_KEY = '/api/v1/tools/github-actions-runner/build-finished/integration-branch';
}
var json = {
    "dmpAppId": dmpAppId,
    "gitRepository": gitRepository,
    "appVersion": appVersion,
    "appGitBranch": appGitBranch,
    "appCommitId": appCommitId,
    "gitHubActionsBuildUrl": gitHubActionsBuildUrl,
    "artifactNexusUrl": artifactNexusUrl,
    "success": success
};
var URL = BASE_URL_KEY === null || BASE_URL_KEY === void 0 ? void 0 : BASE_URL_KEY.toString().concat(API_VERSION_KEY);
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
            (0, core_1.info)("hello desde Finally");
        });
    }
    else if (method.toUpperCase() == 'POST') {
        var post_url = BASE_URL_KEY.concat(API_VERSION_KEY);
        (0, core_1.info)(post_url);
        axios_1.default.post(post_url, json)
            .then(function (response) {
            (0, core_1.info)("Response Body:\n" + JSON.stringify(response.status));
            (0, core_1.info)("Response Body:\n" + JSON.stringify(response.data));
        })
            .catch(function (error) {
            (0, core_1.setFailed)(error);
        });
    }
    else if (method.toUpperCase() == 'PUT') {
        var put_url = BASE_URL_KEY.concat(API_VERSION_KEY, "/update/21");
        (0, core_1.info)(put_url);
        (0, core_1.info)(JSON.stringify(json));
        axios_1.default.put(put_url, json)
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
