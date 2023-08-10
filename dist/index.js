"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const deploy_1 = require("./actions/deploy");
const actions_1 = require("./types/actions");
let entrada1 = (0, core_1.getInput)("entrada1");
let entrada2 = (0, core_1.getInput)("entrada2");
(0, core_1.info)("Parametros de mi accion");
//llamo a mi objeto y defino sus propiedades
let request = new actions_1.ActionRequest();
request.parametro_recibido1 = entrada1;
request.parametro_recibido2 = entrada2;
if (!request.isValid()) {
    (0, core_1.setFailed)("Missing mandatory parameters " + request.errMessage);
    throw new Error("Missing mandatory parameters " + request.errMessage);
}
(0, core_1.info)(`Executing helm-deploy for environment ${request.parametro_recibido1} and region ${request.parametro_recibido2}`);
new deploy_1.DeployAction().execute(request).then(result => {
    (0, core_1.info)("\u001b[32mEjecucion terminada");
}).catch(err => {
    (0, core_1.error)("Algo ha ido mal " + err.message);
    (0, core_1.setFailed)("Algo ha ido mal");
});
