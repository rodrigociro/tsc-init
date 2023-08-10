"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const deploy_1 = require("./actions/deploy");
const actions_1 = require("./types/actions");
let entrada1 = (0, core_1.getInput)("environment");
let entrada2 = (0, core_1.getInput)("region");
(0, core_1.info)("Parametros de mi accion");
//llamo a mi objeto y defino sus propiedades
let request = new actions_1.ActionRequest();
request.parametro_recibido1 = entrada1;
request.parametro_recibido2 = entrada2;
if (!request.isValid()) {
    (0, core_1.setFailed)("Missing mandatory parameters " + request.errMessage);
    throw new Error("Missing mandatory parameters " + request.errMessage);
}
(0, core_1.info)(`Executing helm-deploy for environment ${request.environment} and region ${request.region}`);
new deploy_1.DeployAction().execute(request).then(result => {
    (0, core_1.info)("\u001b[32mExecution finished");
}).catch(err => {
    (0, core_1.error)("Something went wrong " + err.message);
    (0, core_1.setFailed)("Something went wrong performing helm deployment");
});
