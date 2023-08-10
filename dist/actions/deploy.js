"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeployAction = void 0;
/**
 * Business logic implementation to perform a chart deployment region configuration
 * info.
 *
 * This execution mode must be called after a chart is built and pushed to a registry.
 */
const core_1 = require("@actions/core");
const fs_1 = require("fs");
//import YAML from 'yaml';
const actions_1 = require("../types/actions");
const logwriter_1 = require("../util/logwriter");
class DeployAction extends actions_1.BaseAction {
    execute(request) {
        return __awaiter(this, void 0, void 0, function* () {
            this.resetOutputs(); //dejar vacio los logs
            (0, core_1.info)("probando a desplegar dos parametros");
            //await this.replaceEnvVarsOnDeploymentYamlConfigFile(request);
            /*
            info("Reading environment regions file");
            const file = readFileSync(`${process.cwd()}/${request.deployEnvFilePath}`, "utf-8");
            const deployConfigInfo :DeploymentConfigInfo = new DeploymentConfigInfo(YAML.parse(file));
            info("Ret5rieved  deployment configuration as a class instance... Well formed configuration");
            */
            //const comprueba_parametro_1: Region = RegionExtractor.extractRegionInfo(request.parametro_recibido1, request.parametro_recibido2, deployConfigInfo);
            let variable = request.parametro_recibido1;
            if (!request) {
                (0, core_1.setFailed)("ERROR 1: " + request);
                throw new Error("ERROR 1: " + request);
            }
            if (!request.isValid()) {
                (0, core_1.setFailed)("VALID?: " + request.errMessage);
                throw new Error("VALID?: " + request.errMessage);
            }
            if (request.parametro_recibido1 = "rodrigo") {
                //accion en la maquina
                yield this.execCommandAsScript(`echo ${variable}`);
                //let greenActiveStatus = this._shellOutput.trim();
                this.resetOutputs();
            }
            else {
                (0, core_1.setFailed)("PARAMETRO 1? " + request);
                throw new Error("PARAMETRO 1? " + requestAnimationFrame);
            }
        });
    }
    /*
    if (!comprueba_parametro_1.properties.deployStrategy || DeployStrategy.NONE.indexOf(region.properties.deployStrategy.toLowerCase()) >= 0) {
        await this.performDeployment(comprueba_parametro_1, request, "");
    } else if (DeployStrategy.BLUEGREEN.indexOf(region.properties.deployStrategy.toLowerCase()) >= 0) {
        info("Executing with deployStrategy BLUEGREEN for region " + region.name);
        let token : string = "";
        let strToken : string = "";
        if (region.properties.credentialsId in request.secrets) {
            token = request.secrets[region.properties.credentialsId];
            strToken = ` --token="${token}" `;
        } else {
            await this.controlUserPassSecretsExistence(region, request);
        }
        await this.execCommand(`kubectl get svc -l app_name=${region.properties.application}-b  --namespace="${region.properties.namespace}" --server="${region.properties.apiServer}" ${strToken} -o name`, []);
        let blueActiveStatus = this._shellOutput.trim();
        this.resetOutputs();
        await this.execCommand(`kubectl get svc -l app_name=${region.properties.application}-g  --namespace="${region.properties.namespace}" --server="${region.properties.apiServer}" ${strToken} -o name`, []);
        let greenActiveStatus = this._shellOutput.trim();
        this.resetOutputs();
        info("Queried status of blue and green slots to perform deployment " + greenActiveStatus + ", " +  blueActiveStatus);
        if (!blueActiveStatus && !greenActiveStatus) {
            info("None blue or green was previously deployed, deploying botch slots");
            await this.performDeployment(region, request, "-b");
            await this.performDeployment(region, request, "-g");
        } else if (!blueActiveStatus) {
            info("Detected empty blue eslot, procceding to deploy with -b suffix");
            await this.performDeployment(region, request, "-b");
        } else if (!greenActiveStatus) {
            info("Detected empty green eslot, procceding to deploy with -g suffix");
            await this.performDeployment(region, request, "-g");
        } else {
            setFailed("Blue and green slots active so is impossible to deploy with bluegreen in region " + region.name);
            throw new Error("Blue and green slots active so is impossible to deploy with bluegreen in region " + region.name);
        }
        */
    replaceEnvVarsOnDeploymentYamlConfigFile(request) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, core_1.startGroup)("Replacing placeholders in deployment regions configuration file");
            try {
                (0, fs_1.copyFileSync)(request.parametro_recibido1, request.parametro_recibido1 + ".bak");
                const currentWDir = process.cwd();
                yield this.execCommandAsScript(`
                echo ${request.parametro_recibido1}
            `);
                logwriter_1.LogWriter.logCommandOutputFromArray([this._shellOutput, this._shellErrors]);
                this.resetOutputs();
                (0, core_1.info)("parametro_recibido1 creado como variable de entorno");
            }
            catch (err) {
                (0, core_1.error)("error mientras se creaba la variable de entorno " + err);
            }
            finally {
                (0, core_1.endGroup)();
                (0, fs_1.rmSync)(request.parametro_recibido1);
            }
        });
    }
}
exports.DeployAction = DeployAction;
