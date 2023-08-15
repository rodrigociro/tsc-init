import * as core from '@actions/core';
import * as fs from 'fs'

core.startGroup('READ: json file')
//MEJORAR! revisar la funcion core/getMultipleInputs()
const myInput = core.getInput("parameter",{required:true});
const myInput2 = core.getInput("other_name",{required: true});

validarInput(myInput)
core.endGroup()

core.startGroup('READ: yaml file')
validarInput(myInput2)
core.endGroup()

//functions
function validarInput(algo:string){
    try{
        var splitted = algo.split(".");
        if( splitted[1] == "json"){
            core.info("el valor de mi input es: "+algo)
            leerArchivoJson(algo)
        }
        else if(splitted[1] == "yml" || splitted[1] == "yaml"){
            core.info("el valor de mi input es: "+algo)
            leerArchivoYaml(algo) 
        }else{
            core.warning("mi input está vacío")
        }     
    }catch (err) {
        core.error(`Error leyendo: ${err}`);
    }
}

function leerArchivoJson(algo:string){
    var archivo = fs.readFileSync(algo, 'utf-8');
    var archivoData = JSON.parse(archivo)
    JSON.stringify(archivoData);
    core.info("Contenido:\n"+JSON.stringify(archivoData))
    core.info(`${archivoData}`)
    core.setOutput('prueba',JSON.stringify(archivoData))
}

function leerArchivoYaml(algo:string){
    const YAML = require('yaml')
    var archivo = fs.readFileSync(algo,'utf-8')
    var archivoData = YAML.parse(archivo)
    core.info("Contenido::\n"+YAML.stringify(archivoData))
    core.info(`${archivoData}`)
}




