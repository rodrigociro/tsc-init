import * as core from '@actions/core';
const { curly } = require('node-libcurl');
const querystring = require('querystring');
const { statusCode, data, headers } = curly.get('https://dummy.restapiexample.com/api/v1/employees')

core.info(data)
core.info(statusCode)
core.info(headers)