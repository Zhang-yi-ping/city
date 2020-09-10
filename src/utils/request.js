import axios from 'axios';

//2. 创建一个实例化对象
const Server = axios.create({
    // baseURL: "",
    // timeout: 3000,
})

//请求拦截器
Server.interceptors.request.use(function(config){

    //公共参数,token
    let  token = localStorage.getItem("admin_token");

    // //传递公共参数token
    // if("params" in config){
    //     config.params.token = token;
    // }else{
    //     config.params = {
    //         token: token
    //     }
    // }
    
    return config;
},function(error){
    return Promise.reject(error);
})


//响应拦截器
Server.interceptors.response.use(function(response){
    //把响应的数据进行再一次的拆解
    if(response.status == 200){
        return response.data;
    }
    
},function(error){
    return Promise.reject(error);
})


export default Server;