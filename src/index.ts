import axios, { AxiosResponse } from 'axios';
import  { getInput, info, error, setFailed } from '@actions/core'
import { isExpressionWithTypeArguments } from 'typescript';

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
function evaluateResponse(response:AxiosResponse) {
    var data = response.data
    var status = response.status
    var statusText = response.statusText
    var headers = response.headers
    var config = response.config
    info("data:\n"+JSON.stringify(data)+
    "\nstatus:\n"+JSON.stringify(status)+
    "\nstatusText:"+JSON.stringify(statusText)+
    "\nheaders:"+JSON.stringify(headers)+
    "\nconfig:"+JSON.stringify(config))
}

//main function
function getDataFromAction(url:string,method:string,options?:string){
    if(method.toUpperCase() == 'GET'){
        axios.get(URL)
            .then(function (response) {
                evaluateResponse(response);
            })
            .catch(function (error) {
                setFailed("Something wrong with get: "+error)
            })
            .finally(function () {
                info("hola desde finally")
            });
    }else if(method.toUpperCase() == 'POST'){
        console.log("hi")
    }else if(method.toUpperCase() =='PUT'){
        console.log("hi")
    }else{
        setFailed("Wrong method value")
    }
}


