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
function evaluar(response:AxiosResponse) {
    var datos = response.data
    var estado = response.status
    var estadoTexto = response.statusText
    var cabeceras = response.headers
    var configuracion = response.config
    info("datos:\n"+JSON.stringify(datos)+"respuesta:\n"+JSON.stringify(estado))
}

//main function
function getDataFromAction(url:string,method:string,options?:string){
    if(method == 'GET'){
        axios.get(URL)
            .then(function (response) {
                evaluar(response);
            })
            .catch(function (error) {
                setFailed("Something wrong with get: "+error)
            })
            .finally(function () {
                info("hola desde finally")
            });
    }else if(method== 'POST'){
        console.log("hi")
    }else if(method=='PUT'){
        console.log("hi")
    }else{
        setFailed("Wrong method value")
    }
}


