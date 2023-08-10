import  { getInput, info, error, setFailed } from '@actions/core'
import { DeployAction } from './actions/deploy';
import { ActionRequest } from './types/actions';

let entrada1 : string = getInput("entrada1");
let entrada2 : string = getInput("entrada2");

info("Parametros de mi accion");
//llamo a mi objeto y defino sus propiedades
let request = new ActionRequest();
request.parametro_recibido1 = entrada1;
request.parametro_recibido2 = entrada2;

if (!request.isValid()) {
    setFailed("Missing mandatory parameters " + request.errMessage);
    throw new Error("Missing mandatory parameters " + request.errMessage);
}

info(`Executing helm-deploy for environment ${request.parametro_recibido1} and region ${request.parametro_recibido2}`);
new DeployAction().execute(request).then(result => {
    info("\u001b[32mEjecucion terminada");
}).catch(err => {
    error("Algo ha ido mal " + err.message);
    setFailed("Algo ha ido mal");
});