import * as core from '@actions/core';
import * as execute from '@actions/exec';
import * as fs from 'fs'
import { convertCompilerOptionsFromJson } from 'typescript';

core.startGroup('READ: json file')

const myInput = core.getInput("parameter",{required:true});
const myInput2 = core.getInput("other_name",{required: true});

validarInput(myInput)
validarInput(myInput2)

function validarInput(algo:string){
    try{
        var splitted = algo.split(",");
        for(var i=0;i<splitted.length;i++){
            core.info(splitted[i])
        }
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
    var archivoData = (JSON.parse(archivo))
    core.info(`${archivoData}`)

}

function leerArchivoYaml(algo:string){
    core.info(`${algo}`)
}

core.endGroup()

