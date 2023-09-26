import axios, { AxiosResponse } from 'axios';
import  { getInput, info, error, setFailed } from '@actions/core'
import * as fs from 'fs';
import { ifError } from 'assert';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

var method = getInput("method")
if(method == ""){
    method = 'GET'
}

var dmpAppId = getInput("dmpAppId")
var gitRepository = getInput("gitRepository")
var appVersion = getInput("appVersion")
var appGitBranch = getInput("appGitBranch")
var appCommitId = getInput("commitId")
var environment = getInput("real-deployment-environment")
var gitHubActionsBuildUrl = getInput("gitHubActionsBuildUrl")
var artifactNexusUrl = getInput("artifactNexusUrl")
var success = getInput("success")

//set de URL of DMP
if(environment == "CERT"){
    var BASE_URL_KEY = 'https://release-manager-scg-itos-dmp-dev.dmp.scger.dev.corp'
    var API_VERSION_KEY = '/api/v1/tools/github-actions-runner/build-finished/integration-branch'
}
if(environment == "PRE"){
    var BASE_URL_KEY = 'https://release-manager-scg-itos-dmp-pre.dmp.scger.pre.corp'
    var API_VERSION_KEY = '/api/v1/tools/github-actions-runner/build-finished/integration-branch'
}
if(environment == "PRO"){
    var BASE_URL_KEY = 'https://release-manager-scg-itos-dmp-pro.dmp.scger.corp'
    var API_VERSION_KEY = '/api/v1/tools/github-actions-runner/build-finished/integration-branch'
}
else{
    var BASE_URL_KEY = 'https://release-manager-scg-itos-dmp-dev.dmp.scger.dev.corp'
    var API_VERSION_KEY = '/api/v1/tools/github-actions-runner/build-finished/integration-branch'
}


var json: {[key: string]: any} = {
    "dmpAppId": dmpAppId,
    "gitRepository": gitRepository,
    "appVersion": appVersion,
    "appGitBranch": appGitBranch,
    "appCommitId": appCommitId,
    "gitHubActionsBuildUrl": gitHubActionsBuildUrl,
    "artifactNexusUrl": artifactNexusUrl,
    "success": success
}

var URL = BASE_URL_KEY?.toString().concat(API_VERSION_KEY)

getDataFromAction(URL,method)

//function to show data from API request
function evaluateResponseGet(response:AxiosResponse) {
    var data = response.data
    var status = response.status
    var statusText = response.statusText
    var headers = response.headers
    var config = response.config
    info("DATA: "+JSON.stringify(data)+"\nSTATUS: "+JSON.stringify(status)+"\nSTATUS-TEXT: "+JSON.stringify(statusText)+"\nHEADERS: "+JSON.stringify(headers)+"\nCONFIG: "+JSON.stringify(config))
}


//main function
function getDataFromAction(url:string,method:string,options?:string){
    if(method.toUpperCase() == 'GET'){
        axios.get(URL)
            .then(function (response) {
                evaluateResponseGet(response);
            })
            .catch(function (error) {
                setFailed("Something wrong with get: "+error)
            })
            .finally(function () {
                info("hello desde Finally")
            });
    }else if(method.toUpperCase() == 'POST'){
        var post_url = BASE_URL_KEY.concat(API_VERSION_KEY)
        info(post_url)
        axios.post(post_url, json)
            .then(function (response) {
                info("Response Body:\n" + JSON.stringify(response.status));
                info("Response Body:\n" + JSON.stringify(response.data));
            })
            .catch(function (error) {
                setFailed(error);
            });
    }else if(method.toUpperCase() =='PUT'){
        var put_url = BASE_URL_KEY.concat(API_VERSION_KEY,"/update/21")
        info(put_url)
        info(JSON.stringify(json))
        axios.put(put_url, json)
            .then(function (response) {
                info(JSON.stringify(response.data));
            })
            .catch(function (error) {
                setFailed(error);
            });
    }else if(method.toUpperCase() == 'DELETE'){
        var delete_url = BASE_URL_KEY.concat(API_VERSION_KEY,"/delete/2")
        info(delete_url)
        axios.delete(delete_url)
            .then(function (response) {
                info(JSON.stringify(response.data));
            })
            .catch(function (error) {
                setFailed(error);
            })
    }else{
        setFailed("Wrong method value")
    }
}


