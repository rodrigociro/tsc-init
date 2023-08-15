import axios, { AxiosResponse } from 'axios';
import  { getInput, info, error, setFailed } from '@actions/core'

var BASE_URL_KEY = 'https://dummy.restapiexample.com'
var API_VERSION_KEY = "/api/v1"
var URL:string = ""
URL.concat(BASE_URL_KEY,API_VERSION_KEY)

axios.get(URL)
  .then(function (response) {
    evaluar(response);
  })
  .catch(function (error) {
    info("hola desde el error")
  })
  .finally(function () {
    info("hola desde finally")
  });

function evaluar(response:AxiosResponse) {
    var datos = response.data
    var estado = response.status
    var estadoTexto = response.statusText
    var cabeceras = response.headers
    var configuracion = response.config
    info("datos:\n"+JSON.stringify(datos)+"respuesta:\n"+JSON.stringify(estado))
}

