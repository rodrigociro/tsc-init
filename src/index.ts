import * as core from '@actions/core';
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

const myInput = core.getInput('input');
try {
  core.debug('Inside try block');
  
  if (!myInput) {
    core.warning('myInput was not set');
  }
  
  if (core.isDebug()) {
    core.info('HA LLEGADO EL INPUT')
  } else {
    core.info('NO HA LLEGADO EL INPUT')
  }
  core.info('Output to the actions build log')
  core.notice('This is a message that will also emit an annotation')
}
catch (err) {
  core.error(`Error ${err}, action may still succeed though`);
}
