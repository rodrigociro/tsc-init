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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
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
const yaml_1 = __importDefault(require("yaml"));
const actions_1 = require("../types/actions");
const configfiles_1 = require("../types/configfiles");
const constants_1 = require("../util/constants");
const deployconfigutils_1 = require("../util/deployconfigutils");
const logwriter_1 = require("../util/logwriter");
class DeployAction extends actions_1.BaseAction {
    execute(request) {
        return __awaiter(this, void 0, void 0, function* () {
            this.resetOutputs();
            (0, core_1.info)("Starting helm deploy in DEPLOY mode (get tgz from registry and deploy applying configured values");
            yield this.replaceEnvVarsOnDeploymentYamlConfigFile(request);
            (0, core_1.info)("Reading environment regions file");
            const file = (0, fs_1.readFileSync)(`${process.cwd()}/${request.deployEnvFilePath}`, "utf-8");
            const deployConfigInfo = new configfiles_1.DeploymentConfigInfo(yaml_1.default.parse(file));
            (0, core_1.info)("Ret5rieved  deployment configuration as a class instance... Well formed configuration");
            const region = deployconfigutils_1.RegionExtractor.extractRegionInfo(request.environment, request.region, deployConfigInfo);
            if (!region) {
                (0, core_1.setFailed)("No region found in config with key name: " + request.region);
                throw new Error("No region found in config with key name: " + request.region);
            }
            if (!region.isValid()) {
                (0, core_1.setFailed)("Region found but has missing values " + region.validationMessages);
                throw new Error("Region found but has missing values " + region.validationMessages);
            }
            if (!region.properties.deployStrategy || constants_1.DeployStrategy.NONE.indexOf(region.properties.deployStrategy.toLowerCase()) >= 0) {
                yield this.performDeployment(region, request, "");
            }
            else if (constants_1.DeployStrategy.BLUEGREEN.indexOf(region.properties.deployStrategy.toLowerCase()) >= 0) {
                (0, core_1.info)("Executing with deployStrategy BLUEGREEN for region " + region.name);
                let token = "";
                let strToken = "";
                if (region.properties.credentialsId in request.secrets) {
                    token = request.secrets[region.properties.credentialsId];
                    strToken = ` --token="${token}" `;
                }
                else {
                    yield this.controlUserPassSecretsExistence(region, request);
                }
                yield this.execCommand(`kubectl get svc -l app_name=${region.properties.application}-b  --namespace="${region.properties.namespace}" --server="${region.properties.apiServer}" ${strToken} -o name`, []);
                let blueActiveStatus = this._shellOutput.trim();
                this.resetOutputs();
                yield this.execCommand(`kubectl get svc -l app_name=${region.properties.application}-g  --namespace="${region.properties.namespace}" --server="${region.properties.apiServer}" ${strToken} -o name`, []);
                let greenActiveStatus = this._shellOutput.trim();
                this.resetOutputs();
                (0, core_1.info)("Queried status of blue and green slots to perform deployment " + greenActiveStatus + ", " + blueActiveStatus);
                if (!blueActiveStatus && !greenActiveStatus) {
                    (0, core_1.info)("None blue or green was previously deployed, deploying botch slots");
                    yield this.performDeployment(region, request, "-b");
                    yield this.performDeployment(region, request, "-g");
                }
                else if (!blueActiveStatus) {
                    (0, core_1.info)("Detected empty blue eslot, procceding to deploy with -b suffix");
                    yield this.performDeployment(region, request, "-b");
                }
                else if (!greenActiveStatus) {
                    (0, core_1.info)("Detected empty green eslot, procceding to deploy with -g suffix");
                    yield this.performDeployment(region, request, "-g");
                }
                else {
                    (0, core_1.setFailed)("Blue and green slots active so is impossible to deploy with bluegreen in region " + region.name);
                    throw new Error("Blue and green slots active so is impossible to deploy with bluegreen in region " + region.name);
                }
            }
            else {
                (0, core_1.setFailed)("Unknown deploy strategy set foro region " + region.name);
                throw new Error("Unknown deploy strategy set foro region " + region.name);
            }
        });
    }
    replaceEnvVarsOnDeploymentYamlConfigFile(request) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, core_1.startGroup)("Replacing placeholders in deployment regions configuration file");
            try {
                (0, fs_1.copyFileSync)(request.deployEnvFilePath, request.deployEnvFilePath + ".bak");
                const currentWDir = process.cwd();
                yield this.execCommandAsScript(`
                export CHART_VERSION=${request.chartVersion}
                touch ${currentWDir}/${request.deployEnvFilePath}
                envsubst < ${currentWDir}/${request.deployEnvFilePath}.bak > ${currentWDir}/${request.deployEnvFilePath}
            `);
                logwriter_1.LogWriter.logCommandOutputFromArray([this._shellOutput, this._shellErrors]);
                this.resetOutputs();
                (0, core_1.info)("CHART_VERSION replaced in deployment file if it comens inside it");
            }
            catch (err) {
                (0, core_1.error)("Error during replacement " + err);
            }
            finally {
                (0, core_1.endGroup)();
                (0, fs_1.rmSync)(request.deployEnvFilePath + ".bak");
            }
        });
    }
    controlUserPassSecretsExistence(region, request) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(region.properties.credentialUserId in request.secrets) || !(region.properties.credentialPassId in request.secrets)) {
                (0, core_1.setFailed)(`Review repository secrets to ensure that ${region.properties.credentialUserId} and ${region.properties.credentialPassId} secrets exists`);
                throw new Error(`Review repository secrets to ensure that ${region.properties.credentialUserId} and ${region.properties.credentialPassId} secrets exists`);
            }
            try {
                (0, core_1.startGroup)("Login to cluster");
                yield this.execCommand(`oc login -s ${region.properties.apiServer} -u ${request.secrets[region.properties.credentialUserId]} -p ${request.secrets[region.properties.credentialPassId]}`);
            }
            catch (err) {
                (0, core_1.setFailed)(`Review your credencials and server api url for region ${region.name} as oc login failed ${err.message} . `);
                (0, core_1.error)(`Review your credencials and server api url for region ${region.name} as oc login failed.`);
                throw new Error(`Review your credencials and server api url for region ${region.name} as oc login failed.`);
            }
            finally {
                logwriter_1.LogWriter.logCommandOutputFromArray([this._shellOutput, this._shellErrors]);
                this.resetOutputs();
                (0, core_1.endGroup)();
            }
        });
    }
    performDeployment(region, request, suffix) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, core_1.info)("Executing for region " + region.name + " application: " + region.properties.application + " suffix: " + suffix);
            logwriter_1.LogWriter.showAvailableRegionProperties(region);
            let kubeToken = "";
            let needToLogout = false;
            let needsTokenFlag = true;
            if (region.properties.credentialsId in request.secrets) {
                kubeToken = request.secrets[region.properties.credentialsId];
                (0, core_1.info)(`Retrieved value from secret ${region.properties.credentialsId}`);
            }
            else {
                yield this.controlUserPassSecretsExistence(region, request);
            }
            let strToken = "";
            if (needsTokenFlag) {
                strToken = `--kube-token=${kubeToken}`;
            }
            try {
                let script = region.properties.script || "helm upgrade --install --atomic --wait ";
                let chartUrl = `https://${region.properties.repo}/chartrepo/${region.properties.project}/charts/${region.properties.chart}-${region.properties.version}.tgz`;
                let appName = region.properties.application + suffix;
                let apiServer = `--kube-apiserver=${region.properties.apiServer}`;
                let namespace = `--namespace=${region.properties.namespace}`;
                let defaultExtraArgs = "";
                if (script.indexOf("--timeout") < 0) {
                    (0, core_1.info)("Adding default helm timeout to 3m0s option");
                    defaultExtraArgs += ` --timeout=${request.helmTimeout} `;
                }
                if (script.indexOf("--history-max") < 0) {
                    (0, core_1.info)("Adding default history max to 2 helm option.");
                    defaultExtraArgs += ` --history-max=${request.helmMaxReleasesHistory} `;
                }
                let version = `--version=${region.properties.version}`;
                if (region.properties.chartUnzip) {
                    (0, core_1.info)("Unzip chart needed, using tar to unzip file");
                    yield this.execCommandAsScript(`curl -k -X GET ${chartUrl} --output charttodeploy.tgz\ntar xvzf  charttodeploy.tgz --strip-components=1 `);
                    chartUrl = "./";
                    (0, core_1.info)("Chart url updated to use local uncompressed tgz");
                }
                (0, core_1.startGroup)("Prepare workspace replaceing placeholders and retrieve extra flags from deployment file");
                (0, core_1.exportVariable)("APPLICATION_NAME", region.properties.application + suffix);
                (0, core_1.exportVariable)("REGISTRY", region.properties.repo);
                const extraValuesToApply = yield this.getValuesToApplyAndReplacePlaceholdersInFiles(region, request);
                const extraParametersToSet = this.getExtraParametersToSet(region, request);
                (0, core_1.info)(`Extra values to apply: ${extraValuesToApply}`);
                (0, core_1.endGroup)();
                (0, core_1.startGroup)("Helm deployment execution");
                let helmCommand = `${script} ${appName} ${chartUrl} ${apiServer} ${strToken} ${namespace} ${defaultExtraArgs} ${version}  ${extraValuesToApply} ${extraParametersToSet}`;
                (0, core_1.info)(helmCommand);
                try {
                    yield this.execCommand(helmCommand);
                }
                catch (err) {
                    (0, core_1.error)("Something went wrong with helm deployment, review logs");
                    throw new Error("Something went wrong while performing helm deploy");
                }
                finally {
                    logwriter_1.LogWriter.logCommandOutputFromArray([this._shellOutput, this._shellErrors]);
                    (0, core_1.info)("after helm command execution with NONE deploy strategy. Chart deployed!");
                    // if (needToLogout) {
                    //     await this.execCommand(`oc logout --server=${region.properties.apiServer}`);
                    // }
                    (0, core_1.endGroup)();
                }
            }
            catch (err) {
                (0, core_1.setFailed)("Helm deploy failed for region " + region.name);
                throw err;
            }
        });
    }
    getExtraParametersToSet(region, request) {
        let result = "";
        if (region && region.properties && region.properties.parameters) {
            (0, core_1.info)(JSON.stringify(region.properties.parameters));
            for (let param of region.properties.parameters) {
                (0, core_1.info)("Object in json " + JSON.stringify(param));
                let keys = Object.keys(param);
                (0, core_1.info)("Keys found: " + keys);
                let key = keys[0];
                let value = param[key];
                result += ` --set ${key}=${value} `;
            }
        }
        (0, core_1.info)("Temporary result parameters to set: " + result);
        return result;
    }
    getValuesToApplyAndReplacePlaceholdersInFiles(region, request) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = "";
            if ((0, fs_1.existsSync)("generated-files")) {
                (0, fs_1.rmdirSync)("generated-files", { recursive: true });
            }
            (0, fs_1.mkdirSync)('generated-files');
            if (region && region.properties) {
                if (region.properties.valuesFile) {
                    if (typeof region.properties.valuesFile === "string") {
                        (0, core_1.info)(`Property valuesFile for region ${region.name} informed as a string, its recommended to set it as a list.`);
                        (0, core_1.info)(`Even if this works we recommend you to set it in the expected list format in ${request.deployEnvFilePath} file.`);
                        result = yield this.prepareValuesFile(region, region.properties.valuesFile, result, request);
                        return result;
                    }
                    for (let valFile of region.properties.valuesFile) {
                        result = yield this.prepareValuesFile(region, valFile, result, request);
                    }
                }
            }
            return result;
        });
    }
    prepareValuesFile(region, valFile, result, request) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, fs_1.existsSync)(region.properties.chartPath + "/" + valFile)) {
                (0, core_1.setFailed)(`Review your configuration for region ${region.name}. Referenced values file ${valFile} cant be found under ${region.properties.chartPath} path`);
                throw new Error(`Review your configuration for region ${region.name}. Referenced values file ${valFile} cant be found under ${region.properties.chartPath} path`);
            }
            result += ` -f generated-files/${valFile}`;
            this.resetOutputs();
            yield this.execCommandAsScript(`
                        export APPLICATION_NAME=${process.env.APPLICATION_NAME}
                        export REGISTRY=${process.env.REGISTRY}
                        export TAG_VERSION=${request.tagVersion}
                        envsubst < ${region.properties.chartPath}/${valFile} > generated-files/${valFile}`);
            (0, core_1.info)("Added values file to apply and updated placeholders in content");
            return result;
        });
    }
}
exports.DeployAction = DeployAction;
