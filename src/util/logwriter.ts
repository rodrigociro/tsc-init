import { endGroup, startGroup } from "@actions/core";
import { Region } from "../types/configfiles";

export class LogWriter {


    static valuesAsString(region: Region) {
        if (typeof region.properties.valuesFile === "string") {
            return region.properties.valuesFile;
        }
        let ret : string = "";
        region.properties.valuesFile?.forEach(v => ret += v.toString() + ", ");
        return ret;
    }

    static parametersAsString(region: Region) {
        let ret : string = "";
        region.properties.parameters?.forEach(p => {
            let keys = Object.keys(p);
            let key : string = keys[0];
            let value = p[key as keyof typeof p];
            ret += ` ${key}=${value};  `;
        });
        return ret;
    }

    static showAvailableRegionProperties(region: Region) {
        let values : string = LogWriter.valuesAsString(region);
        let params : string = LogWriter.parametersAsString(region);
        console.log(`
        \u001b[1m----------------------------------------------------------------------------------
        \u001b[1m-------------------             Region properties        -------------------------
        \u001b[1m----------------------------------------------------------------------------------
            APIServer:              \u001b[3m${region.properties.apiServer}
            CredentialsId:          \u001b[3m${region.properties.credentialsId}
            CredentialUserId:       \u001b[3m${region.properties.credentialUserId}
            CredentialPassId:       \u001b[3m${region.properties.credentialPassId}
            Namespace:              \u001b[3m${region.properties.namespace}
            Strategy:               \u001b[3m${region.properties.deployStrategy}
            Repo:                   \u001b[3m${region.properties.repo}
            RepoUserCredentialsId:  \u001b[3m${region.properties.repoUserCredentialId}
            RepoPassCredentialId:   \u001b[3m${region.properties.repoPassCredentialId}
            Project:                \u001b[3m${region.properties.project}
            Script:                 \u001b[3m${region.properties.script}
            Version:                \u001b[3m${region.properties.version}
            Chart:                  \u001b[3m${region.properties.chart}
            Chart path:             \u001b[3m${region.properties.chartPath}
            Chart unzip:            \u001b[3m${region.properties.chartUnzip}
            Application:            \u001b[3m${region.properties.application}
            Values files:           \u001b[3m${values}
            Parameters to set:      \u001b[3m${params}
        \u001b[1m----------------------------------------------------------------------------------
        `);
    }

    static logCommandOutputFromArray(output: string[]) {
        if (output && output.length > 0 && output[0].length > 0 && output[1].length > 0) {
            startGroup("Console log");
            console.log("\u001b[1m############################## Console Log Start ##############################");
            output.forEach(s => console.log(s));
            console.log("\u001b[1m############################## Console Log End   ##############################");
            endGroup();
        }
    }

}