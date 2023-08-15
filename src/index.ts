import axios, { AxiosResponse } from 'axios';
import  { getInput, info, error, setFailed } from '@actions/core'

var url = 'https://dummy.restapiexample.com/api/v1/employees'
var data = axios.get(url)
  .then(function (response){
    info(response.data)
})
