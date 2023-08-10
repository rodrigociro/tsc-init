export class DeploymentConfigInfo {
    private _environments : Environment[] = [];


    constructor(_json: any) {
        for (let env of _json.environments) {
            this._environments.push(new Environment(env));
        }
    }

    get environments() : Environment[] {
        return this._environments;
    }
}

export class Environment {
    private _name: string;
    private _regions: Region[];
    constructor(_json: any) {
        this._name = _json.name;
        this._regions = [];
        for (let reg of _json.regions) {
            this._regions.push(new Region(reg));
        }
    }
    get name() : string {
        return this._name;
    }
    get regions() : Region[] {
        return this._regions;
    }
}

export class Region {
    private _name : string;
    private _properties: Properties;
    private _valMessages : string = "";

    constructor(_json : any) {
        this._name = _json.name;
        this._properties = new Properties(_json.properties);
    }
    get name() : string {
        return this._name;
    }
    get properties() : Properties {
        return this._properties;
    }

    public get validationMessages() : string {
        return this._valMessages
    }

    public isValid() : boolean {
        let valid : boolean = true;
        this._valMessages = "";
        if (!this._properties) {
            this._valMessages +="Missing properties block for region";
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

    private hasValue(field: string) : boolean {
        return !field || field.length == 0
    }
}

export class Properties {
    private _apiServer: string;
    private _namespace: string;
    private _credentialsId: string;
    private _credentialUserId: string;
    private _credentialPassId: string;
    private _deployStrategy: string;
    private _repo: string;
    private _project: string;
    private _version: string;
    private _application: string;
    private _chart: string;
    private _script: string;
    private _chartPath: string;
    private _chartUnzip: boolean = false;
    private _repoUserCredentialId: string;
    private _repoPassCredentialId: string;
    private _valuesFile: string[] = [];
    private _parameters: Object[] = [];

    constructor(_json: any) {
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
        this. _valuesFile = _json.valuesFile;
        this._parameters = _json.parameters;
    }

    public get apiServer(): string {
        return this._apiServer;
    }
    public set apiServer(value: string) {
        this._apiServer = value;
    }
    public get namespace(): string {
        return this._namespace;
    }
    public set namespace(value: string) {
        this._namespace = value;
    }
    public get credentialsId(): string {
        return this._credentialsId;
    }
    public set credentialsId(value: string) {
        this._credentialsId = value;
    }
    public get credentialUserId(): string {
        return this._credentialUserId;
    }
    public set credentialUserId(value: string) {
        this._credentialUserId = value;
    }
    public get credentialPassId(): string {
        return this._credentialPassId;
    }
    public set credentialPassId(value: string) {
        this._credentialPassId = value;
    }
    public get deployStrategy(): string {
        return this._deployStrategy;
    }
    public set deployStrategy(value: string) {
        this._deployStrategy = value;
    }
    public get repo(): string {
        return this._repo;
    }
    public set repo(value: string) {
        this._repo = value;
    }
    public get project(): string {
        return this._project;
    }
    public set project(value: string) {
        this._project = value;
    }
    public get version(): string {
        return this._version;
    }
    public set version(value: string) {
        this._version = value;
    }
    public get application(): string {
        return this._application;
    }
    public set application(value: string) {
        this._application = value;
    }
    public get chart(): string {
        return this._chart;
    }
    public set chart(value: string) {
        this._chart = value;
    }
    public get script(): string {
        return this._script;
    }
    public set script(value: string) {
        this._script = value;
    }
    public get repoUserCredentialId(): string {
        return this._repoUserCredentialId;
    }
    public set repoUserCredentialId(value: string) {
        this._repoUserCredentialId = value;
    }
    public get repoPassCredentialId(): string {
        return this._repoPassCredentialId;
    }
    public set repoPassCredentialId(value: string) {
        this._repoPassCredentialId = value;
    }
    public get valuesFile(): string[] {
        return this._valuesFile;
    }
    public set valuesFile(value: string[]) {
        this._valuesFile = value;
    }
    public get parameters(): Object[] {
        return this._parameters;
    }
    public set parameters(value: Object[]) {
        this._parameters = value;
    }
    public get chartPath(): string {
        if (!this._chartPath) {
            return "./";
        }
        return this._chartPath;
    }
    public set chartPath(value: string) {
        if (value != undefined && value != null) {
            if ("" == value) {
                this._chartPath = "./";
            } else {
                this._chartPath = value;
            }
        }
    }

    public get chartUnzip(): boolean {
        return this._chartUnzip;
    }
    public set chartUnzip(value: boolean) {
        this._chartUnzip = value;
    }
    
}

export class ChartFile {

    private _apiVersion: string = "";
    private _description: string = "";
    private _name: string = "";
    private _type: string = "";
    private _version: string = "";

    private _dependencies: Dependency[] = [];

    constructor(_apiVersion: string, _description: string, _name: string, _type: string, _version: string, _dependencies: Dependency[]) {
        this._apiVersion = _apiVersion;
        this._description = _description;
        this._name = _name;
        this._type = _type;
        this._version = _version;
        this._dependencies = _dependencies;
    }

    get apiVersion() : string {
        return this._apiVersion;
    }
    get description() : string {
        return this._description;
    }
    get name() : string {
        return this._name;
    }
    get type() : string {
        return this._type;
    }
    get version() : string {
        return this._version;
    }
    get dependencies() : Dependency[] {
        return this._dependencies;
    }

}

export class Dependency {
    _name: string = "";
    _repository: string = "";
    _version: string = "";
    _alias: string = "";
    _condition: string = "";

    constructor(_name: string, _repository: string, _version: string, _alias: string, _condition: string) {
        this._name = _name;
        this._repository = _repository;
        this._version = _version;
        this._alias = _alias;
        this._condition = _condition;
    }

    get name(): string {
        return this._name
    }
    get repository(): string {
        return this._repository
    }
    get version(): string {
        return this._version
    }
    get alias(): string {
        return this._alias
    }
    get condition(): string {
        return this._condition
    }
}