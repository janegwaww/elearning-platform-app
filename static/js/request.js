import axios from 'axios';
const _path = __dirname;
const request_url = 'http://seeker.haetek.com:6869/'


const get_data= function(url,data,method,header){

    return new Promise(function(resolve, reject) {
        axios({
            url:request_url+url,
            data:data,
            method:method||"post",
            headers:header||{contentType: 'application/json',token:'123'}

        }).then(res=>resolve(res)).catch(err=>reject(err))

    })
    
}
export default get_data;