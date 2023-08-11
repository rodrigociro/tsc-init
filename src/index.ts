import * as core from '@actions/core';
import { convertCompilerOptionsFromJson } from 'typescript';
//Colors
//backgroud color
var yellow: string ='\u001b[43m';
var cyan: string ='\u001b[48;5;6m'
var red: string = '\u001b[48;2;255;0;0m'
//Foreground colors
let magenta:string='\u001b[35m'
var cyanf:string='\u001b[38;5;6m'
var redf:string='\u001b[38;2;255;0;0m'

var texto:string='texto para probar colores'
core.info(magenta+texto)
core.info(redf+texto)
core.info(cyanf+texto)
core.info(yellow+texto)
core.info(red+texto)
core.info(cyan+texto)

//inputs

const myInput = core.getInput("parameter");
core.startGroup('GRUPO 1')
leerMyInput(myInput)
core.endGroup()
function leerMyInput(myInput:string){
    try {
    core.info('Inside try block');
    core.info(myInput)
    if (!myInput) {
        core.warning('myInput was not set');
    }
    if (core.isDebug()) {
        core.info('HA LLEGADO EL INPUT')
    } else {
        core.warning('NO HA LLEGADO EL INPUT')
    }
    core.info('Output to the actions build log')
    core.notice('This is a message that will also emit an annotation')
    core.setOutput('outputKey', 'outputVal');
    }
    catch (err) {
    core.error(`Error ${err}, action may still succeed though`);
    }
}

core.startGroup('GRUPO 2')
    core.notice('este es un mensaje en el grupo2')
core.endGroup()