import axios from 'axios';
const _path = __dirname;
const request_url = 'http://seeker.haetek.com:9191/'

axios.defaults.timeout = 5000;
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