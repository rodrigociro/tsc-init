import axios, { AxiosResponse } from 'axios';
import  { getInput, info, error, setFailed } from '@actions/core'
import * as fs from 'fs';
import { ifError } from 'assert';

var method = getInput("method")
if(method == ""){
    method = 'GET'
}
var BASE_URL_KEY = 'https://release-manager-scg-itos-dmp-pre.dmp.scger.pre.corp'
var API_VERSION_KEY = '/api/v1'
var method = getInput("method")
if(method == ""){
    method = 'GET'
}

var applicationName = getInput("applicationName")
var applicationVersion = getInput("applicationVersion")
var currentBranch = getInput("branch")
var appCommitId = getInput("appCommitId")
const dmpAppId = process.env.dmpAppId;

if(dmpAppId == '123456'){
    info("correcto!!!")
}
//boolean isBuildSuccessfull add "needs: ['previous-jobs']"

var json: {[key: string]: any} = {
    'applicationName': applicationName,
    'applicationVersion' : applicationVersion,
    'dmpAppId' : dmpAppId,
    'currentBranch' : currentBranch,
    'appCommitId' : appCommitId
}

info(JSON.stringify(json))

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
                info(JSON.stringify(response.data));
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


