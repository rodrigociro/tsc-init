import axios, { AxiosResponse } from 'axios';
import  { getInput, info, error, setFailed } from '@actions/core'

var url = 'https://dummy.restapiexample.com/api/v1/employees'

axios.get(url)
  .then(function (response){
    info("Contenido:\n"+JSON.stringify(response.data))
})

