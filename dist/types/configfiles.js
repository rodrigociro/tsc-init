"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dependency = exports.ChartFile = exports.Properties = exports.Region = exports.Environment = exports.DeploymentConfigInfo = void 0;
class DeploymentConfigInfo {
    constructor(_json) {
        this._environments = [];
        for (let env of _json.environments) {
            this._environments.push(new Environment(env));
        }
    }
    get environments() {
        return this._environments;
    }
}
exports.DeploymentConfigInfo = DeploymentConfigInfo;
class Environment {
    constructor(_json) {
        this._name = _json.name;
        this._regions = [];
        for (let reg of _json.regions) {
            this._regions.push(new Region(reg));
        }
    }
    get name() {
        return this._name;
    }
    get regions() {
        return this._regions;
    }
}
exports.Environment = Environment;
class Region {
    constructor(_json) {
        this._valMessages = "";
        this._name = _json.name;
        this._properties = new Properties(_json.properties);
    }
    get name() {
        return this._name;
    }
    get properties() {
        return this._properties;
    }
    get validationMessages() {
        return this._valMessages;
    }
    isValid() {
        let valid = true;
        this._valMessages = "";
        if (!this._properties) {
            this._valMessages += "Missing properties block for region";
            return false;
        }
        if (this.hasValue(this._properties.apiServer)) {
            this._valMessages += "apiServer is mandatory inside region properties block\n";
            valid = false;
        }
        if (this.hasValue(this._properties.namespace)) {
            this._valMessages += "namespace is mandatory inside region properties block\n";
            valid = false;
        }
        if (this.hasValue(this._properties.repo)) {
            this._valMessages += "repo is mandatory inside region properties block\n";
            valid = false;
        }
        if (this.hasValue(this._properties.project)) {
            this._valMessages += "project is mandatory inside region properties block\n";
            valid = false;
        }
        if (this.hasValue(this._properties.credentialsId)) {
            if (this.hasValue(this._properties.credentialUserId) && this.hasValue(this._properties.credentialPassId)) {
                this._valMessages += "Even credentialUserId/credentialPassId or credentialsId must be provided in region properties to auth with cluster.\n";
                valid = false;
            }
        }
        if (this.hasValue(this._properties.deployStrategy)) {
            this._properties.deployStrategy = "none";
        }
        if (this.hasValue(this._properties.application)) {
            this._valMessages += "application is mandatory inside region properties block\n";
            valid = false;
        }
        if (this.hasValue(this._properties.chart)) {
            this._valMessages += "chart is mandatory inside region properties block\n";
            valid = false;
        }
        if (this.hasValue(this._properties.version)) {
            this._valMessages += "version is mandatory inside region properties block\n";
            valid = false;
        }
        return valid;
    }
    hasValue(field) {
        return !field || field.length == 0;
    }
}
exports.Region = Region;
class Properties {
    constructor(_json) {
        this._chartUnzip = false;
        this._valuesFile = [];
        this._parameters = [];
        this._apiServer = _json.apiServer;
        this._namespace = _json.namespace;
        this._credentialsId = _json.credentialsId;
        this._credentialUserId = _json.credentialUserId;
        this._credentialPassId = _json.credentialPassId;
        this._deployStrategy = _json.deployStrategy;
        this._repo = _json.repo;
        this._project = _json.project;
        this._version = _json.version;
        this._application = _json.application;
        this._chart = _json.chart;
        this._script = _json.script;
        this._chartPath = _json.chartPath;
        this._chartUnzip = _json.chartUnzip;
        this._repoUserCredentialId = _json.repoUserCredentialId;
        this._repoPassCredentialId = _json.repoPassCredentialId;
        this._valuesFile = _json.valuesFile;
        this._parameters = _json.parameters;
    }
    get apiServer() {
        return this._apiServer;
    }
    set apiServer(value) {
        this._apiServer = value;
    }
    get namespace() {
        return this._namespace;
    }
    set namespace(value) {
        this._namespace = value;
    }
    get credentialsId() {
        return this._credentialsId;
    }
    set credentialsId(value) {
        this._credentialsId = value;
    }
    get credentialUserId() {
        return this._credentialUserId;
    }
    set credentialUserId(value) {
        this._credentialUserId = value;
    }
    get credentialPassId() {
        return this._credentialPassId;
    }
    set credentialPassId(value) {
        this._credentialPassId = value;
    }
    get deployStrategy() {
        return this._deployStrategy;
    }
    set deployStrategy(value) {
        this._deployStrategy = value;
    }
    get repo() {
        return this._repo;
    }
    set repo(value) {
        this._repo = value;
    }
    get project() {
        return this._project;
    }
    set project(value) {
        this._project = value;
    }
    get version() {
        return this._version;
    }
    set version(value) {
        this._version = value;
    }
    get application() {
        return this._application;
    }
    set application(value) {
        this._application = value;
    }
    get chart() {
        return this._chart;
    }
    set chart(value) {
        this._chart = value;
    }
    get script() {
        return this._script;
    }
    set script(value) {
        this._script = value;
    }
    get repoUserCredentialId() {
        return this._repoUserCredentialId;
    }
    set repoUserCredentialId(value) {
        this._repoUserCredentialId = value;
    }
    get repoPassCredentialId() {
        return this._repoPassCredentialId;
    }
    set repoPassCredentialId(value) {
        this._repoPassCredentialId = value;
    }
    get valuesFile() {
        return this._valuesFile;
    }
    set valuesFile(value) {
        this._valuesFile = value;
    }
    get parameters() {
        return this._parameters;
    }
    set parameters(value) {
        this._parameters = value;
    }
    get chartPath() {
        if (!this._chartPath) {
            return "./";
        }
        return this._chartPath;
    }
    set chartPath(value) {
        if (value != undefined && value != null) {
            if ("" == value) {
                this._chartPath = "./";
            }
            else {
                this._chartPath = value;
            }
        }
    }
    get chartUnzip() {
        return this._chartUnzip;
    }
    set chartUnzip(value) {
        this._chartUnzip = value;
    }
}
exports.Properties = Properties;
class ChartFile {
    constructor(_apiVersion, _description, _name, _type, _version, _dependencies) {
        this._apiVersion = "";
        this._description = "";
        this._name = "";
        this._type = "";
        this._version = "";
        this._dependencies = [];
        this._apiVersion = _apiVersion;
        this._description = _description;
        this._name = _name;
        this._type = _type;
        this._version = _version;
        this._dependencies = _dependencies;
    }
    get apiVersion() {
        return this._apiVersion;
    }
    get description() {
        return this._description;
    }
    get name() {
        return this._name;
    }
    get type() {
        return this._type;
    }
    get version() {
        return this._version;
    }
    get dependencies() {
        return this._dependencies;
    }
}
exports.ChartFile = ChartFile;
class Dependency {
    constructor(_name, _repository, _version, _alias, _condition) {
        this._name = "";
        this._repository = "";
        this._version = "";
        this._alias = "";
        this._condition = "";
        this._name = _name;
        this._repository = _repository;
        this._version = _version;
        this._alias = _alias;
        this._condition = _condition;
    }
    get name() {
        return this._name;
    }
    get repository() {
        return this._repository;
    }
    get version() {
        return this._version;
    }
    get alias() {
        return this._alias;
    }
    get condition() {
        return this._condition;
    }
}
exports.Dependency = Dependency;
