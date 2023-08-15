import axios, { AxiosResponse } from 'axios';
import  { getInput, info, error, setFailed } from '@actions/core'
import * as fs from 'fs';

var method = getInput("method")
if(method == ""){
    method = 'GET'
}
var options = getInput("options")
var BASE_URL_KEY = 'https://dummy.restapiexample.com'
var API_VERSION_KEY = '/api/v1'
var PATH = '/employees'
var URL = BASE_URL_KEY.concat(API_VERSION_KEY,PATH)

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
                info("hola desde finally")
            });
    }else if(method.toUpperCase() == 'POST'){
        var post_url = BASE_URL_KEY.concat(API_VERSION_KEY,"/create")
        info(post_url)
        var jsonfile = fs.readFileSync('pruebaCreate.json', 'utf-8');
        info(JSON.stringify(jsonfile))
        axios.post(post_url, jsonfile)
            .then(function (response) {
                info(JSON.stringify(response.data));
            })
            .catch(function (error) {
                setFailed(error);
            });
    }else if(method.toUpperCase() =='PUT'){
        console.log("hi")
    }else{
        setFailed("Wrong method value")
    }
}


