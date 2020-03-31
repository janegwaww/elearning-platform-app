import axios from 'axios';
const _path = __dirname;
const request_url ='http://seeker.haetek.com:9191/';//'http://seeker.haetek.com:9191/';//http://192.168.0.180:9191/'

axios.defaults.timeout = 10000;
const get_data= function(url,data,method,header){

    return new Promise(function(resolve, reject) {
        axios({
            url:request_url+url,
            data:data,
            method:method||"post",
            headers:header||{'Content-Type': 'application/json',token:'123'}

        }).then(res=>resolve(res.data)).catch(err=>reject(err))

    })
    
}
export default get_data;