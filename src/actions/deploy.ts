/**
 * Business logic implementation to perform a chart deployment region configuration
 * info.
 * 
 * This execution mode must be called after a chart is built and pushed to a registry.
 */
import { endGroup, info, error, exportVariable, setFailed, startGroup} from "@actions/core";
import { copyFileSync, existsSync, mkdir, mkdirSync, readFileSync, rmdirSync, rmSync } from "fs";

//import YAML from 'yaml';
import { ActionRequest, BaseAction } from "../types/actions";
import { DeploymentConfigInfo, Region } from "../types/configfiles";
import { DeployStrategy } from "../util/constants";
import { RegionExtractor } from "../util/deployconfigutils";
import { LogWriter } from "../util/logwriter";

export class DeployAction extends BaseAction {


    public async execute(request: ActionRequest) {
        this.resetOutputs();//dejar vacio los logs
        info("probando a desplegar dos parametros");
        //await this.replaceEnvVarsOnDeploymentYamlConfigFile(request);
        /*
        info("Reading environment regions file");
        const file = readFileSync(`${process.cwd()}/${request.deployEnvFilePath}`, "utf-8");
        const deployConfigInfo :DeploymentConfigInfo = new DeploymentConfigInfo(YAML.parse(file));
        info("Ret5rieved  deployment configuration as a class instance... Well formed configuration");
        */
        //const comprueba_parametro_1: Region = RegionExtractor.extractRegionInfo(request.parametro_recibido1, request.parametro_recibido2, deployConfigInfo);
        const variable = request.parametro_recibido1 
        if (!request) {
            setFailed("ERROR 1: " + request);
            throw new Error("ERROR 1: " + request);
        } 
        if (!request.isValid()) {
            setFailed("VALID?: " + request.errMessage);
            throw new Error("VALID?: " + request.errMessage);
        }
        if(request.parametro_recibido1 = "rodrigo"){
            //accion en la maquina
            await this.execCommandAsScript(`echo cadena si se envía`);
            //let greenActiveStatus = this._shellOutput.trim();
            this.resetOutputs();
        }else {
            setFailed("PARAMETRO 1? " + request);
            throw new Error("PARAMETRO 1? " + requestAnimationFrame);
        }
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
        
    private async replaceEnvVarsOnDeploymentYamlConfigFile(request: ActionRequest) {
        startGroup("Replacing placeholders in deployment regions configuration file");
        try {
            copyFileSync(request.parametro_recibido1, request.parametro_recibido1 + ".bak");
            const currentWDir : string = process.cwd();
            await this.execCommandAsScript(`
                echo ${request.parametro_recibido1 }
            `);
            LogWriter.logCommandOutputFromArray([this._shellOutput, this._shellErrors]);
            this.resetOutputs();
            info("parametro_recibido1 creado como variable de entorno");
        } catch (err) {
            error("error mientras se creaba la variable de entorno " + err);
        } finally {
            endGroup();
            rmSync(request.parametro_recibido1);
        }
        
    }
    /*
    private async controlUserPassSecretsExistence(region: Region, request: ActionRequest) {
        if (!(region.properties.credentialUserId in request.secrets) || !(region.properties.credentialPassId in request.secrets)) {
            setFailed(`Review repository secrets to ensure that ${region.properties.credentialUserId} and ${region.properties.credentialPassId} secrets exists`);
            throw new Error(`Review repository secrets to ensure that ${region.properties.credentialUserId} and ${region.properties.credentialPassId} secrets exists`);
        }
        try {
            startGroup("Login to cluster");
            await this.execCommand(`oc login -s ${region.properties.apiServer} -u ${request.secrets[region.properties.credentialUserId]} -p ${request.secrets[region.properties.credentialPassId]}`);
        } catch (err: any) {
            setFailed(`Review your credencials and server api url for region ${region.name} as oc login failed ${err.message} . `);
            error(`Review your credencials and server api url for region ${region.name} as oc login failed.`);
            throw new Error(`Review your credencials and server api url for region ${region.name} as oc login failed.`);
        } finally {
            LogWriter.logCommandOutputFromArray([this._shellOutput, this._shellErrors]);
            this.resetOutputs();
            endGroup();
        }
    }

    private async performDeployment(region: Region, request: ActionRequest, suffix: string) {
        info("Executing for region " + region.name + " application: " + region.properties.application + " suffix: " + suffix);
        LogWriter.showAvailableRegionProperties(region);

        let kubeToken : string = "";
        let needToLogout : boolean = false;
        let needsTokenFlag : boolean = true;
        if (region.properties.credentialsId in request.secrets) {
            kubeToken = request.secrets[region.properties.credentialsId];
            info(`Retrieved value from secret ${region.properties.credentialsId}`);
        } else {
            await this.controlUserPassSecretsExistence(region, request);
        }
        let strToken : string = "";
        if (needsTokenFlag) {
            strToken = `--kube-token=${kubeToken}`;
        }
        
        try {
            let script : string = region.properties.script || "helm upgrade --install --atomic --wait ";
            let chartUrl : string = `https://${region.properties.repo}/chartrepo/${region.properties.project}/charts/${region.properties.chart}-${region.properties.version}.tgz`;
            let appName : string = region.properties.application + suffix;
            let apiServer : string = `--kube-apiserver=${region.properties.apiServer}`;
            let namespace : string = `--namespace=${region.properties.namespace}`;
            let defaultExtraArgs : string = "";
            if (script.indexOf("--timeout") < 0) {
                info("Adding default helm timeout to 3m0s option");
                defaultExtraArgs += ` --timeout=${request.helmTimeout} `;
            }
            if (script.indexOf("--history-max") < 0) {
                info("Adding default history max to 2 helm option.");
                defaultExtraArgs += ` --history-max=${request.helmMaxReleasesHistory} `;
            }
            let version : string = `--version=${region.properties.version}`;
            if (region.properties.chartUnzip) {
                info("Unzip chart needed, using tar to unzip file");
                await this.execCommandAsScript(`curl -k -X GET ${chartUrl} --output charttodeploy.tgz\ntar xvzf  charttodeploy.tgz --strip-components=1 `);
                chartUrl = "./";
                info("Chart url updated to use local uncompressed tgz");
            }

            startGroup("Prepare workspace replaceing placeholders and retrieve extra flags from deployment file");
            exportVariable("APPLICATION_NAME", region.properties.application + suffix);
            exportVariable("REGISTRY", region.properties.repo);
            const extraValuesToApply = await this.getValuesToApplyAndReplacePlaceholdersInFiles(region, request);
            const extraParametersToSet = this.getExtraParametersToSet(region, request);
            info(`Extra values to apply: ${extraValuesToApply}`);

            endGroup();

            startGroup("Helm deployment execution");
            let helmCommand : string = `${script} ${appName} ${chartUrl} ${apiServer} ${strToken} ${namespace} ${defaultExtraArgs} ${version}  ${extraValuesToApply} ${extraParametersToSet}`;

            info(helmCommand);
            try {
                await this.execCommand(helmCommand);
            } catch(err) {
                error("Something went wrong with helm deployment, review logs");
                throw new Error("Something went wrong while performing helm deploy");
            } finally {
                LogWriter.logCommandOutputFromArray([this._shellOutput, this._shellErrors]);
                info("after helm command execution with NONE deploy strategy. Chart deployed!");
                // if (needToLogout) {
                //     await this.execCommand(`oc logout --server=${region.properties.apiServer}`);
                // }
                endGroup();
            }
        } catch (err: any) {
            setFailed("Helm deploy failed for region " + region.name);
            throw err;
        }
    }

    getExtraParametersToSet(region: Region, request: ActionRequest) : string {
        let result = "";
        if (region && region.properties && region.properties.parameters) {
            info(JSON.stringify(region.properties.parameters));
            for (let param of region.properties.parameters) {
                info("Object in json " + JSON.stringify(param));
                let keys = Object.keys(param);
                info("Keys found: " + keys);
                let key : string = keys[0];
                let value = param[key as keyof typeof param];
                result += ` --set ${key}=${value} `;
            }
        }
        info("Temporary result parameters to set: " + result);
        return result;
    }

    private async getValuesToApplyAndReplacePlaceholdersInFiles(region: Region, request: ActionRequest) : Promise<string> {
        let result = "";
        if (existsSync("generated-files")) {
            rmdirSync("generated-files", {recursive: true});
        }
        mkdirSync('generated-files');
        if (region && region.properties) {
            if (region.properties.valuesFile) {
                if (typeof region.properties.valuesFile === "string") {
                    info(`Property valuesFile for region ${region.name} informed as a string, its recommended to set it as a list.`);
                    info(`Even if this works we recommend you to set it in the expected list format in ${request.deployEnvFilePath} file.`);
                    result = await this.prepareValuesFile(region, region.properties.valuesFile, result, request);
                    return result;
                }
                for (let valFile of region.properties.valuesFile) {
                    result = await this.prepareValuesFile(region, valFile, result, request);
                }
            }
        }
        return result;
    }


    private async prepareValuesFile(region: Region, valFile: string, result: string, request: ActionRequest) {
        if (!existsSync(region.properties.chartPath + "/" + valFile)) {
            setFailed(`Review your configuration for region ${region.name}. Referenced values file ${valFile} cant be found under ${region.properties.chartPath} path`);
            throw new Error(`Review your configuration for region ${region.name}. Referenced values file ${valFile} cant be found under ${region.properties.chartPath} path`);
        }
        result += ` -f generated-files/${valFile}`;
        this.resetOutputs();

        await this.execCommandAsScript(`
                        export APPLICATION_NAME=${process.env.APPLICATION_NAME}
                        export REGISTRY=${process.env.REGISTRY}
                        export TAG_VERSION=${request.tagVersion}
                        envsubst < ${region.properties.chartPath}/${valFile} > generated-files/${valFile}`);

        info("Added values file to apply and updated placeholders in content");
        return result;
    }
*/
}