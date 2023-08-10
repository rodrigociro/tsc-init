"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogWriter = void 0;
const core_1 = require("@actions/core");
class LogWriter {
    static valuesAsString(region) {
        var _a;
        if (typeof region.properties.valuesFile === "string") {
            return region.properties.valuesFile;
        }
        let ret = "";
        (_a = region.properties.valuesFile) === null || _a === void 0 ? void 0 : _a.forEach(v => ret += v.toString() + ", ");
        return ret;
    }
    static parametersAsString(region) {
        var _a;
        let ret = "";
        (_a = region.properties.parameters) === null || _a === void 0 ? void 0 : _a.forEach(p => {
            let keys = Object.keys(p);
            let key = keys[0];
            let value = p[key];
            ret += ` ${key}=${value};  `;
        });
        return ret;
    }
    static showAvailableRegionProperties(region) {
        let values = LogWriter.valuesAsString(region);
        let params = LogWriter.parametersAsString(region);
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
    static logCommandOutputFromArray(output) {
        if (output && output.length > 0 && output[0].length > 0 && output[1].length > 0) {
            (0, core_1.startGroup)("Console log");
            console.log("\u001b[1m############################## Console Log Start ##############################");
            output.forEach(s => console.log(s));
            console.log("\u001b[1m############################## Console Log End   ##############################");
            (0, core_1.endGroup)();
        }
    }
}
exports.LogWriter = LogWriter;
